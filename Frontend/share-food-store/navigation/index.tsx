import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import LoginNavigation from "./Login";
import StoreNavigation from "./Store";
import { getUser} from "../services/testLogin";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setStatusLogin, setUser } from "../redux/login";
import { setLocation } from "../redux/userAddr";
import * as Location from 'expo-location';

export default function RootNavigation() {

    const Login = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkLogin = async () => {
            const isLogin = await getUser();
            isLogin ? dispatch(setStatusLogin('login')) : dispatch(setStatusLogin('logout'));
            const user = await getUser();
            if (user) {
                dispatch(setStatusLogin('login'));
                dispatch(setUser({userId: user?.userId, userToken: user?.userToken}));
            }
        }
        checkLogin();
    }, [Login]);

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

    if (Login?.statusLogin === 'login') {
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