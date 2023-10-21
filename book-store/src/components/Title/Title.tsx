import React, { FC } from 'react';
import { StyledTitle } from './styles';
import { ITitleProps } from '../../Interfaces';

const Title: FC<ITitleProps> = ({ children, variant, Component = 'span' }) => {
  return (
    <StyledTitle>
      <Component>{children}</Component>
    </StyledTitle>
  );
};

export default Title;
