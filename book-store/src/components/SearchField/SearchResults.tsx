import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/index';
import { ApiResponse, PostBook } from '../../types';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { StyledFavoriteIcon } from './styles';

const SearchResults: FC = () => {
  const dispatch = useDispatch();
  const favoriteBooks = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  const filteredPosts: ApiResponse = useSelector(
    (state: RootState) => (state as any).search.filteredPosts
  );

  const postsToDisplay: PostBook[] = filteredPosts.books;
  console.log(postsToDisplay);

  const handleToggleFavorite = (book: PostBook) => {
    const isFavorite = favoriteBooks.some(
      (favBook) => favBook.isbn13 === book.isbn13
    );

    if (isFavorite) {
      dispatch(myFavoritesActions.removeFromFavorite(book.isbn13));
    } else {
      dispatch(myFavoritesActions.addToFavorite(book));
    }
  };

  return (
    <div>
      {postsToDisplay.map((book: PostBook, index: number) => {
        const isFavorite = favoriteBooks.some(
          (favBook) => favBook.isbn13 === book.isbn13
        );
        return (
          <div key={index}>
            <h3>{book.title}</h3>
            {isFavorite ? (
              <StyledFavoriteIcon onClick={() => handleToggleFavorite(book)} />
            ) : (
              <FavoriteBorderIcon onClick={() => handleToggleFavorite(book)} />
            )}
            <p>{book.subtitle}</p>
            <img src={book.image} alt={book.title} />
            <a href={book.url}>About Book</a>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
