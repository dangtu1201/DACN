import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useFilterProductQuery } from "../redux/api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IProduct } from "../type/product";
import { formatMoney } from "../services/formatMoney";
import { calculateDistance } from "../services/distance";

export default function DishScreen({ navigation, route }: RootStackScreenProps<"Dish">) {
    const { name } = route.params;
    const userAddr = useSelector((state: RootState) => state.userAddr);
    const { currentData: recommendFood, error, isLoading } = useFilterProductQuery(JSON.stringify({
        input: {
            status: "Active",
            userCoordinates: { lat: `${userAddr.lat}`, long: `${userAddr.lng}` }
        }
    }));
    const { currentData: popularFood, error: errorFood, isLoading: isLoadingFood } = useFilterProductQuery(JSON.stringify({
        input: {
            status: "Active",
            userCoordinates: { lat: `${userAddr.lat}`, long: `${userAddr.lng}` },
            rating: {
                from: 4,
                to: 5
            }
        },
    }));
    useEffect(() => {
        name == "recommended" ? navigation.setOptions({ title: "Đề xuất cho bạn" }) : navigation.setOptions({ title: "Món ăn được ưa chuộng" });
    }, []);




    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.foodList}
            >
                {isLoading || isLoadingFood && <ActivityIndicator size="large" color={Colors.light.textHighlight} style={{ marginTop: 30 }} />}
                {
                    name == "recommended" ?
                    recommendFood?.filterProduct?.map((item: IProduct, index: any) =>
                        (<TouchableOpacity key={index} style={{ display: "flex", alignItems: "center", marginTop: 1 }}
                            onPress={() => navigation.navigate("FoodItem", { foodId: item._id })}
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={{uri: item.image}} />
                                <View style={{ padding: 10, backgroundColor: Colors.light.backgroundIiem }}>
                                    <Text style={{ fontWeight: "bold", display: "flex", width: 200 }}>{item.name}</Text>
                                    <Text>Hôm nay: {item.activeTime.from} - {item.activeTime.to}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem }}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text>{item.rating.toFixed(2)}  |  </Text>
                                        <Text>{calculateDistance(userAddr.lat, userAddr.lng,item.shop.coordinates.lat,item.shop.coordinates.long)} km</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 4, backgroundColor: Colors.light.backgroundIiem }}>
                                        <Text style={{ color: Colors.light.blurText, textDecorationLine: "line-through" }}>{formatMoney(item.price_old)}đ</Text>
                                        <Text style={{ color: Colors.light.textHighlight, fontWeight: "bold" }}>{item.price}đ</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)
                        ) : 
                        popularFood?.filterProduct?.map((item: IProduct, index: any) =>
                        (<TouchableOpacity key={index} style={{ display: "flex", alignItems: "center", marginTop: 1 }}
                            onPress={() => navigation.navigate("FoodItem", { foodId: item._id })}
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={{uri: item.image}} />
                                <View style={{ padding: 10, backgroundColor: Colors.light.backgroundIiem }}>
                                    <Text style={{ fontWeight: "bold", display: "flex", width: 200 }}>{item.name}</Text>
                                    <Text>Hôm nay: {item.activeTime.from} - {item.activeTime.to}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem }}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text>{item.rating.toFixed(2)}  |  </Text>
                                        <Text>{calculateDistance(userAddr.lat, userAddr.lng,item.shop.coordinates.lat,item.shop.coordinates.long)} km</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 4, backgroundColor: Colors.light.backgroundIiem }}>
                                        <Text style={{ color: Colors.light.blurText, textDecorationLine: "line-through" }}>{formatMoney(item.price_old)}đ</Text>
                                        <Text style={{ color: Colors.light.textHighlight, fontWeight: "bold" }}>{item.price}đ</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)
                        )
                }
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
        borderRadius: 10,
    }

});

