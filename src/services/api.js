import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://157.230.190.59',
  timeout: 5000
});
