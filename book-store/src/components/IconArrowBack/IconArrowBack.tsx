import React from 'react';
import { Link } from 'react-router-dom';
import { StyledArrowBackIcon } from './styles';

const IconArrowBack: React.FC = () => {
  return (
    <Link to='/'>
      <StyledArrowBackIcon />
    </Link>
  );
};

export default IconArrowBack;
