import styled from 'styled-components';

interface StyledButtonSignInProps {
    active?: boolean;
  }

export const StylePostSignInUpBtn =  styled('div') `
    display: flex;
    justify-content: space-between;
    width: 100%;
`;


export const StyledModal = styled('div')`
    position: relative;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%); 
    z-index: 10;
    background-color: white;
    padding: 20px; 
    border: 1px solid #6be;
    //border-radius: 8px;
    //box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

export const StyledButtonSignIn = styled('button')<StyledButtonSignInProps>`
    flex-grow: 1;
    outline: none;
    text-decoration: none;
    padding: 10px 20px;
    color: #6be;
    font-size: 16px;
    font-weight: bold;

    //background-color: #6be;
    border: none;
    //border-radius: 5px;
    cursor: pointer;
    //transition: background-color 0.3s ease;

    &:hover {
        background-color: #6be;
        color: white;
    }

    ${({ active }) => active && `
    border-bottom: 3px solid #6be;

    `}
`;