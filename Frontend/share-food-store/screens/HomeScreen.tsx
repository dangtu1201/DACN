import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";



export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 16}}>Chào mừng <Text style={{fontWeight: "bold"}}>Nguyễn Văn A</Text> đến với trang quản lý cửa hàng</Text>
            <View style={{marginTop: 20}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                    width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
                }}
                    onPress={() => navigation.navigate("OrderHistory")}
                >
                    <FontAwesome name="list-alt" size={24}/>
                    <Text style={{marginLeft: 10}}>Lịch sử đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                    width: "99%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
                }}>
                    <FontAwesome name="bar-chart" size={24}/>
                    <Text style={{marginLeft: 10}}>Báo cáo doanh thu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
});