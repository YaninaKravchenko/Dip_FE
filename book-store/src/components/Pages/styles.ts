import styled from 'styled-components';

export const StyledButtonBackToHome = styled('button')`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
`;

export const StyledCartModal = styled('div')`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: white;
    border: 1px solid black;
    padding: 15px;
    z-index: 10; 
`;

export const StyledCloseButton = styled('button')`
   position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;
