import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function OrderScreen({ navigation }: RootTabScreenProps<"Order">) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Order Screen</Text>
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

