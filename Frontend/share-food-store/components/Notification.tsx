import React from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function Notification() {
    return (
        <TouchableOpacity style={{marginRight: 10, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="notifications" size={30} color={Colors.light.contentHeader}/>
        </TouchableOpacity>
    );
}