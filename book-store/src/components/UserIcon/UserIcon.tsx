import React, { useState } from 'react';
import { RootState } from '../../Store';
import {
  StyledIconWrapper,
  StyledFavoriteBorderIcon,
  StyledShoppingCartIcon,
  StyledPersonIcon,
  StyledFavoriteIcon,
} from './styles';
import { useSelector } from 'react-redux';
import PostsFavorites from '../Posts/PostFavorites/PostsFavorites';
import { Link } from 'react-router-dom';

const UserIcon = () => {
  // const [showFavorites, setShowFavorites] = useState(false);

  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  const hasFavoritePosts = favoritePosts.length > 0;

  // const toggleFavorites = () => {
  //   setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  // };

  return (
    <StyledIconWrapper>
      <div>
        <Link to='/books/myfavorites'>
          {hasFavoritePosts ? (
            <StyledFavoriteIcon />
          ) : (
            <StyledFavoriteBorderIcon />
          )}
          {hasFavoritePosts && <span>{favoritePosts.length}</span>}
        </Link>
      </div>
      <StyledShoppingCartIcon />
      <StyledPersonIcon />
    </StyledIconWrapper>
  );
};

export default UserIcon;
