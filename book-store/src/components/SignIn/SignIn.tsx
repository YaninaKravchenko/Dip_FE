import React, { useRef, useContext, useState } from 'react';
import CustomInput from './CustomInput';
import ButtonBackToHome from '../Pages/ButtonBackToHome';
import { StyledSignIn, StyledSignInBlock, StyledSignInBtn } from './styles';
import UserContext from '../User/UserContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

const SignIn = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { authenticateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

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
    if (user) {
      authenticateUser(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <StyledSignIn>
      <ButtonBackToHome />
      <h2>Sign In</h2>
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
