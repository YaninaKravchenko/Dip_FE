import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StyledSuccessBlock,
  StyledSuccessBtn,
  StyledLoadingDots,
  StyledLoadingDotsOne,
  StyledLoadingDotsTwo,
  StyledLoadingDotsThree,
  StyledLoadingDotsFour,
  StyledLoadingDotsFive,
  StyledSuccessRegistration,
} from './styles';

interface ISuccessModal {
  onClose: () => void;
}

const SignUpSuccessModal: React.FC<ISuccessModal> = ({ onClose }) => {
  const { userId, token } = useParams<{ userId: string; token: string }>(); // Получаем параметры из URL
  const [isActivated, setIsActivated] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const activateAccount = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://studapi.teachmeskills.by/auth/users/activation/`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             // Не забудьте добавить X-CSRFToken если он требуется для вашего запроса
  //           },
  //           body: JSON.stringify({ uid: userId, token: token }), // Добавляем тело запроса
  //         }
  //       );

  //       if (response.ok) {
  //         setIsActivated(true);
  //       } else {
  //         // Обрабатываем ошибку активации
  //         alert('Ошибка активации');
  //       }
  //     } catch (error) {
  //       // Логируем ошибку в консоль
  //       console.error('Ошибка активации:', error);
  //       alert('Ошибка активации: ' + error);
  //     }
  //   };

  //   activateAccount();
  // }, [userId, token]);

  useEffect(() => {
    const activateAccount = async () => {
      // Проверяем, что userId и token не undefined перед выполнением запроса
      if (userId && token) {
        // Изменения здесь: проверка на undefined
        try {
          const response = await fetch(
            `https://studapi.teachmeskills.by/auth/users/activation/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ uid: userId, token: token }),
            }
          );

          if (response.ok) {
            setIsActivated(true);
            //const data = await response.json();
            localStorage.setItem('authToken', token); // Сохраняем токен, предварительно убедившись, что он не undefined
          } else {
            alert('Ошибка активации');
          }
        } catch (error) {
          console.error('Ошибка активации:', error);
          alert('Ошибка активации: ' + error);
        }
      }
    };

    activateAccount();
  }, [userId, token, navigate]);

  // const handleOkClick = () => {
  //   // Получаем токен из localStorage и проверяем, что он не null
  //   const storedToken = localStorage.getItem('authToken'); // Здесь токен может быть null, если его нет в localStorage
  //   if (storedToken) {
  //     navigate('/'); // Перенаправляем на главную страницу
  //   } else {
  //     navigate('/sign-in-up'); // Перенаправляем на страницу входа, если токен отсутствует
  //   }
  //   if (typeof onClose === 'function') {
  //     onClose();
  //   }
  // };
  const handleOkClick = () => {
    if (isActivated) {
      onClose?.(); // Вызываем onClose, если он есть
      navigate('/'); // Перенаправляем на страницу входа
    }
  };

  return (
    <StyledSuccessBlock>
      {isActivated ? (
        <StyledSuccessRegistration>
          <h2>Registration confirmation</h2>
          <p>Registration was successful!!!</p>
          <StyledSuccessBtn onClick={handleOkClick}>OK</StyledSuccessBtn>
        </StyledSuccessRegistration>
      ) : (
        <StyledLoadingDots>
          <StyledLoadingDotsOne></StyledLoadingDotsOne>
          <StyledLoadingDotsTwo></StyledLoadingDotsTwo>
          <StyledLoadingDotsThree></StyledLoadingDotsThree>
          <StyledLoadingDotsFour></StyledLoadingDotsFour>
          <StyledLoadingDotsFive></StyledLoadingDotsFive>
        </StyledLoadingDots>
      )}
    </StyledSuccessBlock>
  );
};

export default SignUpSuccessModal;
