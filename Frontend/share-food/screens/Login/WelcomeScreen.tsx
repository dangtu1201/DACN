import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function welcomeScreen({ navigation }: LoginStackScreenProps<"Welcome">) {
    return (
        <View style={styles.container}>
            <View style={{marginTop: 160}}>
                <Image style={{width: 200, height: 200}} source={require("../../assets/images/icon.png")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

