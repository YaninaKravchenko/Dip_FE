import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';


export const StyledPostsFavBook =  styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 1000px;
`;

export const StyledPostsFavorites = styled('div')`

`;

export const  StyledPostsFavoritesAll = styled('div')`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px; 
`;


export const  StyledPostsFavoritesOne = styled('div')`
    display: flex;
    border: 1px solid #6be;
    margin: 10px;
    padding: 10px;
    width: 700px
 
`;

export const StyledFavoriteIcon = styled(FavoriteIcon)`
    color: #6be;
    cursor: pointer;
`;

export const StyledIconAndPosts = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
`;

export const StyledTitleFavorites = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    margin: 0 20px;
`;

export const StyledInfoBook = styled('div')`
    padding: 0 0 30px 0;
`;

export const StyledLink = styled(Link) `
    outline: none;
    text-decoration: none;
    display: inline-block;
    padding: 10px 20px;
    color: white;
    background-color:#6be;
    border: none;
    border-radius: 5px;       
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease; 

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledNoFavoritesMessage =  styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;


