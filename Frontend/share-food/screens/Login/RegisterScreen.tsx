import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function RegisterScreen({ navigation }: LoginStackScreenProps<"Register">) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

