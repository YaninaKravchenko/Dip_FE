import styled, { keyframes } from 'styled-components';

export const StyledSuccess = styled('div')`
   display: flex;
   flex-direction: column;
   //background-color: rgb(209, 207, 203);
   padding: 25px;
`;

export const StyledSuccessBlock = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   align-self: center;
   width: 400px;
   height: 150px;
   border: 1px solid #6be;

   & p {
      padding: 10px;
      margin: 0px;
      width: 250px;
   }
`;

export const StyledSuccessBtn = styled('div')`
   margin: 10px 0;
   cursor: pointer;
   color: #6be;
   font-weight: bold;
`;

export const dots = keyframes`
  0%, 100% {
    transform: scale(0.2);
    background-color: #30ffb7;
  }
  40% {
    transform: scale(1);
    background-color: #07deff;
  }
  50%{
    transform: scale(1);
    background-color: #0761ff;
  }
`;

export const StyledLoadingDotsOne =  styled('div')`
  height: 30px;
  width: 30px;
  border-color: #6be;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  animation: ${dots} 3.5s ease-in-out  infinite;
  animation-delay: 0.6s;
`;

export const StyledLoadingDotsTwo =  styled('div')`
  height: 30px;
  width: 30px;
  border-color: #6be;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  animation: ${dots} 3.5s ease-in-out  infinite;
  animation-delay: 0.7s;
`;

export const StyledLoadingDotsThree =  styled('div')`
  height: 30px;
  width: 30px;
  border-color: #6be;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  animation: ${dots} 3.5s ease-in-out  infinite;
  animation-delay: 0.8s;
`;

export const StyledLoadingDotsFour =  styled('div')`
  height: 30px;
  width: 30px;
  border-color: #6be;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  animation: ${dots} 3.5s ease-in-out  infinite;
  animation-delay: 0.9s;
`;

export const StyledLoadingDotsFive =  styled('div')`
  height: 30px;
  width: 30px;
  border-color: #6be;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
  animation: ${dots} 3.5s ease-in-out  infinite;
  animation-delay: 1s;
`;


export const StyledLoadingDots = styled('div')`
`;

export const StyledSuccessRegistration = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;