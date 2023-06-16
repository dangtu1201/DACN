import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';

interface UpdateInfo {
    name: string;
    email: string;
    storeName: string;
}

export default function EditProfileScreen({ navigation }: RootStackScreenProps<"EditProfile">) {

    const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({name: "", email: "", storeName: ""});

    // validate email
    const validateEmail = (email: string) => {
        // validate email
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // validate register info
    const validateUpdateInfo = (updateInfo: UpdateInfo) => {
        // name is not empty
        if (updateInfo.name.length === 0) {
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
        if (updateInfo.email.length === 0 || !validateEmail(updateInfo.email)) {
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
        // store name is not empty
        if (updateInfo.storeName.length === 0) {
            Toast.show({
                type: "error",
                position: "top",
                text1: "Tên cửa hàng không hợp lệ",
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
    const onClickUpdate = () => {
        if (validateUpdateInfo(updateInfo)) {
            Toast.show({
                type: "success",
                position: "top",
                text1: "Cập nhật thành công",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
            });
            navigation.navigate("Root");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 16}}>Họ và tên</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập họ và tên"
                value={updateInfo.name}
                onChangeText={(text) => setUpdateInfo({...updateInfo, name: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Email</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập email"
                value={updateInfo.email}
                onChangeText={(text) => setUpdateInfo({...updateInfo, email: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Tên cửa hàng</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập tên cửa hàng"
                value={updateInfo.storeName}
                onChangeText={(text) => setUpdateInfo({...updateInfo, storeName: text})}
            />
            <TouchableOpacity style={{backgroundColor: Colors.light.buttonSuccess, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}}
                onPress={onClickUpdate}
            >
                <Text style={{fontSize: 16}}>Cập nhật</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 30}}
                onPress={() => navigation.navigate("ChangePassword")}
            >
                <Text style={{fontSize: 16}}>Đổi mật khẩu</Text>
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

