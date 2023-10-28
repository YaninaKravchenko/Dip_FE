// BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { BookResponse } from '../../types';
import { useParams } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { Link } from 'react-router-dom';
import ButtonBackToHome from '../Pages/ButtonBackToHome';

const PostBookDetail: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const dispatch = useDispatch();
  const favoriteBooks = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  const bookIsFavorite = favoriteBooks.some(
    (book: BookResponse) => book.isbn13 === isbn13
  );

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
        console.error('Failed to fetch book details:', error);
      }
    };

    fetchBookDetails();
  }, [isbn13]);

  // useEffect(() => {
  //   const fetchBookDetails = async () => {
  //     if (!isbn13) {
  //       console.error('ISBN is undefined.');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `https://api.itbook.store/1.0/books/${isbn13}`
  //       );
  //       const data = await response.json();
  //       setBook(data);

  //      dispatch(booksActions.addISBN13(isbn13));
  //     } catch (error) {
  //       console.error('Failed to fetch book details:', error);
  //     }
  //   };

  //   fetchBookDetails();
  // }, [isbn13, dispatch]);

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

  return (
    <div>
      <Link to='/'>
        <ButtonBackToHome />
      </Link>
      <h1>{book.title}</h1>
      {bookIsFavorite ? (
        <FavoriteIcon onClick={handleToggleFavorite} style={{ color: 'red' }} />
      ) : (
        <FavoriteBorderIcon onClick={handleToggleFavorite} />
      )}

      <img src={book.image} alt={book.title} />
      <StarRating rating={book.rating} />
      <p>
        <strong>Subtitle:</strong> {book.subtitle}
      </p>
      <p>
        <strong>Authors:</strong> {book.authors}
      </p>
      {/* ... отобразите остальную информацию о книге ... */}
      {book.pdf &&
        Object.entries(book.pdf).map(([chapter, link]) => (
          <div key={chapter}>
            <a href={link} target='_blank' rel='noopener noreferrer'>
              {chapter}
            </a>
          </div>
        ))}
    </div>
  );
};

export default PostBookDetail;
