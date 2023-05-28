import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Switch, Modal } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function UpdateAndDeleteFood({visible, setVisible}:{visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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


    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
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
                        <Text style={{fontSize: 16}}>Thời gian bán</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                            <TextInput style={{width: "45%", fontSize: 16, borderBottomWidth: 1}}
                                placeholder="Từ"
                                keyboardType="numeric"
                            />
                            <TextInput style={{width: "45%", fontSize: 16, borderBottomWidth: 1}}
                                placeholder="Đến"
                                keyboardType="numeric"
                            />
                        </View>
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
                    <View style={{height: 60, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                        , width: "100%", borderRadius: 10}}
                        onPress={() => {setVisible(false)}}
                        >
                            <Text style={{fontSize: 16}}>Thêm sản phẩm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
});