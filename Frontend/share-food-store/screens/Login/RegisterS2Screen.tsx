import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';

export default function RegisterS2Screen({ navigation, route }: LoginStackScreenProps<"RegisterS2">) {

    const [otp, setOtp] = useState("");
    const { phoneNumber } = route.params;

    const handleOtpChange = (text: string) => {
        // otp is 6 digits
        if (text.length <= 6) {
            setOtp(text);
        }
    }

    // validate otp
    const validateOtp = (otp: string) => {
        // otp is 6 digits
        if (otp.length < 6) {
            return false;
        }
        return true;
    }

    // handle click continue button
    const onClickContinue = () => {
        if (validateOtp(otp)) {
            navigation.navigate("RegisterS3", {phoneNumber: phoneNumber});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 50, fontSize: 16}}>Nhập otp mà chúng tôi đã gửi cho bạn:</Text>
            <Text style={{fontSize: 16}}>{phoneNumber}</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập otp"
                keyboardType="numeric"
                value={otp}
                onChangeText={handleOtpChange}
            />
            <Pressable style={{marginTop: 10}} onPress={() => {}}>
                <Text style={{fontSize: 16, color: Colors.light.textHighlight}}>Gửi lại otp</Text>
            </Pressable>
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

