import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

export default function ReviewItemScreen({ navigation, route }: RootStackScreenProps<"ReviewItem">) {
    
    return (
        <View style={styles.container}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                    <Ionicons name="star" size={30} color={Colors.light.textHighlight} />
                    <Text style={{marginLeft: 5, fontSize: 30}}>4.5 (100)</Text>
                </View>
                <View style={{display: "flex", flexDirection: "column", marginBottom: 4}}>
                    {[5,4,3,2,1].map((value, index) => (
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}} key={index}>
                            {
                                [...Array(value)].map((e, i) => (
                                    <Ionicons name="star" size={20} color={Colors.light.textHighlight} key={i} style={{marginRight: 5}}/>
                                ))
                            }
                            {
                                [...Array(5 - value)].map((e, i) => (
                                    <Ionicons name="star-outline" size={20} color={Colors.light.textHighlight} key={i} style={{marginRight: 5}}/>
                                ))
                            }
                            <Text style={{marginLeft: 10, fontSize: 16}}>20</Text>
                        </View>
                    ))}
                </View>
                <View style={{display: "flex", alignItems: "center", marginBottom: 4}}>
                    {
                        [...Array(5)].map((e, i) => (
                            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", 
                            padding: 10, borderBottomColor: Colors.light.blurBorder, borderTopWidth: StyleSheet.hairlineWidth}}
                            key={i}
                            >
                                <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}/>
                                <View style={{display: "flex", marginLeft: 10, width: "90%"}}>
                                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text>Nguyễn Văn A</Text>
                                        <Text style={{marginLeft: 10, color: Colors.light.blurText}}>22/06/2023</Text>
                                    </View>
                                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                                        {
                                        [1,2,3,4,5].map((item, index) => {
                                            return (
                                                    <Ionicons name="star" size={20} color={Colors.light.textHighlight} key={index}/>
                                                    )
                                                }
                                            )
                                        }
                                    </View>
                                    <Text style={{marginBottom: 10}}>Bánh mì dài là món ăn ngon nhất thế giới</Text>
                                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                                        <Image style={{ width:80, height: 80, marginRight: 20}} source={require("../assets/images/icon.png")}/>
                                        <Image style={{ width:80, height: 80}} source={require("../assets/images/icon.png")}/>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
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
});