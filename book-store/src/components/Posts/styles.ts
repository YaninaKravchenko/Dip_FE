import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface IBackgroundColorProps {
    index: number;
  }

export const ContentWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
`;

export const ActionWrapper = styled('div')`
`;

export const PostWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

export const TextContent = styled('div')`
    position: relative;
  
    & span {
        color: #696969;
    }

    & p {
        color: #696969;
        font-size: 16px;
    }
`;

export const ContentBackgroundColor = styled('div')<IBackgroundColorProps>`
    position: relative;
    background-color: ${props => 
      props.index % 4 === 0
        ? 'purple'
        : props.index % 4 === 1
        ? 'blue'
        : props.index % 4 === 2
        ? 'green'
        : 'yellow'};
`;

export const ContentBackgroundBorder = styled('div')`
     border-bottom: 1px solid  #6be;
`;

export const StyledTitleSubtitle = styled('div')`
    height: 85px;
`;

export const StyledLargePostPrice = styled('div')`
    
        & p {
    font-size: 20px;
    font-weight: bold;
    }
`;


export const PostImageWrapper = styled('div') `
    display: block;

    & img {
       width: 75px;
       height: 75px;
    }
`;

export const StyledIconWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 3px solid #696969;

`;

export const StyledPostFavoriteIcon =  styled(FavoriteIcon)`
    color: #6be;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
`;

export const StyledPostSearchFavoriteIcon =  styled(FavoriteIcon)`
    color: #6be;
    cursor: pointer;
    position: absolute;
 
    margin: 10px;
`;

export const StyledPostFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: #6be;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;


  & .MuiSvgIcon-root path {
    stroke: #6be;
    fill: transparent;
  }
`;
export const StyledPostSearchFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: #6be;
  cursor: pointer;
  position: absolute;

  margin: 10px;


  & .MuiSvgIcon-root path {
    stroke: #6be;
    fill: transparent;
  }
`;



export const StyledIcon = styled('div')`
    display: flex;
    align-items: center;

    & > button {
    margin-right: 5px;
  }
`;

export const StyledPostOne = styled('div')`
    display: flex;
    flex-direction: column;
    margin: 100px;
`;



export const StyledIconNextPrev  = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > button {
    margin-right: 5px;
  }
`;

export const StyleNextPrev = styled('div')`
    border: none;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px;
`;

export const StyleNextPrevBtn = styled('button')`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
    border: none;
    outline: none;
    background-color: transparent;
`;

export const StyleNextPrevBtnLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  text-decoration: none; 
  color: inherit;
`;

export const StyledPostsComponent = styled('div')`
    padding: 0px 10px;
    
`;

export const StyledPosts = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 16px;
    margin: 20px;
    position: relative;
`;

export const StyledPost = styled('div')`
    width: 350px;
    height: 500px;
    margin: 20px;
    padding: 10px;
`;

export const StyledPostsWithBtn = styled('div')`
    border: 1px solid  #6be;
    width: 350px;
    padding: 10px;
`;


export const StyledPaginationPosts =  styled('div') `
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0;
`;

export const StyledArrowPaginationPosts = styled('div') `
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledPostFull =  styled('div') `
 width: 500px;
  height: 500px;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fcd4fb;
  border: 1px solid  #696969;
  padding: 20px; 

  `;

export const StyledPostFullOne =  styled('div') `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%; 
    max-height: 200px; 
    margin-bottom: 10px; 
  }

`;

export const StyledAboutBookBtn =  styled('div') `
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
`;

export const StyledSearchAboutBookBtn =  styled('div') `
    display: flex;
    justify-content: space-between;
`;


export const StyledArrowBackIcon = styled(ArrowBackIcon)<{ currentPage: number }>`
    cursor: ${props => (props.currentPage === 1 ? 'default' : 'pointer')};
    visibility: ${props => (props.currentPage === 1 ? 'hidden' : 'visible')};

    &:active {
        color: #6be;
    }
`;

export const StyledArrowForwardIcon = styled(ArrowForwardIcon)<{ currentPage: number, totalPages: number }>`
    cursor: ${props => (props.currentPage === props.totalPages ? 'default' : 'pointer')};
    visibility: ${props => (props.currentPage === props.totalPages ? 'hidden' : 'visible')};

    
    &:active {
        color: #6be;
    }
`;

export const StyledSearchPStarRating = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p {
    font-size: 20px;
    font-weight: bold;
    }
`;



