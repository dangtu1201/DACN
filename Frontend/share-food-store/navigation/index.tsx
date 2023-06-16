import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import LoginNavigation from "./Login";
import StoreNavigation from "./Store";
import { getUserId } from "../services/testLogin";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { setStatusLogin } from "../redux/login";

export default function RootNavigation() {

    const [userId, setUserId] = useState<null | string>(null);
    const changeLogin = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkLogin = async () => {
            const isLogin = await getUserId();
            setUserId(isLogin);
            isLogin ? dispatch(setStatusLogin('login')) : dispatch(setStatusLogin('logout'));
        }
        checkLogin();
    }, [changeLogin]);

    if (userId) {
        return (
            <SafeAreaProvider>
                <StoreNavigation/>
                <Toast/>
            </SafeAreaProvider>
        );
    } else {
        return (
            <SafeAreaProvider>
                <LoginNavigation/>
                <Toast/>
            </SafeAreaProvider>
        );
    }    
}