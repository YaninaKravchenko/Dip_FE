import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/index';
import { ApiResponse, PostBook } from '../../types';

const SearchResults: FC = () => {
  const filteredPosts: ApiResponse = useSelector(
    (state: RootState) => (state as any).search.filteredPosts
  );
  const postsToDisplay: PostBook[] = filteredPosts.books;
  console.log(postsToDisplay);

  return (
    <div>
      {postsToDisplay.map((book: PostBook, index: number) => (
        <div key={index}>
          <h3>{book.title}</h3>
          <p>{book.subtitle}</p>
          <img src={book.image} alt={book.title} />
          <a href={book.url}>Подробнее</a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
