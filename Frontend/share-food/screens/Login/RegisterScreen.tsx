import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';
import { useGetUserByPhoneQuery } from "../../redux/api/authApi";
import { toast } from "../../services/toast";

export default function RegisterScreen({ navigation }: LoginStackScreenProps<"Register">) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const { currentData } = useGetUserByPhoneQuery(JSON.stringify({phone: phoneNumber}))

    // phone number is 10 digits
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
            // show toast on top screen
            toast("error","Số điện thoại không hợp lệ","");
            return false;
        }
        return true;
    }

    // handle click continue button
    const onClickContinue = () => {
        if (validatePhoneNumber(phoneNumber)) {
            if (currentData.users) {
                toast("error","Số điện thoại đã đăng ký","");
            } else {
                navigation.navigate("RegisterS2", {phoneNumber: phoneNumber});
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 50, fontSize: 16}}>Nhập số điện thoại của bạn:</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
            />
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}} 
                onPress={onClickContinue}
            >
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

