import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import CustomInput from '../Account/CustomInput';
import Button from '../Button/Button';
import IconArrowBack from '../IconArrowBack/IconArrowBack';
import { userAction } from '../../Store/Actions/userActions';
import {
  StyledAccountWrapper,
  StyledAccountProfile,
  StyledAccountProfileName,
  StyledAccountBtn,
  StyledAccount,
  StyledDiv,
  StyledAccountH4,
  StyledAccountH2,
} from './styles';

const Account = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState(currentUser?.name || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Обновление состояния name при изменении currentUser
    if (currentUser) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match, please try again');
      return;
    }

    // Обновлю имя и пароль в Redux
    dispatch(userAction.updateName(name));
    //localStorage.setItem('userName', name);

    if (newPassword) {
      dispatch(userAction.updatePassword(newPassword));
      localStorage.setItem('userPassword', newPassword);

      // Очистка полей пароля после сохранения

      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

    localStorage.setItem('userName', name);
    if (newPassword) {
      localStorage.setItem('userPassword', newPassword);
    }

    alert('Changes have been saved successfully.!');
  };

  const handleCancel = () => {
    // Отмена изменений и возврат к текущему имени пользователя
    if (currentUser) {
      setName(currentUser.name);
    }
    // Очистка полей пароля
    setName(currentUser?.name || '');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // useEffect(() => {
  //   const savedName = localStorage.getItem('userName');
  //   const savedPassword = localStorage.getItem('userPassword');

  //   if (savedName) {
  //     setName(savedName);
  //     dispatch(userAction.updateName(savedName));
  //   }

  //   if (savedPassword) {
  //     setPassword(savedPassword);
  //     dispatch(userAction.updatePassword(savedPassword));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem('userName', name);
  //   localStorage.setItem('userPassword', password);
  // }, [name, password]);
  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.name);
  //     localStorage.setItem('userName', currentUser.name);
  //     localStorage.setItem('userPassword', currentUser.password);
  //   }
  // }, [currentUser]);

  return (
    <StyledAccountWrapper>
      <IconArrowBack />
      <StyledAccountH2>ACCOUNT</StyledAccountH2>
      <StyledAccount>
        <StyledAccountProfile>
          <StyledAccountH4>PROFILE</StyledAccountH4>
          <StyledAccountProfileName>
            <CustomInput
              inputLabel='Name'
              inputType='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
              inputLabel='Email'
              inputType='email'
              placeholder='Enter your email'
              value={currentUser?.email}
              readOnly
            />
          </StyledAccountProfileName>
        </StyledAccountProfile>
        <StyledAccountProfile>
          <StyledAccountH4>PASSWORD</StyledAccountH4>
          <StyledAccountProfileName>
            <CustomInput
              inputLabel='Password'
              inputType='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledDiv></StyledDiv>
          </StyledAccountProfileName>
          <StyledAccountProfileName>
            <CustomInput
              inputLabel='New password'
              inputType='password'
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <CustomInput
              inputLabel='Confirm new password'
              inputType='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </StyledAccountProfileName>
        </StyledAccountProfile>
      </StyledAccount>
      <StyledAccountBtn>
        <Button onClick={handleSave}>SAVE CHANGES</Button>
        <Button onClick={handleCancel}>CANCEL</Button>
      </StyledAccountBtn>
    </StyledAccountWrapper>
  );
};

export default Account;
