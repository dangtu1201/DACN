import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';
import { toast } from "../../services/toast";
import { useUpdateUserInfoMutation, useGetUserPasswordQuery } from "../../redux/api/authApi";

export default function ChangePasswordScreen({ navigation }: RootStackScreenProps<"ChangePassword">) {

    const [oldPassword, setOldPassword] = useState("");
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);

    const [updatePassword, setUpdatePassword] = useState("");
    const [isShowUpdatePassword, setIsShowUpdatePassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
    const { currentData: userPassword, error, isLoading: isLoadingPassword, refetch } = useGetUserPasswordQuery('');

    // onChange old password
    const onChangeOldPassword = (text: string) => {
        // password is 6 digits number
        if (text.length <= 6) {
            setOldPassword(text);
        }
    }

    // onChange update password
    const onChangeUpdatePassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setUpdatePassword(text);
        }
    }

    // onChange confirm password
    const onChangeConfirmPassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setConfirmPassword(text);
        }
    }

    // validate update password
    const validateUpdatePassword = (oldPassword: string, updatePassword: string, confirmPassword: string) => {
        // old password is 6 digits
        if (oldPassword.length < 6) {
            toast("error","Mật khẩu cũ không hợp lệ","");
            return false;
        }
        // new password is 6 digits
        if (updatePassword.length < 6) {
            toast("error","Mật khẩu mới không hợp lệ","");
            return false;
        }
        // confirm password is same as new password
        if (confirmPassword !== updatePassword) {
            toast("error","Mật khẩu không khớp","");
            return false;
        }
        return true;
    }

    const onClickUpdate = () => {
        if (validateUpdatePassword(oldPassword, updatePassword, confirmPassword)) {
            if(userPassword?.getUser?.password !== oldPassword) {
                toast("error","Mật khẩu cũ không đúng","");
                return;
            }
            let updateInput = {
                input: {
                    password: updatePassword,
                }
            }
            updateUserInfo(JSON.stringify(updateInput)).unwrap().then((res) => {
                refetch();
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
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Đổi mật khẩu</Text>
            <View style={{marginTop: 30}}>
                <Text style={{fontSize: 16}}>Mật khẩu cũ</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                    <TextInput style={{ fontSize: 16}}
                        keyboardType="numeric"
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isShowOldPassword}
                        value={oldPassword}
                        onChangeText={onChangeOldPassword}
                    />
                    <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowOldPassword(!isShowOldPassword)}>
                        <FontAwesome name={isShowOldPassword ? "eye" : "eye-slash"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 30}}>
                <Text style={{fontSize: 16}}>Mật khẩu mới</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                    <TextInput style={{ fontSize: 16}}
                        keyboardType="numeric"
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isShowUpdatePassword}
                        value={updatePassword}
                        onChangeText={onChangeUpdatePassword}
                    />
                    <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowUpdatePassword(!isShowUpdatePassword)}>
                        <FontAwesome name={isShowUpdatePassword ? "eye" : "eye-slash"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 30}}>
                <Text style={{fontSize: 16}}>Nhập lại mật khẩu mới</Text>
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
            </View>
            <TouchableOpacity style={{backgroundColor: Colors.light.buttonSuccess, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}}
                onPress={onClickUpdate}
            >
                <Text style={{fontSize: 16}}>Cập nhật</Text>
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

