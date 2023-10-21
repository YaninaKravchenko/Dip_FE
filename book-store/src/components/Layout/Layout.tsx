import React, { FC, PropsWithChildren } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { StyledContentWrapper } from './styles';
import { Outlet } from 'react-router-dom';

const Layout: FC<PropsWithChildren> = () => {
  return (
    <div>
      <Header></Header>
      <StyledContentWrapper>
        <Outlet></Outlet>
      </StyledContentWrapper>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
