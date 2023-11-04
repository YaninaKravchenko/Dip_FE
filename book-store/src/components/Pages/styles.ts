import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

export const StyledButtonBackToHome = styled('button')`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
`;

// export const StyledCartModal = styled('div')`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 300px;
//     background-color: white;
//     border: 1px solid black;
//     padding: 15px;
//     z-index: 150; 
// `;

// export const StyledCloseButton = styled('button')`
//    position: absolute;
//     top: 10px;
//     right: 10px;
//     background-color: transparent;
//     border: none;
//     font-size: 20px;
//     cursor: pointer;
// `;
/* StyledCartModal styles */
export const StyledCartModal = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1% 2%;
    width: 50rem;
    max-width: 95%;
    box-shadow: 0px 0px 15px 15px #6be;
    animation: show 500ms ease-in-out;
    z-index: 12;
`;
  
  /* Close Button styles */
  export const  StyledCloseButton = styled('button')`
    margin: 0 0 10px 0;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;
  

export const StyledCartModalDiv = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    border: 1px solid #6be;
    padding: 10px;
`;
  
export const StyledCartModalH3 = styled('h3')`
    flex: 1;
    margin-right: 20px;
    font-size: 18px;
`;

export const StyledCartModalImg = styled('img')`
    width: 65px;
    height: 85px;
    margin-right: 25px;
`;

export const StyledCartModalP = styled('p')`
    flex: 2;
    font-size: 20px;
`;

export const StyledCartModalBtn = styled('button')`
    font-size: 20px;
    cursor: pointer;
    vertical-align: middle;
    border: 1px solid #6be;
    border-radius: 5px;
    margin: 0 5px;
    padding: 5px 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const StyledCartModalBtnIcon = styled('button')`
    font-size: 24px;
    cursor: pointer;
    vertical-align: middle;
    margin: 0 5px;
    padding: 5px 10px;
    transition: color 0.3s;
    outline: none;
    border: none;

    &:hover {
        color: #e0e0e0;
    }
`;

export const StyledCartModalAllBtn = styled('div')`

`;

export const StyledCartModalPAllBtn = styled('div')`

`;

export const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
    color: #6be;

    &:hover {
        color: black;
    }
`;

export const StyledCartModalTotal =  styled('div')`
    font-size: 20px;
    margin: 10px 0;
`;

export const StyledCartModalImgTitleCounter = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledCartModalTotalBtn =  styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledClearIconCart = styled(ClearIcon)`
    color: black;
    font-size: 50px;

&:hover {
    color: #6be;
}
`;
