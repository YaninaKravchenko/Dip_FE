import React from 'react';
import { RootState } from '../../Store';
import {
  StyledIconWrapper,
  StyledFavoriteBorderIcon,
  StyledShoppingCartIcon,
  StyledPersonIcon,
} from './styles';
import { useSelector } from 'react-redux';

const UserIcon = () => {
  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  return (
    <StyledIconWrapper>
      <div>
        <StyledFavoriteBorderIcon />
        {favoritePosts.length > 0 && <span>{favoritePosts.length}</span>}
      </div>
      <StyledShoppingCartIcon />
      <StyledPersonIcon />
    </StyledIconWrapper>
  );
};

export default UserIcon;
