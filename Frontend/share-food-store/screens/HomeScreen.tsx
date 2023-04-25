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
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    foodList: {
        marginTop: 10,
        display: "flex",
    },
    foodItem: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.light.backgroundIiem,
        borderRadius: 10,
        elevation: 2,
        margin: 1,
        marginRight: 10,
    },
    foodImage: {
        width: 110,
        height: "100%",
        minHeight: 110,
        borderRadius: 10,
    }
    
});