import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface RegisterInfo {
    phone: string;
    name: string;
    email: string;
    cardId: string;
    storeName: string;
    storeAddress: string;
    password: string;
}

export default function RegisterS3Screen({ navigation, route }: LoginStackScreenProps<"RegisterS3">) {

    const { phone } = route.params;
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({phone: phone, name: "", email: "", cardId: "", storeName: "", storeAddress: "", password: ""});
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
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
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
            <Text style={{fontSize: 16, marginTop: 20}}>Số CMND</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập số CMND"
                value={registerInfo.cardId}
                onChangeText={(text) => setRegisterInfo({...registerInfo, cardId: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Tên cửa hàng</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập tên cửa hàng" 
                value={registerInfo.storeName}
                onChangeText={(text) => setRegisterInfo({...registerInfo, storeName: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Địa chỉ cửa hàng</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập địa chỉ cửa hàng"
                value={registerInfo.storeAddress}
                onChangeText={(text) => setRegisterInfo({...registerInfo, storeAddress: text})}
            />
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                <Text style={{fontSize: 16}}>Chọn địa chỉ trên bản đồ</Text>
                <Ionicons name='location' color={Colors.light.contentHeader} size={24}/>
            </View>
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
});

