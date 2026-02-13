import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
console.log('API Base URL:', baseURL);

export default axios.create({
    baseURL: baseURL,
});