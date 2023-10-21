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
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
    z-index: 1000; 
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
