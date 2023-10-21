import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNoFavoritesMessage, StyledArrowBackIcon } from './styles';

const NoFavoritesMessage = () => {
  return (
    <StyledNoFavoritesMessage>
      <Link to='/'>
        <StyledArrowBackIcon />
      </Link>
      <p>You have no favorite posts.</p>
    </StyledNoFavoritesMessage>
  );
};

export default NoFavoritesMessage;
