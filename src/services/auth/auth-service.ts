/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'http://localhost:4300/api/auth/login';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data.data.attributes;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
