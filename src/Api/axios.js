import axios from 'axios';

const API = axios.create({
    baseURL : 'https://1fix2seef4.execute-api.us-east-1.amazonaws.com/',
})

export default API; 