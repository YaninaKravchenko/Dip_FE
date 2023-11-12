import React, { useState, useEffect } from 'react';
import CustomInput from './CustomInput';
import {
  StyledSignIn,
  StyledSignInBlock,
  StyledSignBlock,
  StyledLinkSignIn,
  StyledSignCIEyes,
  StyledSignCIEyesBtn,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../types';
import { userAction } from '../../../../Store/Actions/userActions';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../Store/Actions/cartActions';
import { myFavoritesActions } from '../../../../Store/Actions/myFavoritesActions';
import Button from '../../../Button/Button';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { fetchUserInfo } from '../../../../client/api/postsApi';

interface ISignInProps {
  closeModal: () => void;
}

const SignIn: React.FC<ISignInProps> = ({ closeModal }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (loginData.password) {
      setPasswordVisible(!passwordVisible);
    }
  };

  const handleChangeValue = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSignIn = async () => {
    setMessage('');

    try {
      const response = await fetch(
        'https://studapi.teachmeskills.by/auth/jwt/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', data.access); // Предполагается, что токен находится в свойстве 'access'

        const userInfo = await fetchUserInfo(data.access);
        console.log('User data:', userInfo);

        // Восстанавливаем данные из localStorage

        const storedFavoritePosts = localStorage.getItem('favoritePosts');
        const storedCartItems = localStorage.getItem('cartItems');
        const storedTotalCost = localStorage.getItem('totalCost');

        if (storedFavoritePosts) {
          const parsedFavoritePosts = JSON.parse(storedFavoritePosts);
          dispatch(myFavoritesActions.setFavorites(parsedFavoritePosts));
        }

        if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
          dispatch(cartActions.setCartItems(parsedCartItems));
        }

        if (storedTotalCost) {
          const parsedTotalCost = JSON.parse(storedTotalCost);
          dispatch(cartActions.setTotalCost(parsedTotalCost));
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        dispatch(userAction.setCurrentUser(userInfo));

        closeModal();
        navigate('/');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Ошибка входа', error);
      setMessage('An error occurred during login');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken') || '';

      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
      const storedUser = localStorage.getItem('currentUser');

      if (storedUser && authToken) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(userAction.setCurrentUser(parsedUser));
      }

      if (authToken) {
        try {
          // const authToken = localStorage.getItem('authToken');

          // if (!authToken) {
          //   setMessage('User is not authenticated');
          //   return;
          // }

          const response = await fetch(
            'https://studapi.teachmeskills.by/auth/users/me/',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            console.log('User data:', userData);

            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
              dispatch(userAction.setCurrentUser(userData));
              dispatch(myFavoritesActions.setFavorites(userInfo.favoritePosts));
              dispatch(cartActions.setCartItems(userInfo.cartItems));
              dispatch(cartActions.setTotalCost(userInfo.totalCost));
            }
          } else {
            setMessage('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setMessage('An error occurred while fetching user data');
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <StyledSignIn>
      <StyledSignInBlock>
        <CustomInput
          inputLabel='Email'
          inputType='email'
          placeholder='Enter your email'
          onChange={(event) => handleChangeValue('email', event)}
          value={loginData.email}
        />
        <StyledSignCIEyes>
          <CustomInput
            inputLabel='Password'
            inputType={passwordVisible ? 'text' : 'password'}
            placeholder='Enter your password'
            onChange={(event) => handleChangeValue('password', event)}
            value={loginData.password}
          />
          <StyledSignCIEyesBtn onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <RemoveRedEyeOutlinedIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </StyledSignCIEyesBtn>
        </StyledSignCIEyes>

        <StyledSignBlock>
          <StyledLinkSignIn to='/reset-password'>
            Forgot password?
          </StyledLinkSignIn>
        </StyledSignBlock>
        <Button onClick={handleSignIn}>Sign In</Button>
        {message && <div>{message}</div>}
      </StyledSignInBlock>
    </StyledSignIn>
  );
};

export default SignIn;
