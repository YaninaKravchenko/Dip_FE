import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IStyledTabProps {
    isActive: boolean;
  }

export const StyledPostBookDetail =  styled('div')`
    width: 100%;
    display: flex;
    //justify-content: center;
    align-items: center;
    text-align: center;
    gap: 100px;
    margin-bottom: 50px;
`;

export const StyledPostBookDetailImg = styled('div')`
    display: block;
    width: 400px;
    //flex: 1;
    position: relative;
    border: 1px solid #6be;
    margin-right: 10%;

    /* & img {
        width: 70%;
    } */
`;

export const StyledPostBookDetailAll = styled('div')`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;



export const StyledPostBookDetailPriceRating = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & p {
        font-size: 18px;
        font-weight: bold;
    }
`;

export const StyledPostBookDetailInfo = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p {
        font-size: 18px;
    }
`;

export const StyledTabBtn = styled('button')<IStyledTabProps>`
  padding: 10px;
  margin-right: 5px;
  border: none;
  border-bottom: ${props => props.isActive ? '3px solid #6be' : '1px solid #6be;'};
  outline: none;
  cursor: pointer;
  font-size: 20px;
`;

export const StyledTabContent = styled('div')`
  padding: 10px;
  font-size: 18px;
  text-align: justify;
`;

export const StyledTabComponent = styled('div')`
    display: flex;
    flex-direction: column;
`;

export const StyledTabComponentTab = styled('div')`
    display: flex;
    flex-direction: row;
`;

export const StyledPostBookDetailFull =  styled('div')`
   width: 1080px;
`;

export const StyledArrowBackIconFav = styled(ArrowBackIcon)`
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