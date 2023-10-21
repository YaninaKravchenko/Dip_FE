import { IconButton } from '@mui/material';
import styled from 'styled-components';
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import { Link } from 'react-router-dom';

export const StyledSearchField = styled('div')`
width: 500px;
    //margin: 0 auto;
    //padding: 0 150px;
    display: flex;
    //justify-content: flex-end;
    //align-items: center;
    //flex-grow: 1;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    color:  #A8A8A8;
`;

export const StyledField = styled('div')`
    width: 500px;
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
   //border: 1px solid #A8A8A8; 
    
    &  fieldset {
      
      border: none; 
  }
`;

export const StyledIconButton = styled(IconButton)`
  
  transition: color 0.3s ease;

  &:hover {
    color: #6be;
  }

  & .MuiSvgIcon-root {
   color: black;
  }
`;

export const StyledFavoriteIcon = styled(FavoriteIcon)`
    color: #6be;
    cursor: pointer;
`;