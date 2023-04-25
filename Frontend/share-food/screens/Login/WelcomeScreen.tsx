import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function WelcomeScreen({ navigation }: LoginStackScreenProps<"Welcome">) {
    const {width} = Dimensions.get("window") ;

    return (
        <View style={styles.container}>
            <Image style={{width: 200, height: 200, marginTop: 100}} source={require("../../assets/images/icon.png")}/>
            <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 20}}>Tên ứng dụng</Text>
            <Text style={{fontSize: 16, marginTop: 10}}>Mô tả ứng dụng</Text>
            <View style={{position: "absolute", bottom: 40}}>
                <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: width-80, height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Register")}>
                    <Text style={{fontSize: 16, color: "white"}}>Đăng ký miễn phí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: Colors.light.backgroundIiem, width: width-80, height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10, borderWidth: 1}} onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontSize: 16}}>Đăng nhập</Text>
                </TouchableOpacity>
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

