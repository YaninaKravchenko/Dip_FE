import React, { useState, useEffect } from 'react';
import CustomInput from '../SignIn/CustomInput';
import { StyledSignInBlock } from '../SignIn/styles';
import Button from '../../../Button/Button';
import { ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../../../types';
import { useDispatch } from 'react-redux';
import { userAction } from '../../../../Store/Actions/userActions';

const NewPassword = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams<{ userId: string; token: string }>();
  console.log(userId, token);
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof userId === 'undefined' || typeof token === 'undefined') {
      setMessage('Ссылка для сброса пароля недействительна или устарела.');
      navigate('/sign-in-up'); // Перенаправляем на страницу входа, если ссылка недействительна
    }
  }, [userId, token, navigate]);

  // localStorage.setItem('userId', userId);
  // localStorage.setItem('token', token);

  // Инициализация состояний для пароля и подтверждения пароля

  // Обработчик изменений в полях ввода
  const handleChangeValue = (
    inputName: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputName === 'password') {
      setPassword(event.target.value);
    } else if (inputName === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
  };

  // Функция для отправки нового пароля на сервер
  const handleNewPassword = async () => {
    console.log('UserID:', userId);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(
        'https://studapi.teachmeskills.by/auth/users/reset_password_confirm/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Включите токен в заголовок Authorization
            //Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            uid: userId,
            token: token,
            new_password: password,
          }),
        }
      );
      if (response.status === 204) {
        setMessage('Password has been reset successfully.');
        dispatch(userAction.updatePassword(password)); // Обновляем пароль в Redux Store
        dispatch(userAction.clearCurrentUser());
        navigate('/sign-in-up'); // Перенаправляем на страницу входа после успешного сброса пароля
      } else {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        setMessage('Failed to reset password.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while trying to reset the password.');
    }
  };

  return (
    <div>
      <StyledSignInBlock>
        <CustomInput
          inputLabel='Password'
          inputType='password'
          placeholder='Enter your new password'
          onChange={(event) => handleChangeValue('password', event)}
          value={password}
        />
        <CustomInput
          inputLabel='Confirm Password'
          inputType='password'
          placeholder='Confirm your new password'
          onChange={(event) => handleChangeValue('confirmPassword', event)}
          value={confirmPassword}
        />
        <Button onClick={handleNewPassword}>SET PASSWORD</Button>
        {message && <div>{message}</div>}
      </StyledSignInBlock>
    </div>
  );
};

export default NewPassword;
