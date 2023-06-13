import axios from "axios";
import axiosRetry from "axios-retry";
import { Mutex } from 'async-mutex';
import { getUser } from "../services/testLogin";

const client = axios.create();
axiosRetry(client, {
    retries: 3, retryDelay: (retryCount: number) => {
        return Math.pow(2, retryCount) * 300;
    }
});

client.interceptors.request.use(
    async (config) => {
        const user = await getUser();
        if (user) {
            const token = user.userToken;
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const mutex = new Mutex();
client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const config = error.config;
        if (!config || !config.retry) return Promise.reject(error);
    }
);



export default client;