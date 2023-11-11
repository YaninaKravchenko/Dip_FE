import React, { useState } from 'react';
import CustomInput from '../SignIn/CustomInput';
//import { StyledSignIn, StyledSignInBlock } from '../SignIn/styles';
import Button from '../../../Button/Button';
import { StyledResetPassword, StyledResetPasswordBlock } from './styles';
import IconArrowBack from '../../../IconArrowBack/IconArrowBack';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleChangeValue = (value: string) => {
    setEmail(value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        'https://studapi.teachmeskills.by/auth/users/reset_password/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      //const data = await response.json();

      if (response.status === 204) {
        setSubmit(true);
        console.log('Password reset email sent successfully to:', email);
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      alert('Failed to send password reset email: ' + error);
    }
  };
  return (
    <div>
      <IconArrowBack />

      <StyledResetPassword>
        <StyledResetPasswordBlock>
          <h2>RESET PASSWORD</h2>
          {submit && (
            <p>
              You will receive an email {email} with a link to reset your
              password!
            </p>
          )}
          <CustomInput
            inputLabel='Email'
            inputType='email'
            placeholder='Enter your email'
            onChange={(event) => handleChangeValue(event.target.value)}
            value={email}
          />

          <Button onClick={handleResetPassword}>RESET</Button>
        </StyledResetPasswordBlock>
      </StyledResetPassword>
    </div>
  );
};

export default ResetPassword;
