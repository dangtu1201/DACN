import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useFilterShopQuery } from "../redux/api/shopApi";
import { calculateDistance } from "../services/distance";
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { IShop } from "../type/shop";

export default function PopularStoreScreen({ navigation }: RootStackScreenProps<"PopularStore">) {

    const userAddr = useSelector((state: RootState) => state.userAddr);
    const { currentData, error, isLoading, refetch } = useFilterShopQuery(JSON.stringify({
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
                style={styles.foodList}
            >
                {isLoading && <ActivityIndicator size="large" color={Colors.light.textHighlight} style={{ marginTop: 30 }} />}
                    {currentData?.getNearbyShop?.map((item: IShop, index: any) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            onPress={() => navigation.navigate("Store", {storeId: item._id})}
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={{uri: item.shopOwner.image}}/>
                                <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem, justifyContent: "space-between"}}>
                                    <Text style={{fontWeight: "bold", display: "flex", width: 200}}>{item.shopName}</Text>
                                    <View style={{display:"flex", flexDirection: "row", backgroundColor: Colors.light.backgroundIiem}}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text>{item.rating.toFixed(2)}  |  </Text>
                                        <Text>{calculateDistance(userAddr.lat, userAddr.lng, item.coordinates.lat, item.coordinates.long)} km</Text>
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

