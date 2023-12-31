import React, { useEffect } from 'react';
import { RootState } from '../../Store';
import {
  StyledIconWrapper,
  StyledFavoriteBorderIcon,
  StyledShoppingCartIcon,
  StyledPersonIcon,
  StyledFavoriteIcon,
  StyledShoppingCart,
  StyledCurrentUser,
  StyledUserBtn,
  StyledRedDot,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { modalActions } from '../../Store/Actions/modalActions';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../../Store/Actions/userActions';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { cartActions } from '../../Store/Actions/cartActions';
import Button from '../Button/Button';

const UserIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(modalActions.toggleCartModal());
  };

  const handleSignOut = () => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // const userKey = `userData_${currentUser.email}`;
      // const userDataToStore = {
      //   favoritePosts,
      //   cartItems,
      //   totalCost,
      // };

      const userDataToStore = {
        favoritePosts: favoritePosts,
        cartItems: cartItems,
        totalCost: totalCost,
      };
      localStorage.setItem(
        `userData_${currentUser.email}`,
        JSON.stringify(userDataToStore)
      );

      // Удаляем данные пользователя из localStorage

      // localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // localStorage.setItem('totalCost', JSON.stringify(totalCost));
      // localStorage.setItem('userData', JSON.stringify(userDataToStore));

      localStorage.removeItem('currentUser');
      //localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');

      localStorage.removeItem('userData');

      // localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      //localStorage.setItem('totalCost', String(totalCost));
      dispatch(userAction.setCurrentUser(null));

      dispatch(userAction.clearCurrentUser());
      dispatch(myFavoritesActions.clearFavorites());
      dispatch(cartActions.clearCart());
      navigate('/');
    }
  };

  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  //const hasFavoritePosts = favoritePosts.length > 0;

  const hasFavoritePosts = favoritePosts && favoritePosts.length > 0;

  useEffect(() => {
    // Восстанавливаем информацию о пользователе из localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(userAction.setCurrentUser(parsedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const storeFavoritePosts = localStorage.getItem('favoritePosts');
    if (storeFavoritePosts) {
      const parsedFavoritePosts = JSON.parse(storeFavoritePosts);
      dispatch(myFavoritesActions.setFavorites(parsedFavoritePosts));
    }
    //Восстановление элементов корзины:
    const storeCartItems = localStorage.getItem('cartItems');
    if (storeCartItems) {
      const parsedCartItems = JSON.parse(storeCartItems);
      dispatch(cartActions.setCartItems(parsedCartItems));
    }
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

  // useEffect(() => {
  //   // Восстанавливаем информацию о пользователе из localStorage
  //   const storedUser = localStorage.getItem('currentUser');
  //   if (storedUser) {
  //     // Проверяем, что storedUser не null
  //     const parsedUser = JSON.parse(storedUser);
  //     dispatch(userAction.setCurrentUser(parsedUser));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(userAction.setCurrentUser(parsedUser));

      // Восстанавливаем данные из localStorage
      const storedFavoritePosts = localStorage.getItem('favoritePosts') || '[]';
      const storedCartItems = localStorage.getItem('cartItems') || '[]';
      const storedTotalCost = localStorage.getItem('totalCost') || '0';

      dispatch(
        myFavoritesActions.setFavorites(JSON.parse(storedFavoritePosts))
      );
      dispatch(cartActions.setCartItems(JSON.parse(storedCartItems)));
      dispatch(cartActions.setTotalCost(JSON.parse(storedTotalCost)));
    }
  }, [dispatch]);

  const openSignInSignUpPage = () => {
    navigate('/sign-in-up');
  };

  return (
    <StyledIconWrapper>
      <div>
        <Link to='/books/favorites'>
          {hasFavoritePosts ? (
            <StyledFavoriteIcon />
          ) : (
            <StyledFavoriteBorderIcon />
          )}
          {hasFavoritePosts && <span>{<StyledRedDot />}</span>}
        </Link>
      </div>
      <StyledShoppingCart>
        <div>
          <StyledShoppingCartIcon
            hasBook={cartItems.length > 0}
            onClick={handleCartClick}
          />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </div>
      </StyledShoppingCart>
      <div>
        {currentUser ? (
          <StyledUserBtn>
            <StyledCurrentUser onClick={() => navigate('/account')}>
              {currentUser.name}
            </StyledCurrentUser>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </StyledUserBtn>
        ) : (
          /*<StyledPersonIcon onClick={() => setShowForm(!showForm)} />*/
          <StyledPersonIcon onClick={openSignInSignUpPage} />
        )}

        {/*showForm && <PostSignInSignUp onClose={() => setShowForm(false)} />*/}
      </div>
    </StyledIconWrapper>
  );
};

export default UserIcon;
