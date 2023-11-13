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
  try {
    console.log('Verifying token:', token);
    const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  
        token: token 
      }),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error verifying token:', errorData);
      return false; 
    }

    // Если токен действителен, функция возвращает true
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false; // Возвращает false, если возникла ошибка
  }
};
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error verifying token:', errorData);
//       return null;
//     }

//     const data = await response.json();
//     return data; // Возвращает данные о валидности токена
//   } catch (error) {
//     console.error('Error verifying token:', error);
//   }
// };

export const refreshToken = async (refreshToken: string) => {
  console.log('Refreshing token:', refreshToken);
  try {
  const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  console.log('Response status:', response.status); 
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error refreshing token:', errorData);
    return null;
  }

  const data = await response.json();
    return data; // Возвращает новый токен
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// export const verifyToken = async (token: string) => {
//   console.log('Verifying token:', token);
//   try {
//     const response = await user.post('/auth/jwt/verify/', { token });
//     console.log('Verification response:', response);
//     return response;
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     throw error; 
//   }
// };

// export const refreshToken = async (token: string) => {
//   console.log('Refreshing token:', token);
//   try {
//     const response = await user.post('/auth/jwt/refresh/', { refresh: token });
//     console.log('Refresh token response:', response);
//     return response;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     throw error;
//   }
// };
