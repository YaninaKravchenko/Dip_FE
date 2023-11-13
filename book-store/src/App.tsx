import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import PostsComponent from './components/Posts/PostComponent';
import { Route, Routes } from 'react-router-dom';
import { userRoutes } from './UserRoutes/userRoutes';
import { useDispatch } from 'react-redux';
import { userAction } from './Store/Actions/userActions';
import { RootState } from './Store';
import { useSelector } from 'react-redux';
import CartPage from './components/Pages/CartPage';
import { verifyToken, refreshToken } from './client/api/postsApi';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAndRefreshToken = async () => {
      const accessToken = localStorage.getItem('authToken');
      const refreshTokenStr = localStorage.getItem('refreshToken');
      console.log(accessToken);
      console.log(refreshTokenStr);

      if (!accessToken || !refreshTokenStr) {
        // если токен отсутствует
        console.log('No access token found');

        return;
      }

      const isTokenValid = await verifyToken(accessToken);

      if (!isTokenValid) {
        const newAccessToken = await refreshToken(refreshTokenStr);

        if (newAccessToken && newAccessToken.access) {
          localStorage.setItem('authToken', newAccessToken.access);
        } else {
          // если токен не удалось обновить
          console.log('Failed to refresh token');
        }
      }
    };

    verifyAndRefreshToken();
  }, []);

  const currentStateName = useSelector(
    (state: RootState) => state.user.currentUser?.name
  );
  const currentStatePassword = useSelector(
    (state: RootState) => state.user.currentUser?.password
  );

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');

    if (!currentStateName && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(userAction.setCurrentUser(parsedUser));
    }
  }, [dispatch]);

  return (
    <div>
      <CartPage />
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
    </div>
  );
}

export default App;
