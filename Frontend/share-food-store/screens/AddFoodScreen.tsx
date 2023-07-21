import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Switch } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useAddProductMutation } from "../redux/api/productApi";
import { setStatus } from "../redux/status";

export type IProductCRUD = {
    name: string;
    price_old: string;
    price: string;
    description: string;
    quantity: string;
    status: string;
    activeTime: {
        from: string;
        to: string;
    };
}

export default function AddFoodScreen({ navigation }: RootStackScreenProps<"AddFood">) {
    
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [product, setProduct] = useState<IProductCRUD>({
        name: "",
        price_old: "",
        price: "",
        description: "",
        quantity: "",
        status: "Inactive",
        activeTime: {
            from: '00:00',
            to: '00:00',
        }
    });
    const [addProduct, { data, error, isLoading }] = useAddProductMutation();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          aspect: [3, 3],
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } 
    };

    const uriToBase64 = async (uri: string) => {
        let base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        return base64;
    };

    const handleAddProduct = async () => {
        let data = JSON.stringify({
            input: {
                name: product.name,
                price_old: product.price_old ? parseInt(product.price_old) : 0,
                price: product.price ? parseInt(product.price) : 0,
                description: product.description,
                quantity: product.quantity ? parseInt(product.quantity) : 0,
                status: product.status,
                activeTime: {
                    from: product.activeTime.from,
                    to: product.activeTime.to,
                },
            }
        });
        console.log(data);
        addProduct(data).unwrap().then((res) => {
            console.log(res);
            dispatch(setStatus({status: "addProductSuccess"}))
            navigation.navigate("Root");
        }).catch((err) => {
            console.log(err);
        }
        );

    }

    console.log(selectedImage)

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={{fontSize: 16}}>Hình ảnh sản phẩm</Text>
                    <Pressable 
                        style={{width: 200, height: 200, borderWidth: 1, borderRadius: 10, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center"}}
                        onPress={() => pickImageAsync()}
                    >
                        {selectedImage ? (
                            <View>
                                <Image source={{uri: selectedImage}} style={{width: 200, height: 200, borderRadius: 10}} />
                                <Pressable
                                style={{position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", width: 30, height: 30, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center"}}
                                onPress={() => setSelectedImage(null)}
                                >
                                    <Ionicons name="close" size={20} color="#fff" />
                                </Pressable>
                            </View>
                        ) : (
                            <Ionicons name="add-circle-outline" size={50} color={Colors.light.tabIconDefault} />
                        )}
                    </Pressable>
                </View>
                <View style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Text style={{fontSize: 16}}>Trạng thái</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.light.buttonSuccess }}
                        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            setIsEnabled(!isEnabled),
                            setProduct({...product, status: !isEnabled ? "Active" : "Inactive"})
                        }}
                        value={isEnabled}
                        style={{marginLeft: 20, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
                    />
                </View>
                <View>
                    <Text style={{fontSize: 16}}>Tên sản phẩm</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập tên sản phẩm"
                        value={product.name}
                        onChangeText={(text) => setProduct({...product, name: text})}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Giá trước khuyến mãi</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập giá trước khuyến mãi"
                        keyboardType="numeric"
                        value={product.price_old.toString()}
                        onChangeText={(text) => setProduct({...product, price_old: text})}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Giá sau khuyến mãi</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập giá sau khuyến mãi"
                        keyboardType="numeric"
                        value={product.price}
                        onChangeText={(text) => setProduct({...product, price: text})}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Số lượng cần bán</Text>
                    <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                        placeholder="Nhập số lượng cần bán"
                        keyboardType="numeric"
                        value={product.quantity.toString()}
                        onChangeText={(text) => setProduct({...product, quantity: text})}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Thời gian bán</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        <Pressable style={{width: "48%", height: 40, borderBottomWidth: 1, display: "flex", justifyContent: "center"}}
                            onPress={() => setShowFrom(true)}
                        >
                            <Text>{product.activeTime.from}</Text>
                        </Pressable>
                        <Pressable style={{width: "48%", height: 40, borderBottomWidth: 1, display: "flex", justifyContent: "center"}}
                            onPress={() => setShowTo(true)}
                        >
                            <Text>{product.activeTime.to}</Text>
                        </Pressable>
                    {showFrom && (
                    <RNDateTimePicker
                        value={from}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowFrom(false);
                            if (selectedTime) {
                                let fromHour = selectedTime.getHours() < 10 ? "0" + selectedTime.getHours() : selectedTime.getHours();
                                let fromMinute = selectedTime.getMinutes() < 10 ? "0" + selectedTime.getMinutes() : selectedTime.getMinutes();
                                setProduct({
                                    ...product,
                                    activeTime: {
                                        ...product.activeTime,
                                        from: fromHour + ":" + fromMinute
                                    }
                                })
                            }
                               
                        }}
                        locale="vi-VN"
                        is24Hour={true}
                    />
                )}
                {showTo && (
                    <RNDateTimePicker
                        value={to}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowTo(false);
                            if (selectedTime) {
                                let toHour = selectedTime.getHours() < 10 ? "0" + selectedTime.getHours() : selectedTime.getHours();
                                let toMinute = selectedTime.getMinutes() < 10 ? "0" + selectedTime.getMinutes() : selectedTime.getMinutes();
                                setProduct({
                                    ...product,
                                    activeTime: {
                                        ...product.activeTime,
                                        to: toHour + ":" + toMinute
                                    }
                                })
                            }
                        }}
                        locale="vi-VN"
                        is24Hour={true}
                    />
                )}
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16}}>Mô tả sản phẩm</Text>
                    <TextInput
                        style={{width: "100%", fontSize: 16, borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 10, textAlignVertical: "top"}}
                        placeholder="Nhập mô tả sản phẩm"
                        multiline={true}
                        numberOfLines={4}
                        value={product.description}
                        onChangeText={(text) => setProduct({...product, description: text})}
                    />
                </View>
            </ScrollView>
            <View style={{height: 60, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                , width: "100%", borderRadius: 10}}
                onPress={handleAddProduct}
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