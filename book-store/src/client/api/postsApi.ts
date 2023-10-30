import { ApiResponse  } from '../../types';

// export const postsApi = {
//     addPost: (PostData: PostBook, token: string) =>
//     client.post('/new', {
//         params: PostData,
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//     }),
// };

export const fetchPostData = async () => {
    const response = await fetch(`https://api.itbook.store/1.0/new`);
    const postData: ApiResponse = await response.json();
    return postData;
  };