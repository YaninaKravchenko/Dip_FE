import { ApiResponse, BookResponse } from '../../types';

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
    const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

//     const data = await response.json();
//     return data ===  204; // Возвращает данные о валидности токена
//   } catch (error) {
//     console.error('Error verifying token:', error);
// return false
//   }
// };


    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error verifying token:', errorData);
      return null;
    }

    const data = await response.json();
    return data; // Возвращает данные о валидности токена
  } catch (error) {
    console.error('Error verifying token:', error);
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
  const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error refreshing token:', errorData);
    return null;
  }

  const data = await response.json();
    return data; // Возвращает новый токен
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};