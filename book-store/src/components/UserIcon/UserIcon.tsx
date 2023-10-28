import React, { useState, useEffect } from 'react';
import { RootState } from '../../Store';
import {
  StyledIconWrapper,
  StyledFavoriteBorderIcon,
  StyledShoppingCartIcon,
  StyledPersonIcon,
  StyledFavoriteIcon,
  StyledShoppingCart,
  StyledTotalCost,
  StyledModal,
  StyledCurrentUser,
  StyledUserBtn,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { modalActions } from '../../Store/Actions/modalActions';
import PostSignInSignUp from '../Posts/PostSignInSignUp';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../../Store/Actions/userActions';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { booksActions } from '../../Store/Actions/booksActions';
import { cartActions } from '../../Store/Actions/cartActions';
import Button from '../Button/Button';

const UserIcon = () => {
  // const [showFavorites, setShowFavorites] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);
  const [showForm, setShowForm] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  const isCartModalVisible = useSelector(
    (state: RootState) => state.modal.isCartModalVisible
  );
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(modalActions.toggleCartModal());
  };

  const handleSignOut = () => {
    const userKey = `userData_${currentUser.email}`;
    const userDataToStore = {
      favoritePosts,
      cartItems,
      totalCost,
    };
    localStorage.setItem(userKey, JSON.stringify(userDataToStore));

    dispatch(userAction.setCurrentUser(null));
    localStorage.removeItem('currentUser');
    localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalCost', String(totalCost));
    dispatch(myFavoritesActions.clearFavorites());
    dispatch(cartActions.clearCart());
    navigate('/');
  };

  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  const hasFavoritePosts = favoritePosts.length > 0;

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(userAction.setCurrentUser(parsedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(favoritePosts);
    const storeFavoritePosts = localStorage.getItem('favoritePosts');
    if (storeFavoritePosts) {
      const parsedFavoritePosts = JSON.parse(storeFavoritePosts);
      dispatch(myFavoritesActions.setFavorites(parsedFavoritePosts));
    }

    //Восстановление элементов корзины
    const storeCartItems = localStorage.getItem('cartItems');
    if (storeCartItems) {
      const parsedCartItems = JSON.parse(storeCartItems);
      dispatch(cartActions.setCartItems(parsedCartItems));
    }
    console.log(totalCost);
    const storedTotalCost = localStorage.getItem('totalCost');
    if (storedTotalCost) {
      const parsedTotalCost = JSON.parse(storedTotalCost);
      dispatch(cartActions.setTotalCost(parsedTotalCost));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
  }, [favoritePosts]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalCost', JSON.stringify(totalCost));
  }, [cartItems, totalCost]);

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
      <div>
        {currentUser ? (
          <StyledUserBtn>
            <StyledCurrentUser onClick={() => navigate('/account')}>
              Hello, {currentUser.name}
            </StyledCurrentUser>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </StyledUserBtn>
        ) : (
          <StyledPersonIcon onClick={() => setShowForm(!showForm)} />
        )}

        {showForm && (
          <StyledModal>
            <PostSignInSignUp onClose={() => setShowForm(false)} />
          </StyledModal>
        )}
      </div>
    </StyledIconWrapper>
  );
};

export default UserIcon;
