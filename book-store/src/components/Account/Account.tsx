import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import CustomInput from '../SignIn/CustomInput';
import Button from '../Button/Button';
import IconArrowBack from '../IconArrowBack/IconArrowBack';
import { userAction } from '../../Store/Actions/userActions';
import {
  StyledAccountWrapper,
  StyledAccountProfile,
  StyledAccountProfileName,
  StyledAccountBtn,
} from './styles';

const Account = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState(currentUser?.name || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //   const handleSave = () => {
  //     // Логика сохранения изменений, например, обновление пароля
  //     if (newPassword === confirmPassword) {
  //       // Обновить пароль в базе данных
  //     } else {
  //       alert('Пароли не совпадают!');
  //     }
  //   };

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    // Обновите имя и пароль в Redux и возможно в базе данных
    dispatch(userAction.updateName(name));
    if (newPassword) {
      dispatch(userAction.updatePassword(newPassword));
      localStorage.setItem('userPassword', newPassword);
      // Очистка полей пароля после сохранения
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

    localStorage.setItem('userName', name);

    alert('Изменения сохранены успешно!');
    // dispatch(userAction.updatePassword(newPassword));
    // localStorage.setItem('userName', name);
    // localStorage.setItem('userPassword', newPassword);

    // alert('Изменения сохранены успешно!');
    // // Очистка полей пароля после сохранения
    // setPassword('');
    // setNewPassword('');
    // setConfirmPassword('');
  };

  const handleCancel = () => {
    // Логика отмены изменений, например, очистка полей
    setName(currentUser?.name || '');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  useEffect(() => {
    const saveName = localStorage.getItem('userName');
    const savePassword = localStorage.getItem('userPassword');

    if (saveName) {
      setName(saveName);
      dispatch(userAction.updateName(saveName)); // Обновление Redux Store
    }

    if (savePassword) {
      setPassword(savePassword);
      dispatch(userAction.updatePassword(savePassword)); // Обновление Redux Store
    }
  }, []);

  return (
    <StyledAccountWrapper>
      <IconArrowBack />
      <StyledAccountProfile>
        <h4>PROFILE</h4>
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
        <h4>PASSWORD</h4>
        <div>
          <p>Password</p>
          <CustomInput
            inputLabel='password'
            inputType='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>New password</p>
          <CustomInput
            inputLabel='New password'
            inputType='password'
            placeholder='Enter your new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p>Confirm new password</p>
          <CustomInput
            inputLabel='Confirm new password'
            inputType='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </StyledAccountProfile>
      <StyledAccountBtn>
        <Button onClick={handleSave}>SAVE CHANGES</Button>
        <Button onClick={handleCancel}>CANSEL</Button>
      </StyledAccountBtn>
    </StyledAccountWrapper>
  );
};

export default Account;
