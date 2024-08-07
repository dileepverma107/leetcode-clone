// apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://prime-code-rouge.vercel.app/graphql', // Your backend proxy server URL
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
