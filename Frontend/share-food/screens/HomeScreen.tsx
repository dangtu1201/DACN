import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';


export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

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
                            {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("FoodItem", {foodId: "1"})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>Bánh mì thịt nướng</Text>
                                            <Text>Hôm nay: 8:00 - 20:00</Text>
                                            <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                                <Text>4.5  |  </Text>
                                                <Text>1.5 km</Text>
                                            </View>
                                            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, 
                                            backgroundColor: Colors.light.backgroundIiem, width: 150}}>
                                                <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>50.000đ</Text>
                                                <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>30.000đ</Text>
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
                            {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("FoodItem", {foodId: "1"})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>Bánh mì thịt nướng</Text>
                                            <Text>Hôm nay: 8:00 - 20:00</Text>
                                            <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                                <Text>4.5  |  </Text>
                                                <Text>1.5 km</Text>
                                            </View>
                                            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, 
                                            backgroundColor: Colors.light.backgroundIiem, width: 150}}>
                                                <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>50.000đ</Text>
                                                <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>30.000đ</Text>
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
                            {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                                (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                                    onPress={() => navigation.navigate("Store", {storeId: "1"})}
                                >
                                    <View style={styles.foodItem}>
                                        <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                        <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, borderRadius: 10, justifyContent: "space-between"}}>
                                            <Text style={{fontWeight: "bold", display: "flex", width: 150}}>Tiệm bánh hạnh phúc</Text>
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