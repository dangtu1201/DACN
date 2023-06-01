import React from "react";
import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { logoutApp } from "../redux/login";

export default function ProfileScreen({ navigation }: RootTabScreenProps<"Profile">) {

    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 20, paddingHorizontal: 10
            }}>
                <Image style={{width: 40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}/>
                <View style={{display: "flex", flexDirection: "column", marginLeft: 10, backgroundColor: Colors.light.backgroundIiem}}>
                    <Text style={{fontWeight: "bold", fontSize: 16}}>Nguyễn Văn A</Text>
                    <Text style={{color: "#8F8F8F"}}>0123456789</Text>
                </View>
            </View>
            <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
            }}
                onPress={() => navigation.navigate("EditProfile")}
            >
                <Text>Chỉnh sửa tài khoản</Text>
            </TouchableOpacity>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
            }}>
                <Text>Thông tin ứng dụng</Text>
            </View>
            <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
            }}
                onPress={() => {
                    dispatch(logoutApp());
                }}
            >
                <Text style={{color: "#C30000"}}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

