import React from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { View } from "./Themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function ShoppingCart() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate("OrderCart")}}>
            <View style={{ marginRight: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name='shopping-cart' color={Colors.light.contentHeader} size={28}/>
            </View>
        </TouchableOpacity>
    );
}