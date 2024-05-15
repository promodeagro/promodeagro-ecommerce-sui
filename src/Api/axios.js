import axios from 'axios';

const API = axios.create({
    baseURL : 'https://dq5mcoq79b.execute-api.us-east-1.amazonaws.com',
})

export default API; 