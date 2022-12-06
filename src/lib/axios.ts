import axios from 'axios';

export const api = axios.create({
    baseURL: "https://localhost:7288",
    headers: {Authorization: `Bearer ${localStorage.token}`}
})