import React from 'react';
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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserIcon = () => {
  // const [showFavorites, setShowFavorites] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);

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
          <StyledShoppingCartIcon />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </div>
        <StyledTotalCost>{totalCost}</StyledTotalCost>
      </StyledShoppingCart>
      <StyledPersonIcon />
    </StyledIconWrapper>
  );
};

export default UserIcon;
