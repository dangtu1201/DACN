import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";

export default function OrderItemHistoryScreen({ navigation }: RootStackScreenProps<"OrderItemHistory">) {

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [count, setCount] = useState(1);


    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor: Colors.light.storeBackground, 
                    marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
                >
                    <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../../assets/images/icon.png")}></Image>
                    <View style={{display: "flex", marginLeft: 10, backgroundColor: Colors.light.storeBackground, width: "80%"}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 4}}>Tiệm bánh hạnh phúc</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4, backgroundColor: Colors.light.storeBackground}}>
                            <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                            <Text style={{marginLeft: 5}}>4.5 (100)</Text>
                            <Text style={{marginLeft: 5}}>|</Text>
                            <Text style={{marginLeft: 5}}>0.5 Km</Text>
                        </View>
                        <Text>Mở cửa: 8:00 - 22:00</Text>
                        <Text style={{}}>Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM </Text>
                        <Text style={{}}>Số điện thoại: 0123456789</Text>
                    </View>
                </View>
                <View style={{display: "flex", paddingHorizontal: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Hình thức thanh toán</Text>
                    <Pressable>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {paymentMethod=="cash"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
                            <Text style={{marginLeft: 10}}>Thanh toán tại cửa hàng</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {paymentMethod=="momo"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
                            <Text style={{marginLeft: 10}}>Thanh toán momo</Text>
                        </View>
                    </Pressable>
                </View>
                <View
                style={{
                    borderBottomColor: Colors.light.blurBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
                <View style={{display: "flex", paddingHorizontal: 20, marginTop: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Chi tiết đơn hàng</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center", marginBottom: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>Tiệm bánh hạnh phúc</Text> 
                    </View>
                </View>
                <View style={styles.foodList}>
                        {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                            (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                onPress={() => navigation.navigate("FoodItem", {foodId: "1"})}
                            >
                                <View style={styles.foodItem}>
                                    <View style={{width: "35%", backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                        <Image style={styles.foodImage} source={require("../../assets/images/icon.png")}/>
                                    </View>
                                    <View style={{paddingVertical: 10, backgroundColor: Colors.light.backgroundIiem, width: "45%", justifyContent: "space-between"}}>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>Bánh mì thịt nướng</Text>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>Số lượng: 1</Text>
                                    </View>
                                    <View style={{display: "flex", width: "20%", alignItems: "flex-end", justifyContent: "space-between", borderRadius: 10, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Pressable style={{padding: 10, marginBottom: 20}}>
                                        </Pressable>
                                        <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through", marginRight: 10}}>50.000đ</Text>
                                        <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", marginRight: 10, marginBottom: 10}}>30.000đ</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                        )}
                    </View>
            </ScrollView>
            <View style={{height: 100, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Tổng tiền</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.light.textHighlight}}>300.000đ</Text>
                </View>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                , width: "90%", borderRadius: 10
                }}>
                    <Text style={{fontSize: 16}}>Đánh giá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodList: {
        marginTop: 10,
        display: "flex",
        paddingHorizontal: 20,
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
        height: 110,
        borderRadius: 10,
    }

});

