import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

export const StyledPostsFavorites = styled('div')`
    display: flex;
    flex-direction: column;

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

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
    color: black;
    font-size: 50px;
    cursor: pointer;

    &:hover {
        color: #6be;
    }

    &.MuiSvgIcon-root {
        width: 50px;
        height: 50px;
        padding-top: 8px;
    }
`;


