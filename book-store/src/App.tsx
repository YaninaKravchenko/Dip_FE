import React from 'react';
import Layout from './components/Layout/Layout';
import PostsComponent from './components/Posts/PostComponent';
import {} from '@mui/material';
//import { createTheme } from './Styles/theme';
//import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { userRoutes } from './UserRoutes/userRoutes';
//import PrivateRoute from './UserRoutes/PrivateRoute/PrivateRoute';
//import { useTypedSelector } from './components/Store/hooks/useTypedSelector';
//import { useActions } from './components/Store/hooks/useActions';

function App() {
  //const userTheme = useTypedSelector((state) => state.theme.themeMode);
  //const isLoggedIn = useTypedSelector((state) => state.session.isLoggedIn);
  //const currentTheme = createTheme(userTheme);
  //const { authorizeUser } = useActions();

  // if (!isLoggedIn) {
  //  authorizeUser();
  //}

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsComponent />} />
        {userRoutes.map(
          ({ path, id, Component, componentAdditionalProps, strict }) => (
            <Route
              key={id}
              path={path}
              element={<Component {...componentAdditionalProps} />}
            />
          )
        )}
      </Route>
    </Routes>
  );
}

export default App;
