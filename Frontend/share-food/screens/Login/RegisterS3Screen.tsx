import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRegisterMutation } from "../../redux/api/authApi";
import { toast } from "../../services/toast";

interface RegisterInfo {
    phoneNumber: string;
    name: string;
    email: string;
    password: string;
}

export default function RegisterS3Screen({ navigation, route }: LoginStackScreenProps<"RegisterS3">) {

    const { phoneNumber } = route.params;
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({ phoneNumber: phoneNumber, name: "", email: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [register, { isLoading, data, error }] = useRegisterMutation();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [3, 3],
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const onChangePassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setRegisterInfo({ ...registerInfo, password: text });
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
            toast("error","Họ và tên không hợp lệ","");
            return false;
        }
        // email is not empty
        if (registerInfo.email.length === 0 || !validateEmail(registerInfo.email)) {
            toast("error","Email không hợp lệ","");
            return false;
        }
        // password is 6 digits
        if (registerInfo.password.length < 6) {
            toast("error","Mật khẩu phải có 6 ký tự","");
            return false;
        }
        // password and confirm password are the same
        if (registerInfo.password !== confirmPassword) {
            toast("error","Mật khẩu không khớp","");
            return false;
        }
        return true;
    }

    // handle click register button
    const onClickRegister = () => {
        if (validateRegisterInfo(registerInfo)) {
            let registerInput = {
                input: {
                    phone: registerInfo.phoneNumber,
                    name: registerInfo.name,
                    email: registerInfo.email,
                    password: registerInfo.password,
                    image: selectedImage,
                    roles: "User"
                }
            }
            register(JSON.stringify(registerInput)).unwrap().then((res) => {
                toast("success","Đăng ký thành công","");
                navigation.navigate("Login");
            }).catch((err) => {
                toast("error",err?.message,"");
                console.log(err);
            });
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Pressable
                        style={{ width: 200, height: 200, borderWidth: 1, borderRadius: 10, marginBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}
                        onPress={() => pickImageAsync()}
                    >
                        {selectedImage ? (
                            <View>
                                <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                                <Pressable
                                    style={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", width: 30, height: 30, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center" }}
                                    onPress={() => setSelectedImage(null)}
                                >
                                    <Ionicons name="close" size={20} color="#fff" />
                                </Pressable>
                            </View>
                        ) : (
                            <Ionicons name="add-circle-outline" size={50} color={Colors.light.tabIconDefault} />
                        )}
                    </Pressable>
                </View>
                <Text style={{ fontSize: 16 }}>Họ và tên</Text>
                <TextInput style={{ width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10 }}
                    placeholder="Nhập họ và tên"
                    value={registerInfo.name}
                    onChangeText={(text) => setRegisterInfo({ ...registerInfo, name: text })}
                />
                <Text style={{ fontSize: 16, marginTop: 20 }}>Email</Text>
                <TextInput style={{ width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10 }}
                    placeholder="Nhập email"
                    value={registerInfo.email}
                    onChangeText={(text) => setRegisterInfo({ ...registerInfo, email: text })}
                />
                <Text style={{ fontSize: 16, marginTop: 20 }}>Mật khẩu</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%" }}>
                    <TextInput style={{ fontSize: 16 }}
                        keyboardType="numeric"
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isShowPassword}
                        value={registerInfo.password}
                        onChangeText={onChangePassword}
                    />
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsShowPassword(!isShowPassword)}>
                        <FontAwesome name={isShowPassword ? "eye" : "eye-slash"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, marginTop: 20 }}>Nhập lại mật khẩu</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%" }}>
                    <TextInput style={{ fontSize: 16 }}
                        keyboardType="numeric"
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!isShowConfirmPassword}
                        value={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                    />
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                        <FontAwesome name={isShowConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40 }}
                    onPress={onClickRegister}
                >
                    <Text style={{ fontSize: 16, color: "white" }}>Đăng ký</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
});

