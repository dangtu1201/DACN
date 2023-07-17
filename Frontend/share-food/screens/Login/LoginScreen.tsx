import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';
import { useLoginMutation } from "../../redux/api/authApi";
import { useSelector, useDispatch } from 'react-redux';
import { loginApp } from "../../redux/login";


export default function LoginScreen({ navigation }: LoginStackScreenProps<"Login">) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [login, { data, error, isLoading }] = useLoginMutation();

    const onChangePassword = (text: string) => {
        // password 6 number
        if (text.length <= 6) {
            setPassword(text);
        }
    }

    // validate password
    const validatePassword = (password: string) => {
        // password 6 number
        if (password.length < 6) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Mật khẩu phải có 6 ký tự",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            return false;
        }
        return true;
    }

    // on change phone number
    const onChangePhoneNumber = (text: string) => {
        // phone number is 10 digits
        if (text.length <= 10) {
            setPhoneNumber(text);
        }
    }

    // validate phone number
    const validatePhoneNumber = (phoneNumber: string) => {
        // phone number 10 number
        if (phoneNumber.length < 10) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Số điện thoại không hợp lệ",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            return false;
        }
        return true;
    }

    const handleLogin = () => {
        if ( validatePhoneNumber(phoneNumber) && validatePassword(password)) {
            login(`{"input": {"phone": "${phoneNumber}", "password": "${password}", "as": "User"}}`).unwrap().then(
                res => {
                    Toast.show({
                        type: "success",
                        position: "top",
                        text1: "Đăng nhập thành công",
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 100,
                        bottomOffset: 40,
                    });
                    console.log(res?.Login?.userID, res?.Login?.refreshToken);
                    dispatch(loginApp({userId: res?.Login?.userID, usertoKen: res?.Login?.refreshToken}));
                }
            ).catch(
                err => console.log(err)
            );
        }
    }

    return (
        <View style={styles.container}>
            <Image style={{width: 200, height: 200, marginTop: 40, alignSelf: "center"}} source={require("../../assets/images/icon.png")}/>
            <Text style={{marginTop: 50, fontSize: 16}}>Nhập số điện thoại của bạn:</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 6}}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
            />
            <Text style={{marginTop: 20, fontSize: 16}}>Nhập mật khẩu:</Text>
            <View style={{flexDirection: "row",justifyContent: "space-between", width: "100%", borderBottomWidth: 1, marginTop: 6}}>
                <TextInput style={{fontSize: 16}}
                    placeholder=". . . . . ."
                    keyboardType="numeric"
                    secureTextEntry={!isShowPassword}
                    value={password}
                    onChangeText={onChangePassword}
                />
                <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
                    <FontAwesome name={isShowPassword ? "eye" : "eye-slash"} size={24} color="black" style={{marginTop: 6}} />
                </Pressable>
            </View>
            <Pressable style={{marginTop: 10}}>
                <Text style={{fontSize: 16, color: Colors.light.textHighlight}}>Quên mật khẩu?</Text>
            </Pressable>
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}} 
                onPress={handleLogin}
            >
                <Text style={{fontSize: 16, color: "white"}}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
});

