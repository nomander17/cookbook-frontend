import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8090',
});

export default request;