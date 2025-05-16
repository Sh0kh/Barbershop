import axios from "axios";

// export const BASE_URL = "https://barbergo.uz";
export const BASE_URL = "https://sad-books-sink.loca.lt";


export const $api = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
})