//import { PostData } from './../../components/Posts/NewAddPost';
import { client, postClient } from '../utils/http';
import { PostBook, ApiResponse  } from '../../types';

export const postsApi = {
    addPost: (PostData: PostBook, token: string) =>
    client.post('/new', {
        params: PostData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }),

    getAllPosts: (limit = 4, offset = 0 ) =>
        client.get(`/new?limit=${limit}&offset=${offset}`),

    getPrevNextPost: (url:string) => postClient.get(url),
    
    getMyPosts: (token: string) => client.get('/new?limit=4', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
};

export const fetchPostData = async () => {
    const response = await fetch(`https://api.itbook.store/1.0/new`);
    const postData: ApiResponse = await response.json();
    return postData;
  };