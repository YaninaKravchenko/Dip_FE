import React, { FC } from 'react';
import { Pagination } from '@mui/material';
import { StyledPaginationPosts } from '../Posts/styles';

interface IPaginationProps {
  count: number;
  page?: number;
  onBtnClick: (event: any, pageNumber: number) => void;
}

const PaginationPosts: FC<IPaginationProps> = ({ count, page, onBtnClick }) => {
  return (
    <StyledPaginationPosts>
      <Pagination count={count} page={page} onChange={onBtnClick} />
    </StyledPaginationPosts>
  );
};

export default PaginationPosts;
