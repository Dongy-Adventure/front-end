import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "localhost:3002",
  timeout: 10000,
});