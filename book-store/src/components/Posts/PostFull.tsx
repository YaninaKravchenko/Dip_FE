import React, { FC } from 'react';
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
