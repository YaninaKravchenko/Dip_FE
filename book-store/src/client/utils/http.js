import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api.itbook.store',
});

export const postClient = axios.create({
  baseURL: 'https://api.itbook.store',
});
