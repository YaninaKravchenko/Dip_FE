import React, { useState } from 'react';
import { StyledSuccess } from './styles';
import { StyledSignInBlock, StyledSignInBtn } from '../SignIn/styles';
import CustomInput from '../SignIn/CustomInput';
//import { useNavigate } from 'react-router-dom';
import SignUpSuccessModal from './SignUpSuccessModal';
import { userAction } from '../../Store/Actions/userActions';
import { useDispatch } from 'react-redux';

type SignUpPageProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

const SignUpPage: React.FC<SignUpPageProps> = ({ setIsVisible, onClose }) => {
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  //const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const handleChangeValue = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignUpData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSignUp = () => {
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (
      users.some((user: { email: string }) => user.email === signUpData.email)
    ) {
      alert('Email already registered');
      return;
    }
    users.push(signUpData);
    localStorage.setItem('users', JSON.stringify(users));
    //authenticateUser(signUpData);
    dispatch(userAction.setCurrentUser(signUpData));

    setIsRegistered(true);
    setShowSuccessModal(true);
    //navigate('/sign-up');
  };

  const closeAll = () => {
    setIsRegistered(false);
    setShowSuccessModal(false);
    setIsVisible(false);
    onClose();
  };

  return (
    <StyledSuccess>
      <h2>Sign Up</h2>
      {isRegistered && showSuccessModal ? (
        <SignUpSuccessModal onClose={closeAll} />
      ) : !isRegistered ? (
        <StyledSignInBlock>
          <CustomInput
            inputLabel='Name'
            inputType='name'
            placeholder='Enter your name'
            onChange={(event) => handleChangeValue('name', event)}
            value={signUpData.name}
          />
          <CustomInput
            inputLabel='Email'
            inputType='email'
            placeholder='Enter your email'
            onChange={(event) => handleChangeValue('email', event)}
            value={signUpData.email}
          />
          <CustomInput
            inputLabel='Password'
            inputType='password'
            placeholder='Enter your password'
            onChange={(event) => handleChangeValue('password', event)}
            value={signUpData.password}
          />
          <CustomInput
            inputLabel='Confirm password'
            inputType='password'
            placeholder='Enter your confirm password'
            onChange={(event) => handleChangeValue('confirmPassword', event)}
            value={signUpData.confirmPassword}
          />
          <StyledSignInBtn onClick={handleSignUp}>Sign Up</StyledSignInBtn>
        </StyledSignInBlock>
      ) : null}
    </StyledSuccess>
  );
};

export default SignUpPage;
