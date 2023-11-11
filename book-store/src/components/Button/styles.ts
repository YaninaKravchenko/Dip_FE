import styled from 'styled-components';

export const StyledBtn = styled('button')`
    outline: none;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
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
