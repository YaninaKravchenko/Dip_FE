import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export const StyledSignIn = styled('div')`
     display: flex;
     flex-direction: column;
     background-color: #FFFF;
     //border: 1px solid #6be;
     padding: 25px;
     
     & h2 {
        font-size: 25px;
     }
`;

export const StyledSignInBlock = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin: 10px;
   width: 550px;
   height: 450px;


   & p {
      padding: 10px;
      margin: 0px;
      width: 250px;
   }
`;

export const StyledSignInBtn = styled('button')`
   width: 100px;
   display: flex;
   justify-content: center;
   align-self: center;

`;

export const StyledSignBlock = styled('div')`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 30px;
`;

export const StyledLinkSignIn = styled(Link)`
   color: black;
   text-decoration: none;
   cursor: pointer;

      &:hover {
         text-decoration: underline;
      }
`;

export const StyledSignCIEyes = styled('div')`
   position: relative;
`;

export const StyledSignCIEyesBtn = styled('button')`
   position: absolute;
   right: 25px;
   top: 60%;
   transform: translateY(-50%);
   border: none;
   background: none;
   cursor: pointer;
`;