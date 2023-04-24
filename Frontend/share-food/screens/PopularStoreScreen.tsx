import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function PopularStoreScreen({ navigation }: RootStackScreenProps<"PopularStore">) {

    return (
        <View style={styles.container}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.foodList}
            >
                    {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            onPress={() => navigation.navigate("Store")}
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, justifyContent: "space-between"}}>
                                    <Text style={{fontWeight: "bold", display: "flex", width: 200}}>Tiệm bánh hạnh phúc</Text>
                                    <Text>Mở cửa: 8:00 - 20:00</Text>
                                    <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text>4.5  |  </Text>
                                        <Text>1.5 km</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)
                    )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    foodList: {
        marginTop: 10,
        display: "flex",
    },
    foodItem: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.light.backgroundIiem,
        width: "99%",
        borderRadius: 10,
        elevation: 2,
        marginBottom: 9,
    },
    foodImage: {
        width: 110,
        height: "100%",
        minHeight: 110,
        borderRadius: 10,
    }

});

