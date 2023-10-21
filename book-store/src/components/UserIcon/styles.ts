import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';


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

export const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  margin: 0 10px;
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

