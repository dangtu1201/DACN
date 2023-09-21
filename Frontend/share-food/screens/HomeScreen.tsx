import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { formatMoney } from "../services/formatMoney";
import { calculateDistance } from "../services/distance";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useFilterProductQuery } from "../redux/api/productApi";
import { useFilterShopQuery } from "../redux/api/shopApi";
import { IProduct } from "../type/product";
import { IShop } from "../type/shop";


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

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
    const { currentData: currentShop, error: errorShop, isLoading: isLoadingShop } = useFilterShopQuery(JSON.stringify({
        Coordinates: {
            lat: `${userAddr.lat}`,
            long: `${userAddr.lng}`
        },
        rating: 4
    }));

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Đề xuất cho bạn</Text>
                        <Pressable style={{backgroundColor: Colors.light.background}}
                            onPress={() => navigation.navigate("Dish", {name: "recommended"})}
                        >
                            <Text>Xem Thêm</Text>
                        </Pressable>
                    </View>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.foodList}
                        horizontal={true}
                    >
                            {recommendFood?.filterProduct?.map((item: IProduct, index: any) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("FoodItem", {foodId: item._id})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={{uri: item.image}}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>{item.name}</Text>
                                            <Text>Hôm nay: {item.activeTime.from} - {item.activeTime.to}</Text>
                                            <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                                <Text>{item.rating.toFixed(2)}  |  </Text>
                                                <Text>{calculateDistance(userAddr.lat, userAddr.lng, item.shop.coordinates.lat, item.shop.coordinates.long)} km</Text>
                                            </View>
                                            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, 
                                            backgroundColor: Colors.light.backgroundIiem, width: 150}}>
                                                <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>{formatMoney(item.price_old)}đ</Text>
                                                <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>{formatMoney(item.price)}đ</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                            )}
                    </ScrollView>
                </View>
                <View style={{marginTop: 30}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Món ăn được ưa chuộng</Text>
                        <Pressable style={{backgroundColor: Colors.light.background}}
                            onPress={() => navigation.navigate("Dish", {name: "popular"})}
                        >
                            <Text>Xem Thêm</Text>
                        </Pressable>
                    </View>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.foodList}
                        horizontal={true}
                    >
                            {popularFood?.filterProduct?.map((item: IProduct, index: any) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("FoodItem", {foodId: item._id})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={{uri: item.image}}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>{item.name}</Text>
                                            <Text>Hôm nay: {item.activeTime.from} - {item.activeTime.to}</Text>
                                            <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                                <Text>{item.rating.toFixed(2)}  |  </Text>
                                                <Text>{calculateDistance(userAddr.lat, userAddr.lng,item.shop.coordinates.lat,item.shop.coordinates.long)} km</Text>
                                            </View>
                                            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, 
                                            backgroundColor: Colors.light.backgroundIiem, width: 150}}>
                                                <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>{formatMoney(item.price_old)}đ</Text>
                                                <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>{formatMoney(item.price)}đ</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                            )}
                    </ScrollView>
                </View>
                <View style={{marginTop: 30}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Cửa hàng được ưa chuộng</Text>
                        <Pressable style={{backgroundColor: Colors.light.background}}
                            onPress={() => navigation.navigate("PopularStore")}
                        >
                            <Text>Xem Thêm</Text>
                        </Pressable>
                    </View>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.foodList}
                        horizontal={true}
                    >
                            {currentShop?.getNearbyShop?.map((item:IShop, index: any) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("Store", {storeId: item._id})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={{uri: item.shopOwner.image}}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10, justifyContent: "space-between"}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>{item.shopName}</Text>
                                            <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                                <Text>{item.rating.toFixed(2)}  |  </Text>
                                                <Text>{calculateDistance(userAddr.lat, userAddr.lng, item.coordinates.lat,item.coordinates.long)} km</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                            )}
                    </ScrollView>
                </View>
            </ScrollView>
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