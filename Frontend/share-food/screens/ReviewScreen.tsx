import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Colors from "../constants/Colors";

export default function ReviewScreen({ navigation, route }: RootStackScreenProps<"Review">) {

    const { orderId } = route.params;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [star, setStar] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

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

    return (
        <View style={styles.container}>
            <Pressable 
                style={{width: 200, height: 200, borderWidth: 1, borderRadius: 10, marginTop: 30, marginBottom: 10,
                display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.backgroundIiem}}
                onPress={() => pickImageAsync()}
            >
                {selectedImage ? (
                    <View>
                        <Image source={{uri: selectedImage}} style={{width: 200, height: 200, borderRadius: 10}} />
                        <Pressable
                        style={{position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", width: 30, height: 30, borderRadius: 15, 
                        display: "flex", justifyContent: "center", alignItems: "center",}}
                        onPress={() => setSelectedImage(null)}
                        >
                            <Ionicons name="close" size={20} color="#fff" />
                        </Pressable>
                    </View>
                ) : (
                    <Ionicons name="add-circle-outline" size={50} color={Colors.light.tabIconDefault} />
                )}
            </Pressable>
            <View style={{display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between", width: "60%"}}>
                <Pressable onPress={() => setStar(1)}>
                    <FontAwesome name={star >= 1 ? "star" : "star-o"} size={24} color={Colors.light.textHighlight} />
                </Pressable>
                <Pressable onPress={() => setStar(2)}>
                    <FontAwesome name={star >= 2 ? "star" : "star-o"} size={24} color={Colors.light.textHighlight} />
                </Pressable>
                <Pressable onPress={() => setStar(3)}>
                    <FontAwesome name={star >= 3 ? "star" : "star-o"} size={24} color={Colors.light.textHighlight} />
                </Pressable>
                <Pressable onPress={() => setStar(4)}>
                    <FontAwesome name={star >= 4 ? "star" : "star-o"} size={24} color={Colors.light.textHighlight} />
                </Pressable>
                <Pressable onPress={() => setStar(5)}>
                    <FontAwesome name={star >= 5 ? "star" : "star-o"} size={24} color={Colors.light.textHighlight} />
                </Pressable>
            </View>
            <TextInput
                style={{height: 100, width: 300, borderWidth: 1, borderRadius: 10, marginTop: 20, 
                padding: 10, textAlignVertical: "top", fontSize: 16}}
                multiline={true}
                numberOfLines={5}
                placeholder="Đánh giá"
                onChangeText={text => setComment(text)}
                value={comment}
            />
            <View style={{borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder, position: "absolute", bottom: 0, width: "100%", alignItems: "center"}}>
                <Pressable
                    style={{width: 300, height: 50, borderRadius: 10, marginTop: 10, marginBottom: 10,
                    display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess}}
                    onPress={() => navigation.navigate("Root")}
                >
                    <Text style={{fontSize: 16}}>Gửi</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    
});

