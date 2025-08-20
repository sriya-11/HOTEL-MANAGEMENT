

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
  //baseURL: import.meta.env.VITE_API_URL,  // must be e.g. http://localhost:5000/api
});

export default API;

