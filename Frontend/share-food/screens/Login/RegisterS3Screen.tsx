import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';

interface RegisterInfo {
    phoneNumber: string;
    name: string;
    email: string;
    password: string;
}

export default function RegisterS3Screen({ navigation, route }: LoginStackScreenProps<"RegisterS3">) {

    const { phoneNumber } = route.params;
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({phoneNumber: phoneNumber, name: "", email: "", password: ""});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const onChangePassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setRegisterInfo({...registerInfo, password: text});
        }
    }

    const onChangeConfirmPassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setConfirmPassword(text);
        }
    }

    // validate email
    const validateEmail = (email: string) => {
        // validate email
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // validate register info
    const validateRegisterInfo = (registerInfo: RegisterInfo) => {
        // name is not empty
        if (registerInfo.name.length === 0) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Họ và tên không hợp lệ",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            return false;
        }
        // email is not empty
        if (registerInfo.email.length === 0 || !validateEmail(registerInfo.email)) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Email không hợp lệ",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            return false;
        }
        // password is 6 digits
        if (registerInfo.password.length < 6) {
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
        // password and confirm password are the same
        if (registerInfo.password !== confirmPassword) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Mật khẩu không khớp",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            return false;
        }
        return true;
    }

    // handle click register button
    const onClickRegister = () => {
        if (validateRegisterInfo(registerInfo)) {
            Toast.show({
                type: "success",
                position: "top",
                text1: "Đăng ký thành công",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            navigation.navigate("Login");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 16}}>Họ và tên</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập họ và tên"
                value={registerInfo.name}
                onChangeText={(text) => setRegisterInfo({...registerInfo, name: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Email</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập email"
                value={registerInfo.email}
                onChangeText={(text) => setRegisterInfo({...registerInfo, email: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Mật khẩu</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                <TextInput style={{ fontSize: 16}}
                    keyboardType="numeric"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!isShowPassword}
                    value={registerInfo.password}
                    onChangeText={onChangePassword}
                />
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowPassword(!isShowPassword)}>
                    <FontAwesome name={isShowPassword ? "eye" : "eye-slash"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 16, marginTop: 20}}>Nhập lại mật khẩu</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                <TextInput style={{ fontSize: 16}}
                    keyboardType="numeric"
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={!isShowConfirmPassword}
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                />
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                    <FontAwesome name={isShowConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}}
                onPress={onClickRegister}
            >
                <Text style={{fontSize: 16, color: "white"}}>Đăng ký</Text>
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

