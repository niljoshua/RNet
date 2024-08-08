import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.biofy.ai/",
    timeout: 8000,
})

export const pix = axios.create({
    baseURL: "https://mp.biofy.ai/",
    timeout: 8000,
})

