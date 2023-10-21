import React, { FC, useEffect, useState } from 'react';
import { StyledPostFull, StyledPostFullOne } from './styles';
//import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PostBook } from '../../types';

interface IPostFullProps {
  results: PostBook[];
}

const PostFull: FC<IPostFullProps> = ({ results }) => {
  return (
    <div>
      <div>
        {results.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.subtitle}</p>
            <p>{book.isbn13}</p>
            <p>{book.price}</p>
            <img src={book.image} alt={book.title} />
            <a href={book.url} target='_blank' rel='noopener noreferrer'>
              More Info
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFull;

//  <StyledPostFull>
//         {book ? (
//           <StyledPostFullOne>
//             <div>
//               <img src={book.image} alt={book.title} />
//             </div>
//             <div>
//               <h2>{book.title}</h2>
//               <p>{book.subtitle}</p>
//               <p>{book.authors}</p>
//             </div>
//             <div>
//               <p>{book.price}</p>
//               <p>{book.rating}</p>
//             </div>
//           </StyledPostFullOne>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </StyledPostFull>
// const { bookId } = useParams();
// const [book, setBook] = useState<PostBook | null>(null);

// useEffect(() => {
//   const fetchBookData = async () => {
//     try {
//       const response = await fetch(
//         `https://api.itbook.store/1.0/books/${bookId}`
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch book data');
//       }
//       const bookData: PostBook = await response.json();
//       console.log(bookData);
//       setBook(bookData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchBookData();
// }, [bookId]);
