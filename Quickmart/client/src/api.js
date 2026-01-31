import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL
  withCredentials: true, // cookies ke liye
});

export default API;
