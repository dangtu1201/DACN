import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }: LoginStackScreenProps<"Login">) {

    const [phoneNumber, setPhoneNumber] = useState("");

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

    // handle click continue button
    const onClickContinue = () => {
        if (validatePhoneNumber(phoneNumber)) {
            navigation.navigate("LoginS2", {phoneNumber: phoneNumber});
        }
    }

    return (
        <View style={styles.container}>
            <Image style={{width: 200, height: 200, marginTop: 40, alignSelf: "center"}} source={require("../../assets/images/icon.png")}/>
            <Text style={{marginTop: 50, fontSize: 16}}>Nhập số điện thoại của bạn:</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}} 
                onPress={onClickContinue}>
                <Text style={{fontSize: 16, color: "white"}}>Tiếp tục</Text>
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

