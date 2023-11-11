// BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { BookResponse } from '../../../types';
import { useParams } from 'react-router-dom';
import StarRating from '../../StarRating/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Store';
import { myFavoritesActions } from '../../../Store/Actions/myFavoritesActions';
import { Link } from 'react-router-dom';

import {
  StyledPostBookDetail,
  StyledPostBookDetailPriceRating,
  StyledPostBookDetailImg,
  StyledPostBookDetailAll,
  StyledPostBookDetailInfo,
  StyledTabBtn,
  StyledTabContent,
  StyledTabComponent,
  StyledTabComponentTab,
  StyledPostBookDetailFull,
  StyledArrowBackIconFav,
} from './styles';
import {
  StyledPostFavoriteIcon,
  StyledPostFavoriteBorderIcon,
  StyledSearchAboutBookBtn,
} from '../styles';
import Button from '../../Button/Button';
import { cartActions } from '../../../Store/Actions/cartActions';
import { PostBook } from '../../../types';

const PostBookDetail: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const dispatch = useDispatch();
  const favoriteBooks = useSelector(
    (state: RootState) => state.favorites.favorite
  );
  const [activeTab, setActiveTab] = useState('desc');

  const bookIsFavorite = favoriteBooks.some(
    (book: BookResponse) => book.isbn13 === isbn13
  );

  const toggleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!isbn13) {
        console.error('ISBN is undefined.');
        return;
      }

      try {
        const response = await fetch(
          `https://api.itbook.store/1.0/books/${isbn13}`
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [isbn13]);

  if (!book) return <div>Loading...</div>;

  const handleToggleFavorite = () => {
    if (!isbn13) {
      console.error('ISBN is undefined.');
      return;
    }

    if (bookIsFavorite) {
      dispatch(myFavoritesActions.removeFromFavorite(isbn13));
    } else {
      dispatch(myFavoritesActions.addToFavorite(book));
    }
  };

  const handleAddToCart = (book: BookResponse) => {
    // Предполагая, что можно определить значение isFavorite в этот момент
    const postBook: PostBook = {
      ...book,
      isFavorite: book.isFavorite || false, // Предоставляем значение по умолчанию, если undefined
    };

    dispatch(cartActions.addToCart(postBook));
  };

  return (
    <div>
      <Link to='/books/:favorites'>
        <StyledArrowBackIconFav />
      </Link>

      <div>
        <h2>{book.title}</h2>
        <StyledPostBookDetailFull>
          <StyledPostBookDetail>
            <StyledPostBookDetailImg>
              {' '}
              {bookIsFavorite ? (
                <StyledPostFavoriteIcon onClick={handleToggleFavorite} />
              ) : (
                <StyledPostFavoriteBorderIcon onClick={handleToggleFavorite} />
              )}
              <img src={book.image} alt={book.title} />
            </StyledPostBookDetailImg>
            <StyledPostBookDetailAll>
              <StyledPostBookDetailPriceRating>
                <p>{book.price}</p>
                <StarRating rating={book.rating} />
              </StyledPostBookDetailPriceRating>
              <div>
                <StyledPostBookDetailInfo>
                  <p>
                    <strong>Authors:</strong>
                  </p>
                  <p>{book.authors}</p>
                </StyledPostBookDetailInfo>
                <StyledPostBookDetailInfo>
                  <p>
                    <strong>Publisher:</strong>
                  </p>
                  <p>{book.publisher}</p>
                </StyledPostBookDetailInfo>
                <StyledPostBookDetailInfo>
                  <p>
                    <strong>Language:</strong>
                  </p>
                  <p>{book.language}</p>
                </StyledPostBookDetailInfo>
                <StyledPostBookDetailInfo>
                  <p>
                    <strong>Pages:</strong>
                  </p>
                  <p>{book.pages}</p>
                </StyledPostBookDetailInfo>
                <StyledPostBookDetailInfo>
                  <p>
                    <strong>Year:</strong>{' '}
                  </p>
                  <p> {book.year} </p>
                </StyledPostBookDetailInfo>
              </div>

              <StyledSearchAboutBookBtn>
                <div></div>
                <Button onClick={() => book && handleAddToCart(book)}>
                  Buy
                </Button>
              </StyledSearchAboutBookBtn>
            </StyledPostBookDetailAll>
          </StyledPostBookDetail>
          <StyledTabComponent>
            <StyledTabComponentTab>
              <StyledTabBtn
                isActive={activeTab === 'desc'}
                onClick={() => toggleTab('desc')}
              >
                Description
              </StyledTabBtn>
              <StyledTabBtn
                isActive={activeTab === 'authors'}
                onClick={() => toggleTab('authors')}
              >
                Authors
              </StyledTabBtn>
            </StyledTabComponentTab>
            <StyledTabContent>
              {activeTab === 'desc' && (
                <div>
                  <p>{book.desc}</p>{' '}
                  {book.pdf &&
                    Object.entries(book.pdf).map(([chapter, link]) => (
                      <div key={chapter}>
                        <a
                          href={link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {chapter}
                        </a>
                      </div>
                    ))}
                </div>
              )}
              {activeTab === 'authors' && <p>{book.authors}</p>}
            </StyledTabContent>
          </StyledTabComponent>
        </StyledPostBookDetailFull>
      </div>
    </div>
  );
};

export default PostBookDetail;
