import React, { useState } from 'react';
import { RootState } from '../../Store';
import {
  StyledIconWrapper,
  StyledFavoriteBorderIcon,
  StyledShoppingCartIcon,
  StyledPersonIcon,
  StyledFavoriteIcon,
  StyledShoppingCart,
  StyledTotalCost,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { modalActions } from '../../Store/Actions/modalActions';

const UserIcon = () => {
  // const [showFavorites, setShowFavorites] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);

  const isCartModalVisible = useSelector(
    (state: RootState) => state.modal.isCartModalVisible
  );
  const dispatch = useDispatch();

  const handleCartClick = () => {
    console.log('Cart icon clicked!');
    dispatch(modalActions.toggleCartModal());
  };

  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  const hasFavoritePosts = favoritePosts.length > 0;

  return (
    <StyledIconWrapper>
      <div>
        <Link to='/books/favorites'>
          {hasFavoritePosts ? (
            <StyledFavoriteIcon />
          ) : (
            <StyledFavoriteBorderIcon />
          )}
          {hasFavoritePosts && <span>{favoritePosts.length}</span>}
        </Link>
      </div>
      <StyledShoppingCart>
        <div>
          <StyledShoppingCartIcon onClick={handleCartClick} />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </div>
        <StyledTotalCost>{totalCost}</StyledTotalCost>
      </StyledShoppingCart>
      <StyledPersonIcon />
    </StyledIconWrapper>
  );
};

export default UserIcon;
