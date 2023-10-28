import React from 'react';
import Layout from './components/Layout/Layout';
import PostsComponent from './components/Posts/PostComponent';
import { Route, Routes } from 'react-router-dom';
import { userRoutes } from './UserRoutes/userRoutes';

function App() {
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
