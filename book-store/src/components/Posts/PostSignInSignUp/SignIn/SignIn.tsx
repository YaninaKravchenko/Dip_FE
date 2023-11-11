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

  const handleSignIn = () => {
    setMessage('');

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    console.log('Users in system:', users);
    console.log('Login Data:', loginData);

    const user: User | undefined = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    //const storedFavorites = localStorage.getItem('favoritePosts');

    if (user) {
      dispatch(userAction.setCurrentUser(user));
      localStorage.setItem('currentUser', JSON.stringify(user));

      const userKey = `userData_${user.email}`;
      const storedUserData = localStorage.getItem(userKey);
      if (storedUserData) {
        const { favoritePosts, cartItems, totalCost } =
          JSON.parse(storedUserData);
        dispatch(myFavoritesActions.setFavorites(favoritePosts || []));
        dispatch(cartActions.setCartItems(cartItems || []));
        dispatch(cartActions.setTotalCost(totalCost || 0));
      }

      closeModal();
      navigate('/');
    } else {
      setMessage('Invalid credentials');
    }
  };
  const autoSignIn = () => {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      dispatch(userAction.setCurrentUser(userData));

      const userKey = `userData_${userData.email}`;
      const storedUserData = localStorage.getItem(userKey);

      if (storedUserData) {
        const { favoritePosts, cartItems, totalCost } =
          JSON.parse(storedUserData);
        dispatch(myFavoritesActions.setFavorites(favoritePosts || []));
        dispatch(cartActions.setCartItems(cartItems || []));
        dispatch(cartActions.setTotalCost(totalCost || 0));
      }
      navigate('/');
    }
  };

  useEffect(() => {
    autoSignIn();
  }, []);

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
