import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function FoodScreen({ navigation }: RootTabScreenProps<"Food">) {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("near");


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Ionicons name="search" size={24} color="black" style={{alignItems:"center", marginRight: 5}}/>
                <TextInput style={styles.searchInput}/>
            </View>
            <View style={styles.filterFood}>
                <Pressable onPress={() => setFilter("near")}>
                    <View style={filter == "near" ? styles.filterFoodItemSelected : styles.filterFoodItemNotSelected}>
                        <Text style={filter == "near" ? styles.filterFoodItemTextSelected : styles.filterFoodItemTextNotSelected}>Gần bạn</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setFilter("popular")}>
                    <View style={filter == "popular" ? styles.filterFoodItemSelected : styles.filterFoodItemNotSelected}>
                        <Text style={filter == "popular" ? styles.filterFoodItemTextSelected : styles.filterFoodItemTextNotSelected}>Phổ biến</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setFilter("price")}>
                    <View style={filter == "price" ? styles.filterFoodItemSelected : styles.filterFoodItemNotSelected}>
                        <Text style={filter == "price" ? styles.filterFoodItemTextSelected : styles.filterFoodItemTextNotSelected}>Giá thấp</Text>
                    </View>
                </Pressable>
            </View>    
           
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.foodList}
            >
                    {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            onPress={() => navigation.navigate("FoodItem", {foodId: "1"})}
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem}}>
                                    <Text style={{fontWeight: "bold", display: "flex", width: 200}}>Bánh mì thịt nướng</Text>
                                    <Text>Mở cửa: 8:00 - 20:00</Text>
                                    <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text>4.5  |  </Text>
                                        <Text>1.5 km</Text>
                                    </View>
                                    <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 4, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>50.000đ</Text>
                                        <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>30.000đ</Text>
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
    search: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.light.background,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
    },
    searchInput: {
        width: "90%",
    },
    filterFood: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    filterFoodItemSelected: {
        backgroundColor: "#E7F9F9",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.light.tint,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    filterFoodItemTextSelected: {
        color: Colors.light.tint,
    },
    filterFoodItemNotSelected: {
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: Colors.light.blurBorder,
    },
    filterFoodItemTextNotSelected: {
        color: Colors.light.blurText,
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

