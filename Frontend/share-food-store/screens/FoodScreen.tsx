import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import Colors from "../constants/Colors";

interface IFillter {
    field: "updateTime" | "createTime" | "price",
    status: "asc" | "desc"
}

type IStock = "all" | "inStock" | "outStock"

export default function FoodScreen({ navigation }: RootTabScreenProps<"Food">) {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<IFillter>({field: "updateTime", status: "asc"});
    const [inStock, setInStock] = useState<IStock>("all");
    const [isOpenfillter, setIsOpenfillter] = useState(false);
    const [isOpenInStock, setIsOpenInStock] = useState(false);
    const [isModalOutPress, setIsModalOutPress] = useState(false);
    const fillterOptions = {
        "updateTime": "Ngày cập nhật",
        "createTime": "Ngày tạo",
        "price": "Giá"
    }

    const stockOptions = {
        "all": "Tất cả",
        "inStock": "Đang bán",
        "outStock": "Chưa bán"
    }

    return (
        <View style={styles.container}>
            <Pressable style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, display: isModalOutPress ? "flex" : "none"}}
                onPress={() => {setIsOpenfillter(false); setIsOpenInStock(false); setIsModalOutPress(false)}}
            ></Pressable>
            
            <TouchableOpacity style={{alignSelf: "flex-end", marginBottom: 10}}>
                <Text style={{fontSize: 16, color: Colors.light.textHighlight, fontWeight: "bold"}}>Thêm sản phẩm</Text>
            </TouchableOpacity>
            <View style={styles.search}>
                <Ionicons name="search" size={24} color="black" style={{alignItems:"center", marginRight: 5}}/>
                <TextInput style={styles.searchInput}/>
            </View>
            <View style={styles.filterFood}>
                <Pressable style={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "center", 
                            width: 160, backgroundColor: "#fff", elevation: 2, padding: 5}}
                            onPress={() => {setIsOpenfillter(!isOpenfillter); setIsModalOutPress(true)}}
                >
                    <Text style={{fontSize: 16, marginRight: 5}}>{fillterOptions[filter.field]}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                </Pressable>
                <Pressable style={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "center",
                            width: 160, backgroundColor: "#fff", elevation: 2, padding: 5}}
                            onPress={() => setIsOpenInStock(!isOpenInStock)}
                >
                    <Text style={{fontSize: 16, marginRight: 5}}>{stockOptions[inStock]}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                </Pressable>
                {/* <View style={{borderBottomWidth: 2}}>
                    <Picker
                        selectedValue={filter.field}
                        style={{ height: 50, width: 150}}
                        onValueChange={(itemValue, itemIndex) => setFilter({...filter, field: itemValue})}
                        mode="dropdown"
                    >
                        <Picker.Item label="Ngày cập nhật" value="updateTime" />
                        <Picker.Item label="Ngày tạo" value="createTtime" />
                        <Picker.Item label="Giá" value="price" />
                    </Picker>
                </View> */}
                {/* <View style={{borderBottomWidth: 2}}>
                    <Picker
                        selectedValue={inStock}
                        style={{ height: 50, width: 150}}
                        onValueChange={(itemValue, itemIndex) => setInStock(itemValue)}
                        mode="dropdown"
                        selectionColor={Colors.light.textHighlight}
                    >
                        <Picker.Item label="Tất cả" value="all" />
                        <Picker.Item label="Đang bán" value="inStock" />
                        <Picker.Item label="Chưa bán" value="outStock" />
                    </Picker>
                </View> */}
            </View>    
            {isOpenfillter && <View style={{position: "absolute", top: 138, left: 20, zIndex: 1, width: 160,
                 backgroundColor: "#fff", elevation: 2}}
                 >
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "updateTime"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Ngày cập nhật</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "createTime"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Ngày tạo</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "price"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Giá</Text>
                </Pressable>
            </View>}
            {isOpenInStock && <View style={{position: "absolute", top: 138 , zIndex: 1, width: 160,
                    right: 20,backgroundColor: "#fff", elevation: 2}}
                    >
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("all") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Tất cả</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("inStock") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Đang bán</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("outStock") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Chưa bán</Text>
                </Pressable>
            </View>}
           
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.foodList}
            >
                    {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            
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

