import React, { useState, useEffect } from 'react';
import CustomInput from './CustomInput';
import {
  StyledSignIn,
  StyledSignInBlock,
  StyledSignInBtn,
  StyledSignBlock,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { userAction } from '../../Store/Actions/userActions';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Actions/cartActions';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';

interface ISignInProps {
  closeModal: () => void;
}

const SignIn: React.FC<ISignInProps> = ({ closeModal }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user: User | undefined = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    const storedFavorites = localStorage.getItem('favoritePosts');

    if (user) {
      dispatch(userAction.setCurrentUser(user));
      localStorage.setItem('currentUser', JSON.stringify(user));

      const userKey = `userData_${user.email}`;
      const storedUserData = localStorage.getItem(userKey);
      if (storedUserData) {
        const { favoritePosts, cartItems, totalCost } =
          JSON.parse(storedUserData);
        dispatch(myFavoritesActions.setFavorites(favoritePosts));
        dispatch(cartActions.setCartItems(cartItems));
        dispatch(cartActions.setTotalCost(totalCost));
      }

      closeModal();
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <StyledSignIn>
      <StyledSignBlock>
        <h2>Sign In</h2>
      </StyledSignBlock>
      <StyledSignInBlock>
        <CustomInput
          inputLabel='Email'
          inputType='email'
          placeholder='Enter your email'
          onChange={(event) => handleChangeValue('email', event)}
          value={loginData.email}
        />
        <CustomInput
          inputLabel='Password'
          inputType='password'
          placeholder='Enter your password'
          onChange={(event) => handleChangeValue('password', event)}
          value={loginData.password}
        />
        <StyledSignInBtn onClick={handleSignIn}>Sign In</StyledSignInBtn>
      </StyledSignInBlock>
    </StyledSignIn>
  );
};

export default SignIn;
