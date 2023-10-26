import React from 'react';
import { StyledSuccessBlock, StyledSuccessBtn } from './styles';

interface ISuccessModal {
  onClose: () => void;
}

const SignUpSuccessModal: React.FC<ISuccessModal> = ({ onClose }) => (
  <StyledSuccessBlock>
    <h2>Registration confirmation</h2>
    <p>Activation Successful</p>
    <StyledSuccessBtn onClick={onClose}>OK</StyledSuccessBtn>
  </StyledSuccessBlock>
);

export default SignUpSuccessModal;
