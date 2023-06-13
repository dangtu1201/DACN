import axios from "axios";
import axiosRetry from "axios-retry";
import { useSelector, useDispatch } from 'react-redux';
import { logoutApp } from "../redux/login";


const auth = axios.create();
axiosRetry(auth, {
    retries: 3, retryDelay: (retryCount: number) => {
        return Math.pow(2, retryCount) * 300;
    }
});

export const login = async (phoneNumber: string, password: string) => {
    const res = await auth.post('/auth/login', {
        phoneNumber,
        password
    });
    return res.data;
}

export const register = async (phoneNumber: string, password: string, name: string) => {
    const res = await auth.post('/auth/register', {
        phoneNumber,
        password,
        name
    });
    return res.data;
}

export const logout = async () => {
    // const res = await auth.post('/auth/logout');
    const dispatch = useDispatch();
    dispatch(logoutApp());
    // return res.data;
}

export default auth;