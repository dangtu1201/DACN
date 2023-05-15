import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function FoodScreen({ navigation, route }: RootStackScreenProps<"FoodItem">) {
    const {width} = Dimensions.get("window") ;
    const [count, setCount] = useState(1);
    return (
        <View style={styles.container}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{paddingHorizontal: 20}}>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <Image style={{width: width - 40, height: width - 40, borderRadius: 10}} source={require("../assets/images/icon.png")}/>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 20}}>
                        <View style={{display: "flex"}}>
                            <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 4}}>Bánh mì dài</Text>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                <Text style={{marginLeft: 5}}>4.5 (100)</Text>
                            </View>
                            <Text>Mở cửa: 8:00 - 22:00</Text>
                        </View>
                        <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through", marginBottom: 4}}>50.000đ</Text>
                            <Text style={{fontWeight: "bold", fontSize: 16, color: Colors.light.textHighlight ,marginBottom: 4}}>30.000đ</Text>
                            <Text>Còn lại: 10</Text>
                        </View>
                    </View>
                    <Text style={{color: Colors.light.blurText, marginBottom: 10}}>Đã bán: 200</Text>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30}}>
                        <TouchableOpacity style={{display:"flex", justifyContent: "center", alignItems: "center" ,width: 34, height: 34, borderWidth: 1, borderColor: Colors.light.textHighlight}}
                            onPress={() => { count <= 1 ? setCount(1) :setCount(count - 1)}}
                        >
                            <Ionicons name="remove" size={24} color={Colors.light.textHighlight} />
                        </TouchableOpacity>
                        <Text style={{textAlign: "center", textAlignVertical: "center",width: 34, height: 34, fontSize: 16}}>{count}</Text>
                        <TouchableOpacity style={{display:"flex", justifyContent: "center", alignItems: "center" ,width: 34, height: 34, borderWidth: 1, borderColor: Colors.light.textHighlight}}
                            onPress={() => {setCount(count + 1)}}
                        >
                            <Ionicons name="add" size={24} color={Colors.light.textHighlight} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Mô tả</Text>
                        <Text style={{color: Colors.light.blurText, marginBottom: 10}}>Bánh mì dài là món ăn ngon nhất thế giới</Text>
                    </View>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor: Colors.light.storeBackground, 
                marginVertical: 20, paddingVertical: 10}}
                >
                    <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}></Image>
                    <View style={{display: "flex", marginLeft: 10, backgroundColor: Colors.light.storeBackground, width: "55%"}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 4}}>Tiệm bánh hạnh phúc</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4, backgroundColor: Colors.light.storeBackground}}>
                            <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                            <Text style={{marginLeft: 5}}>4.5 (100)</Text>
                            <Text style={{marginLeft: 5}}>|</Text>
                            <Text style={{marginLeft: 5}}>0.5 Km</Text>
                        </View>
                        <Text>Mở cửa: 8:00 - 22:00</Text>
                        <Text style={{}}>Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</Text>
                    </View>
                    <Pressable onPress={()=>{navigation.navigate("Store", {storeId: "1"})}}>
                        <Text style={{fontWeight: "bold"}}>Xem sản phẩm</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={{height: 60, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                , width: "90%", borderRadius: 10}}
                >
                    <Text style={{fontSize: 16}}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});