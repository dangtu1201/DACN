import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';
import { toast } from "../../services/toast";
import { useUpdateUserInfoMutation } from "../../redux/api/authApi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

interface UpdateInfo {
    name: string;
    email: string;
}

export default function EditProfileScreen({ navigation }: RootStackScreenProps<"EditProfile">) {

    const userInfo = useSelector((state: RootState) => state.user);
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({name: userInfo.name, email: userInfo.email});
    const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

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
            toast("error","Họ và tên không hợp lệ","");
            return false;
        }
        // email is not empty
        if (updateInfo.email.length === 0 || !validateEmail(updateInfo.email)) {
            toast("error","Email không hợp lệ","");
            return false;
        }
        
        return true;
    }

    // handle click register button
    const onClickUpdate = () => {
        if (validateUpdateInfo(updateInfo)) {
            let updateInput = {
                input: {
                    name: updateInfo.name,
                    email: updateInfo.email,
                }
            }
            updateUserInfo(JSON.stringify(updateInput)).unwrap().then((res) => {
                toast("success","Cập nhật thành công","");
                navigation.navigate("Root")
            }).catch((err) => {
                toast("error",err?.message,"");
                console.log(err);
            });
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

