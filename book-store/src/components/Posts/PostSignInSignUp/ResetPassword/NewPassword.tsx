// import React, { useState, useEffect } from 'react';
// import CustomInput from '../SignIn/CustomInput';
// import { StyledSignInBlock } from '../SignIn/styles';
// import Button from '../../../Button/Button';
// import { ChangeEvent } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { User } from '../../../../types';
// import { useDispatch } from 'react-redux';
// import { userAction } from '../../../../Store/Actions/userActions';
// import { verifyToken, refreshToken } from '../../../../client/api/postsApi';

// const NewPassword = () => {
//   const navigate = useNavigate();
//   const { userId, token } = useParams<{ userId: string; token: string }>();
//   console.log(userId, token);
//   const dispatch = useDispatch();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (typeof userId === 'undefined' || typeof token === 'undefined') {
//       setMessage('Ссылка для сброса пароля недействительна или устарела.');
//       navigate('/sign-in-up'); // Перенаправляем на страницу входа, если ссылка недействительна
//     }
//   }, [userId, token, navigate]);

//   // localStorage.setItem('userId', userId);
//   // localStorage.setItem('token', token);

//   // Инициализация состояний для пароля и подтверждения пароля

//   // Обработчик изменений в полях ввода
//   const handleChangeValue = (
//     inputName: string,
//     event: ChangeEvent<HTMLInputElement>
//   ) => {
//     if (inputName === 'password') {
//       setPassword(event.target.value);
//     } else if (inputName === 'confirmPassword') {
//       setConfirmPassword(event.target.value);
//     }
//   };

//   // Функция для отправки нового пароля на сервер
//   const handleNewPassword = async () => {
//     console.log('UserID:', userId);
//     setMessage('');

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     // try {
//     //   const authToken = token;
//     //   console.log(authToken); // Здесь должен быть токен для авторизации
//     //   const response = await fetch(
//     //     'https://studapi.teachmeskills.by/auth/users/set_password/',
//     //     {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //         Authorization: `Bearer ${authToken}`,
//     //       },
//     //       body: JSON.stringify({
//     //         token: token,
//     //         new_password: password,
//     //         current_password: '',
//     //       }),
//     //     }
//     //   );

//       try {
//         const response = await fetch(
//           'https://studapi.teachmeskills.by/auth/users/reset_password_confirm/',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               //Включите токен в заголовок Authorization
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               uid: userId,
//               token: token,
//               new_password: password,
//             }),
//           }
//         );

//       if (response.status === 204) {
//         setMessage('Password has been reset successfully.');
//         dispatch(userAction.updatePassword(password)); // Обновляем пароль в Redux Store
//         dispatch(userAction.clearCurrentUser());
//         navigate('/sign-in-up'); // Перенаправляем на страницу входа после успешного сброса пароля
//       } else {
//         const errorData = await response.text();
//         console.error('Server error:', errorData);
//         setMessage('Failed to reset password.');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('An error occurred while trying to reset the password.');
//     }
//   };

//   return (
//     <div>
//       <StyledSignInBlock>
//         <CustomInput
//           inputLabel='Password'
//           inputType='password'
//           placeholder='Enter your new password'
//           onChange={(event) => handleChangeValue('password', event)}
//           value={password}
//         />
//         <CustomInput
//           inputLabel='Confirm Password'
//           inputType='password'
//           placeholder='Confirm your new password'
//           onChange={(event) => handleChangeValue('confirmPassword', event)}
//           value={confirmPassword}
//         />
//         <Button onClick={handleNewPassword}>SET PASSWORD</Button>
//         {message && <div>{message}</div>}
//       </StyledSignInBlock>
//     </div>
//   );
// };

// export default NewPassword;

import React, { useState, useEffect } from 'react';
import CustomInput from '../SignIn/CustomInput';
import { StyledSignInBlock } from '../SignIn/styles';
import Button from '../../../Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../../../../Store/Actions/userActions';
import { verifyToken, refreshToken } from '../../../../client/api/postsApi';

const NewPassword = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams<{ userId: string; token: string }>();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId || !token) {
      setMessage('Ссылка для сброса пароля недействительна или устарела.');
      navigate('/sign-in-up');
    }
  }, [userId, token, navigate]);

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

  // Функция для обновления токена
  const updateToken = async () => {
    if (token) {
      try {
        const verificationResponse = await verifyToken(token);
        if (!verificationResponse || verificationResponse.error) {
          const refreshTokenResponse = await refreshToken(token);
          if (refreshTokenResponse && refreshTokenResponse.access) {
            return refreshTokenResponse.access;
          } else {
            setMessage('Unable to refresh token.');
            return null;
          }
        }
        return token;
      } catch (error) {
        console.error('Error updating token:', error);
        setMessage('Error occurred during token verification.');
        return null;
      }
    } else {
      console.error('Token is undefined');
      setMessage('Token is undefined or invalid.');
      return null;
    }
  };

  const handleNewPassword = async () => {
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (!token) {
      setMessage('Token is undefined or invalid.');
      return;
    }

    let validToken = token;

    try {
      const verificationResponse = await verifyToken(token);
      if (!verificationResponse || verificationResponse.error) {
        // Верификация токена не удалась, попытка обновить токен
        const refreshTokenResponse = await refreshToken(token); // Здесь убедитесь, что передаете правильный токен для обновления
        if (refreshTokenResponse && refreshTokenResponse.access) {
          validToken = refreshTokenResponse.access; // Используем новый токен
        } else {
          setMessage('Unable to refresh token.');
          return;
        }
      }

      const response = await fetch(
        'https://studapi.teachmeskills.by/auth/users/reset_password_confirm/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${validToken}`,
          },
          body: JSON.stringify({
            uid: userId,
            token: validToken,
            new_password: password,
          }),
        }
      );

      if (response.status === 204) {
        setMessage('Password has been reset successfully.');
        dispatch(userAction.updatePassword(password));
        dispatch(userAction.clearCurrentUser());
        navigate('/sign-in-up');
      } else {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        setMessage('Failed to reset password.');
      }
    } catch (error) {
      console.error(
        'An error occurred while trying to reset the password:',
        error
      );
      console.error(
        'An error occurred while trying to reset the password:',
        error
      );
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
