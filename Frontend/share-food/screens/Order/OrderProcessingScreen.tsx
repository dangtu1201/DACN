import React from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { OrderTabScreenProps } from "../../types";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function OrderProcessingScreen({ navigation }: OrderTabScreenProps<"OrderProcessing">) {
    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.orderList}
            >
                {[1,2,3,4,5,6,7,8,9].map((item, index) =>(
                    <TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                        onPress={() => navigation.navigate("OrderItemProcessing")}
                    >
                        <View style={styles.orderItem}>
                            <Text style={{color: Colors.light.blurText}}>Đơn: 123456</Text>
                            <View style={{display: "flex", flexDirection: "row", marginBottom: 5, backgroundColor: Colors.light.backgroundIiem}}>
                                <MaterialIcons name="home" color={Colors.light.blurText} size={24}/>
                                <View style={{display: "flex", backgroundColor: Colors.light.backgroundIiem, width: "90%"}}>
                                    <Text style={{color: Colors.light.blurText}}>Tiệm bánh hạnh phúc</Text>
                                    <Text>Địa chỉ: 123 xô viết nghệ tĩnh, phường 25, Bình Thạnh, thành phố Hồ Chí minh </Text>
                                </View>
                            </View>
                            <View style={{display: "flex", flexDirection: "row", marginBottom: 8, backgroundColor: Colors.light.backgroundIiem}}>
                                <Ionicons name="logo-usd" size={20} color={Colors.light.tint}/>
                                <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", fontSize: 14}}> 60.000đ</Text>
                            </View>
                            <View style={{display: "flex", flexDirection: "row", marginBottom: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: Colors.light.backgroundIiem}}>
                                <Text>09/04/2023,20:30</Text>
                                <Pressable>
                                    <View style={{paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderColor: Colors.light.tint, borderRadius: 5, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Text style={{color: Colors.light.tint}}>Nhắn tin</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderList: {
        display: "flex",
        marginTop: 20,
    },
    orderItem: {
        display: "flex",
        backgroundColor: Colors.light.backgroundIiem,
        width: "99%",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginBottom: 9,
    },
});

