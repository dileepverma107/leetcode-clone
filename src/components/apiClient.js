// apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/graphql', // Your backend proxy server URL
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;
