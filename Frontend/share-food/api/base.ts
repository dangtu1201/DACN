import axios from "axios";
import axiosRetry from "axios-retry";

const client = axios.create();
axiosRetry(client, {
    retries: 3, retryDelay: (retryCount: number) => {
        return Math.pow(2, retryCount) * 300;
    }
});