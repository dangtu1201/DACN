import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Modal } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { formatMoney } from "../services/formatMoney";
import { calculateDistance } from "../services/distance";
import { addQuantityOne, clearCart, minmusQuantityOne, removeProduct, updatePaymentMethod } from "../redux/cart";
import { useCreateOrderMutation } from "../redux/api/orderApi";
import { toast } from "../services/toast";
import { setOrderStatus } from "../redux/orderStatus";

export default function OrderCartScreen({ navigation }: RootStackScreenProps<"OrderCart">) {

    const [modalVisible, setModalVisible] = useState(false);
    const cart = useSelector((state: RootState) => state.cart);
    const userAddr = useSelector((state: RootState) => state.userAddr);
    const dispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login);
    const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
    const handleOrder = () => {
        let order = { input : {
            shop: cart.shopId,
            user : login.userId,
            total: cart.total,
            paymentMethod: cart.paymentMethod,
            products: cart.product.map((item) => {
                return {
                    product: item.product._id,
                    quantity: item.quantity
                }
            }),
            status: "Processing"
        }};
        console.log(order.input);
        dispatch(setOrderStatus({status: "orderSuccess"}))
        createOrder(JSON.stringify(order)).unwrap().then((res) => {
            dispatch(clearCart());
            setModalVisible(false);
            toast("success","Đặt hàng thành công","");
            navigation.navigate("Root");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
            {
                cart.product.length === 0 ?
                    <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome name="shopping-cart" size={50} color={Colors.light.textHighlight} />
                        <Text style={{ fontSize: 16, marginVertical: 16 }}>Chưa có sản phẩm trong giỏ hàng</Text>
                        <Pressable onPress={() => navigation.navigate("Root")} style={{ padding: 8, borderRadius: 5, width: "60%", alignItems: "center", borderWidth: 1, borderColor: Colors.light.tint }}>
                            <Text style={{ color: Colors.light.textHighlight, fontSize: 16 }}>Thêm sản phẩm</Text>
                        </Pressable>
                    </View>
                    :
                    <>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.storeBackground,
                                marginVertical: 20, paddingVertical: 10, marginBottom: 20
                            }}
                            >
                                <Image style={{ width: 40, height: 40, borderRadius: 100 }} source={require("../assets/images/icon.png")}></Image>
                                <View style={{ display: "flex", marginLeft: 10, backgroundColor: Colors.light.storeBackground, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>{cart.shopName}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4, backgroundColor: Colors.light.storeBackground }}>
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                        <Text style={{ marginLeft: 5 }}>4.5 (100)</Text>
                                        <Text style={{ marginLeft: 5 }}>|</Text>
                                        <Text style={{ marginLeft: 5 }}>{calculateDistance(cart.shopCoordinates.lat, cart.shopCoordinates.long,userAddr.lat, userAddr.lng)} Km</Text>
                                    </View>
                                    <Text style={{}}>Địa chỉ: {cart.shopAddress} </Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", paddingHorizontal: 20 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Hình thức thanh toán</Text>
                                <Pressable onPress={() => dispatch(updatePaymentMethod({paymentMethod: "CASH"}))}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        {cart.paymentMethod == "CASH" ? <Ionicons name="radio-button-on" size={24} /> : <Ionicons name="radio-button-off" size={24} />}
                                        <Text style={{ marginLeft: 10 }}>Thanh toán tại cửa hàng</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => dispatch(updatePaymentMethod({paymentMethod: "MOMO"}))}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                        {cart.paymentMethod == "MOMO" ? <Ionicons name="radio-button-on" size={24} /> : <Ionicons name="radio-button-off" size={24} />}
                                        <Text style={{ marginLeft: 10 }}>Thanh toán momo</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: Colors.light.blurBorder,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />
                            <View style={{ display: "flex", paddingHorizontal: 20, marginTop: 20 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Chi tiết đơn hàng</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Tiệm bánh hạnh phúc</Text>
                                    <Pressable onPress={() => navigation.navigate("Store", { storeId: "1" })}>
                                        <Text style={{
                                            color: Colors.light.textHighlight, paddingHorizontal: 10, borderColor: Colors.light.textHighlight, backgroundColor: Colors.light.storeBackground
                                            , borderRadius: 10, borderWidth: 1
                                        }}>Thêm sản phẩm</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.foodList}>
                                {cart.product.map((item, index) =>
                                (<TouchableOpacity key={index} style={{ display: "flex", alignItems: "center", marginTop: 1 }}
                                    onPress={() => navigation.navigate("FoodItem", { foodId: item.product._id })}
                                >
                                    <View style={styles.foodItem}>
                                        <View style={{ width: "35%", backgroundColor: Colors.light.backgroundIiem, borderRadius: 10 }}>
                                            <Image style={styles.foodImage} source={require("../assets/images/icon.png")} />
                                        </View>
                                        <View style={{ paddingVertical: 10, backgroundColor: Colors.light.backgroundIiem, width: "45%", justifyContent: "space-between" }}>
                                            <Text style={{ fontWeight: "bold", display: "flex" }}>{item.product.name}</Text>
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 28, height: 28, borderWidth: 1, borderColor: Colors.light.textHighlight }}
                                                    onPress={() => { dispatch(minmusQuantityOne({productId: item.product._id})) }}
                                                >
                                                    <Ionicons name="remove" size={24} color={Colors.light.textHighlight} />
                                                </TouchableOpacity>
                                                <Text style={{ textAlign: "center", textAlignVertical: "center", width: 28, height: 28, fontSize: 16, marginHorizontal: 10 }}>{item.quantity}</Text>
                                                <TouchableOpacity style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 28, height: 28, borderWidth: 1, borderColor: Colors.light.textHighlight }}
                                                    onPress={() => { dispatch(addQuantityOne({productId: item.product._id})) }}
                                                >
                                                    <Ionicons name="add" size={24} color={Colors.light.textHighlight} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", width: "20%", alignItems: "flex-end", justifyContent: "space-between", borderRadius: 10, backgroundColor: Colors.light.backgroundIiem }}>
                                            <Pressable style={{ padding: 10 }} onPress={() => { dispatch(removeProduct({productId: item.product._id})) }}>
                                                <Ionicons name="close" size={24} />
                                            </Pressable>
                                            <Text style={{ color: Colors.light.blurText, textDecorationLine: "line-through", marginRight: 10 }}>{formatMoney(item.product.price_old)}đ</Text>
                                            <Text style={{ color: Colors.light.textHighlight, fontWeight: "bold", marginRight: 10, marginBottom: 10 }}>{formatMoney(item.product.price)}đ</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                                )}
                            </View>
                        </ScrollView>
                        <View style={{ height: 100, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder }}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tổng tiền</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.light.textHighlight }}>{formatMoney(cart.total)}đ</Text>
                            </View>
                            <TouchableOpacity style={{
                                display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                                , width: "90%", borderRadius: 10
                            }}
                                onPress={() => setModalVisible(true)}>
                                <Text style={{ fontSize: 16 }}>Đặt hàng</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            {/* order completion confirmation */}
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                <View style={{ width: "90%", backgroundColor: Colors.light.background, borderRadius: 10, padding: 20 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Xác nhận đặt hàng</Text>
                                    <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 10 }}>Bạn có chắc chắn muốn đặt hàng?</Text>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity style={{
                                            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonCancel, height: 50
                                            , width: "45%", borderRadius: 10
                                        }}
                                            onPress={() => { setModalVisible(!modalVisible) }}
                                        >
                                            <Text style={{ fontSize: 16 }}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                                            , width: "45%", borderRadius: 10
                                        }}
                                            onPress={handleOrder}
                                        >
                                            <Text style={{ fontSize: 16 }}>Đặt hàng</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodList: {
        marginTop: 10,
        display: "flex",
        paddingHorizontal: 20,
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
        height: 110,
        borderRadius: 10,
    }

});

