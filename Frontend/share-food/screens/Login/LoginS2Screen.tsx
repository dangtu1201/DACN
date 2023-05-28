import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';

export default function LoginS2Screen({ navigation }: LoginStackScreenProps<"LoginS2">) {

    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

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
            // show toast on top screen
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

    const handleLogin = () => {
        console.log("handleLogin");
    }

    return (
        <View style={styles.container}>
            <Image style={{width: 200, height: 200, marginTop: 40, alignSelf: "center"}} source={require("../../assets/images/icon.png")}/>
            <Text style={{marginTop: 10, fontSize: 16, fontWeight: "bold"}}>Xin chào, Nguyễn Văn A</Text>
            <Text style={{marginTop: 10, fontSize: 16, fontWeight: "bold"}}>0123456789</Text>
            <Text style={{marginTop: 30, fontSize: 16}}>Nhập mật khẩu:</Text>
            <View style={{flexDirection: "row",justifyContent: "space-between", width: "100%", borderBottomWidth: 1, marginTop: 10}}>
                <TextInput style={{fontSize: 16}}
                    placeholder=". . . . . ."
                    keyboardType="numeric"
                    secureTextEntry={!isShowPassword}
                    value={password}
                    onChangeText={onChangePassword}
                />
                <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
                    <FontAwesome name={isShowPassword ? "eye" : "eye-slash"} size={24} color="black" style={{marginTop: 10}} />
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

