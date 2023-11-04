import React from 'react';
import { Link } from 'react-router-dom';
import { StyledArrowBackIcon } from './styles';

type IconArrowBackProps = {
  onClick?: () => void;
};

const IconArrowBack: React.FC<IconArrowBackProps> = ({ onClick }) => {
  return (
    <Link to='/'>
      <StyledArrowBackIcon onClick={onClick} />
    </Link>
  );
};

export default IconArrowBack;
