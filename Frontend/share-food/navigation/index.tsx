import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import LoginNavigation from "./Login";
import UserNavigation from "./User";
import { getUser } from "../services/testLogin";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store';
import { setStatusLogin, setUser } from "../redux/login";
import { setLocation } from "../redux/userAddr";
import * as Location from 'expo-location';


export default function RootNavigation() {

    const [userId, setUserId] = useState<null | string>(null);
    const changeLogin = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkLogin = async () => {
            const user = await getUser();
            setUserId(user?.userId);
            user ? dispatch(setStatusLogin('login')) : dispatch(setStatusLogin('logout'));
            dispatch(setUser({userId: user?.userId, userToken: user?.userToken}));
        }
        checkLogin();
    }, [changeLogin]);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied')
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          dispatch(setLocation({lat: location.coords.latitude, lng: location.coords.longitude})); 
        })();
    }, []);

    if (userId) {
        return (
            <SafeAreaProvider>
                <UserNavigation/>
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