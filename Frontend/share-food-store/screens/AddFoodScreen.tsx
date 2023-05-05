import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Switch } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";




export default function AddFoodScreen({ navigation }: RootStackScreenProps<"AddFood">) {
    

    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Hình ảnh sản phẩm</Text>
                    <View style={{width: "100%", height: 200, borderWidth: 1, borderRadius: 10, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Ionicons name="camera" size={24} color="black" />
                    </View>
                </View>
                <View style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontSize: 16}}>Trạng thái</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.light.buttonSuccess }}
                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsEnabled(!isEnabled)}
                        value={isEnabled}
                        style={{marginLeft: 20, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
                    />
                </View>
                <View>
                    <Text style={{fontSize: 16}}>Tên sản phẩm</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập tên sản phẩm"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Giá trước khuyến mãi</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập giá trước khuyến mãi"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Giá sau khuyến mãi</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập giá sau khuyến mãi"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Số lượng cần bán</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập số lượng cần bán"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Mô tả sản phẩm</Text>
                    <TextInput
                        style={{width: "100%", fontSize: 16, borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 10, textAlignVertical: "top"}}
                        placeholder="Nhập mô tả sản phẩm"
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </ScrollView>
            <View style={{height: 60, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                , width: "100%", borderRadius: 10}}
                onPress={() => {navigation.navigate("Root")}}
                >
                    <Text style={{fontSize: 16}}>Thêm sản phẩm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    
    
});