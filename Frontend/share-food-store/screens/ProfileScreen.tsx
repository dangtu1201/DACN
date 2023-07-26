import React from "react";
import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { logoutApp } from "../redux/login";
import { RootState } from "../redux/store";

export default function ProfileScreen({ navigation }: RootTabScreenProps<"Profile">) {

    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    return (
        <View style={styles.container}>
            <View style={[styles.item,{paddingVertical: 20, paddingHorizontal: 10}]}>
                <Image style={{width: 40, height: 40, borderRadius: 100}} source={{ uri: userInfo.image }}/>
                <View style={{display: "flex", flexDirection: "column", marginLeft: 10, backgroundColor: Colors.light.backgroundIiem}}>
                    <Text style={{fontWeight: "bold", fontSize: 16}}>{userInfo.name}</Text>
                    <Text style={{color: "#8F8F8F"}}>{userInfo.phone}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.item}
                onPress={() => navigation.navigate("EditProfile")}
            >
                <Text>Chỉnh sửa tài khoản</Text>
            </TouchableOpacity>
            <View style={styles.item}>
                <Text>Thông tin ứng dụng</Text>
            </View>
            <TouchableOpacity style={styles.item}
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
    item: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: Colors.light.backgroundIiem,
        width: "99%", 
        borderRadius: 10, 
        elevation: 2, 
        marginBottom: 10, 
        paddingVertical: 10, 
        paddingHorizontal: 16
    }
});

