import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { useReviewOrderMutation } from "../redux/api/orderApi";
import { useUploadImageMutation } from "../redux/api/imageApi";
import { toast } from "../services/toast";
import { setOrderStatus } from "../redux/orderStatus";

export default function ReviewScreen({ navigation, route }: RootStackScreenProps<"Review">) {

    const { orderId } = route.params;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [star, setStar] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const dispatch = useDispatch();
    const [reviewOrder, { isLoading: isLoadingReviewOrder }] = useReviewOrderMutation();
    const [uploadImage, { isLoading: isLoadingUploadImage }] = useUploadImageMutation();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [3, 3],
            base64: true,
        });

        if (!result.canceled) {
            setSelectedImage(`data:image/jpg;base64,${result.assets[0].base64}`);
        }
    };

    const handleReview = async () => {
        if (star == 0) {
            toast("error", "Bạn chưa chọn số sao", "");
            return;
        }
        if (selectedImage) {
            let imgQuery = JSON.stringify({
                photo: ((selectedImage))
            });
            uploadImage(imgQuery).unwrap().then((res) => {
                const image = res.singleUpload;
                setSelectedImage(image);
                let reviewInput = {
                    paymentId: orderId,
                    input: {
                        rating: star,
                        body: comment,
                        image: selectedImage
                    }
                }
                reviewOrder(JSON.stringify(reviewInput)).unwrap().then((res) => {
                    dispatch(setOrderStatus({ status: "reviewedSuccess" }))
                    toast("success", "Đánh giá thành công", "");
                    navigation.navigate("Root")
                }).catch((err) => {
                    toast("error", err.message, "");
                });
            }).catch((err) => {
                toast("error", err.message, "");
            }
            );
        } else {
            let reviewInput = {
                paymentId: orderId,
                input: {
                    rating: star,
                    body: comment,
                    image: ''
                }
            }
            reviewOrder(JSON.stringify(reviewInput)).unwrap().then((res) => {
                dispatch(setOrderStatus({ status: "reviewedSuccess" }))
                toast("success", "Đánh giá thành công", "");
                navigation.navigate("Root")
            }).catch((err) => {
                toast("error", err.message, "");
            }
            );
        }
    }


    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    width: 200, height: 200, borderWidth: 1, borderRadius: 10, marginTop: 30, marginBottom: 10,
                    display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.backgroundIiem
                }}
                onPress={() => pickImageAsync()}
            >
                {selectedImage ? (
                    <View>
                        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                        <Pressable
                            style={{
                                position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", width: 30, height: 30, borderRadius: 15,
                                display: "flex", justifyContent: "center", alignItems: "center",
                            }}
                            onPress={() => setSelectedImage(null)}
                        >
                            <Ionicons name="close" size={20} color="#fff" />
                        </Pressable>
                    </View>
                ) : (
                    <Ionicons name="add-circle-outline" size={50} color={Colors.light.tabIconDefault} />
                )}
            </Pressable>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between", width: "60%" }}>
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
                style={{
                    height: 100, width: 300, borderWidth: 1, borderRadius: 10, marginTop: 20,
                    padding: 10, textAlignVertical: "top", fontSize: 16
                }}
                multiline={true}
                numberOfLines={5}
                placeholder="Đánh giá"
                onChangeText={text => setComment(text)}
                value={comment}
            />
            <View style={{ borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder, position: "absolute", bottom: 0, width: "100%", alignItems: "center" }}>
                <Pressable
                    style={{
                        width: 300, height: 50, borderRadius: 10, marginTop: 10, marginBottom: 10,
                        display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess
                    }}
                    onPress={handleReview}
                >
                    <Text style={{ fontSize: 16 }}>Gửi</Text>
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

