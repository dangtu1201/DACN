import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

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

