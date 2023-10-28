import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNoFavoritesMessage } from './styles';
import IconArrowBack from '../../IconArrowBack/IconArrowBack';

const NoFavoritesMessage = () => {
  return (
    <StyledNoFavoritesMessage>
      <Link to='/'>
        <IconArrowBack />
      </Link>
      <p>You have no favorite posts.</p>
    </StyledNoFavoritesMessage>
  );
};

export default NoFavoritesMessage;
