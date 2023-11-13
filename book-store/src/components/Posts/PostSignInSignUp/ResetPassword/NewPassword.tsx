import React, { useState, useEffect } from 'react';
import CustomInput from '../SignIn/CustomInput';
import { StyledSignInBlock } from '../SignIn/styles';
import Button from '../../../Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../../../../Store/Actions/userActions';
import { verifyToken, refreshToken } from '../../../../client/api/postsApi';

interface TokenResponse {
  access: string;
}

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

  const handleNewPassword = async () => {
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // if (!token) {
    //   setMessage('Token is undefined or invalid.');
    //   return;
    // }
    const accessToken = localStorage.getItem('authToken');
    console.log(accessToken);

    if (!accessToken) {
      setMessage('Token is undefined or invalid.');
      return;
    }

    const isTokenValid = await verifyToken(accessToken);
    console.log(isTokenValid);
    let validToken = accessToken;

    if (!isTokenValid) {
      const refreshTokenResponse = await refreshToken(accessToken);
      if (refreshTokenResponse && refreshTokenResponse.access) {
        validToken = refreshTokenResponse.access;
        console.log(validToken);
      } else {
        setMessage('Unable to refresh token.');
        console.log('Failed to refresh token');
        return;
      }
    }

    try {
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

      if (response.ok) {
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
