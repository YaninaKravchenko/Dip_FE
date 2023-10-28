import React, { useState } from 'react';
import { StyledHeader } from './styles';
//import SearchField from '../../SearchField/SearchField';
import UserIcon from '../../UserIcon/UserIcon';
import Title from '../../Title/Title';
import SearchField from '../../SearchField/SearchField';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const userData = useTypedSelector(selectors.getUserData);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledHeader>
      <Title variant='span'>BOOKSTORE</Title>
      <SearchField isOpen={isOpen} onClick={toggleMenu} />
      <UserIcon />
    </StyledHeader>
  );
};

export default Header;
