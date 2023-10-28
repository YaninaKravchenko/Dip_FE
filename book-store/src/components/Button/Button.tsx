import React from 'react';
import { StyledBtn } from './styles';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <StyledBtn onClick={onClick} className={className}>
      {children}
    </StyledBtn>
  );
};

export default Button;
