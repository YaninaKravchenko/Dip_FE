import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const StyledIconWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid white;
`;

export const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  margin-right: 10px;
  color: black;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #6be;
  }
`;
export const StyledFavoriteIcon = styled(FavoriteIcon)`
margin-right: 10px;
color: #6be;
transition: color 0.3s ease;
cursor: pointer;
`;

export const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  margin: 0;
  color: black;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #6be;
  }
`;

export const StyledPersonIcon = styled(PersonIcon)`
  color: black;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #6be;
  }
`;

export const StyledShoppingCart = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: black;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #6be;
  }
`;

export const StyledTotalCost = styled('div')`
  margin: 0 10px;
`;

export const StyledModal = styled('div')`
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 
  z-index: 10;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;