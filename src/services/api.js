import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-perito.onrender.com/",
    timeout: 8000,
})