// BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { BookResponse } from '../../types';
import { useParams } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PostBookDetail: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const [book, setBook] = useState<BookResponse | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
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

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <FavoriteBorderIcon />
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
