import styled from 'styled-components';

export const StyledSuccess = styled('div')`
   display: flex;
   flex-direction: column;
   background-color: rgb(209, 207, 203);
   padding: 25px;

     & h2 {
        font-size: 25px;
     }
`;

export const StyledSuccessBlock = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   align-self: center;
   width: 300px;
   height: 150px;
   border: 2px solid #696969;

   & p {
      padding: 10px;
      margin: 0px;
      width: 250px;
   }
`;

export const StyledSuccessBtn = styled('button')`
   width: 100px;
   display: flex;
   justify-content: center;
   align-self: center;

`;