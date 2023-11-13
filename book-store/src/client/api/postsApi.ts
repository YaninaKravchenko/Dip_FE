import { ApiResponse, BookResponse } from '../../types';
import { user } from '../utils/http';

export const fetchPostData = async () => {
    const response = await fetch(`https://api.itbook.store/1.0/new`);
    const postData: ApiResponse = await response.json();
    return postData;
  };

export const fetchPostIsbn = async (isbn13: string) => {
  const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
  const postIsbn: BookResponse = await response.json();
  return postIsbn;
};

export const resetPasswordConfirm = async (uid: string, token: string, newPassword: string)  => {
  const response = await fetch('https://studapi.teachmeskills.by/auth/users/reset_password_confirm/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, token, new_password: newPassword }),
  });

  return response.json();
};

export const fetchUserInfo = async (authToken: string) => {
  const response = await fetch('https://studapi.teachmeskills.by/auth/users/me/', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.json();
};


export const verifyToken = async (token: string) => {
  //const tokenData = JSON.stringify({ token: token });

  const tokenVer = localStorage.getItem('authToken');
  const tokenData = JSON.stringify({ token: tokenVer });
  console.log(tokenVer)
console.log(tokenData);
const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTimestamp) {
    console.log('Token has expired');
    return false;
  }

  try {
    console.log('Verifying token:', token);
    const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: tokenData,
         });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return false; 
    }

    // Если токен действителен, функция возвращает true
    return true;
  } catch (error) {
    console.error( error);
    return false; // Возвращает false, если возникла ошибка
  }
};

// export const refreshToken = async (refreshToken: string) => {
  
//   console.log('Refreshing token:', refreshToken);
//   try {
//   const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ refresh: refreshToken }),
//   });

//   console.log('Response status:', response.status); 
//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error('Error refreshing token:', errorData);
//     return null;
//   }

//   const data = await response.json();
//     return data; // Возвращает новый токен
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     return null;
//   }
// };


export const refreshToken = async (refreshTokenValue: string) => {
  try {
    const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshTokenValue }),
    });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error refreshing token:', errorData);
//       return null;
//     }

//     const data = await response.json();
//     localStorage.setItem('authToken', data.access); // Обновляем токен доступа
//     return data.access;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     return null;
//   }
// };
if (response.ok) {
  const data = await response.json();
  localStorage.setItem('authToken', data.access); // Сохраняем обновленный токен
  return data.access;
} else {
  console.log('Не удалось обновить токен');
  return null;
}
} catch (error) {
console.error('Ошибка обновления токена:', error);
return null;
}
}