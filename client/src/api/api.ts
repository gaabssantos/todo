import axios from 'axios';

export const baseUrl = axios.create({ baseURL: process.env.VITE_API_URL });
