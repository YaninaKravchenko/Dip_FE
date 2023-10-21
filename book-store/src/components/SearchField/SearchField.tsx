import React, { FC, useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { StyledSearchField, StyledField } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/index';
import { searchActions } from '../../Store/Actions/searchActions';
import { useDispatch } from 'react-redux';
import { PostBook } from '../../types';

interface ISearchFieldProps {
  isOpen: boolean;
  onClick: () => void;
}

function debounce(func: (newText: string) => void, delay: number) {
  let timeout: NodeJS.Timeout;

  return function (this: any, newText: string) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, [newText]), delay);
  };
}

const SearchField: FC<ISearchFieldProps> = ({ isOpen, onClick }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const postsToDisplay = useSelector(
    (state: RootState) => (state as any).search.filteredPosts
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const debounceOnChange = useCallback(
    debounce((newText) => {
      if (newText) {
        const url = `https://api.itbook.store/1.0/search/${newText}`;
        console.log(url);
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data && Array.isArray(data.books)) {
              // const titlesContainingSearchText = data.books
              //   .filter((book: PostBook) =>
              //     book.title.toLowerCase().includes(newText.toLowerCase())
              //   ) // фильтрация книг на клиенте
              //   .map((book: PostBook) => book.title);
              const { total, page, books } = data;
              const filteredBooks = data.books.filter((book: PostBook) =>
                book.title.toLowerCase().includes(newText.toLowerCase())
              );
              dispatch(
                searchActions.setFilteredPosts({
                  error: '0',
                  total,
                  page,
                  books: filteredBooks,
                })
              );

              //dispatch(searchActions.setFilteredPosts(filteredBooks));
            } else {
              // Обработка ошибок или пустых результатовa
              //dispatch(searchActions.setFilteredPosts([]));
              console.log('Ответ API не содержит книг.');
            }
          })
          .catch((error) => {
            console.error(error);
            dispatch(
              searchActions.setFilteredPosts({
                error: 'Произошла ошибка',
                total: '0',
                page: '0',
                books: [],
              })
            );
            // Очистите поисковые результаты в случае ошибки
          });
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debounceOnChange(searchText);
  }, [searchText, debounceOnChange]);

  const handleSearchClick = () => {
    onClick();
    if (!isOpen) {
      setSearchText('');
    }
  };

  return (
    <StyledSearchField>
      <StyledField>
        {isOpen && (
          <TextField
            label='Search'
            variant='outlined'
            size='small'
            fullWidth
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              debounceOnChange(event.target.value);
            }}
            InputProps={{
              style: { color: '#A8A8A8' },
            }}
            InputLabelProps={{
              style: { color: '#A8A8A8' },
            }}
          />
        )}
      </StyledField>
      <IconButton color='inherit' onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </StyledSearchField>
  );
};

export default SearchField;
