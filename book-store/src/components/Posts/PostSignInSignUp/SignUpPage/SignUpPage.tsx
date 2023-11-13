import React, { useState } from 'react';
import { StyledSuccess, StyledSuccessBtn } from './styles';
import { StyledSignInBlock } from '../SignIn/styles';
import CustomInput from '../SignIn/CustomInput';
import SignUpSuccessModal from './SignUpSuccessModal';
import { userAction } from '../../../../Store/Actions/userActions';
import { useDispatch } from 'react-redux';
//import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../Button/Button';

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

  const handleSignUp = async () => {
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        'https://studapi.teachmeskills.by/auth/users/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: signUpData.name,
            email: signUpData.email,
            password: signUpData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({
          email: signUpData.email,
          name: signUpData.name,
          password: signUpData.password,
        });

        // Сохраняем обновленный список пользователей
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            email: signUpData.email,
            name: signUpData.name,
            password: signUpData.password,
          })
        );
        if (data.token) {
          localStorage.setItem('authToken', data.token); // Токен сохраняем
        }
        setIsRegistered(true);
        setShowSuccessModal(true);
      } else {
        // Обработка ошибки, если статус ответа не "ok"
        const errorData = await response.json();
        console.log(errorData);
        //alert('Registration failed: ' + (errorData.detail || 'Unknown error'));
      }
    } catch (error) {
      // Обработка исключения в случае ошибки при выполнении запроса
      console.error('Registration error:', error);
      //alert('Registration error: ' + error);
    }
  };

  const closeAll = () => {
    setIsRegistered(false);
    setShowSuccessModal(false);
    setIsVisible(false);
    onClose();
  };

  return (
    <StyledSuccess>
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
          <StyledSuccessBtn></StyledSuccessBtn>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </StyledSignInBlock>
      ) : null}
    </StyledSuccess>
  );
};

export default SignUpPage;
