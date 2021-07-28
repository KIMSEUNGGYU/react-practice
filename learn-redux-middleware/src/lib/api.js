import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPost = (id) => axios.get(`${BASE_URL}/posts/${id}`);
export const getUsers = (id) => axios.get(`${BASE_URL}/users`);
