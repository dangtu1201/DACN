import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, RefreshControl } from "react-native";
import { Text, View } from "../../components/Themed";
import { OrderTabScreenProps } from "../../types";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatMoney } from "../../services/formatMoney";
import { formatDayTime } from "../../services/format";
import { setOrderStatus } from "../../redux/orderStatus";

export default function OrderProcessingScreen({ navigation }: OrderTabScreenProps<"OrderProcessing">) {

    const ordersProcessing = useSelector((state: RootState) => state.ordersProcessing);
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(setOrderStatus({status: "processing"}));
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            {
                ordersProcessing.data.length == 0 ?
                    <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome name="list-alt" size={50} color={Colors.light.textHighlight} />
                        <Text style={{ fontSize: 16, marginVertical: 16 }}>Bạn chưa có đơn hàng nào</Text>
                        <Pressable onPress={() => navigation.navigate("Root")} style={{ padding: 8, borderRadius: 5, width: "60%", alignItems: "center", borderWidth: 1, borderColor: Colors.light.tint }}>
                            <Text style={{ color: Colors.light.textHighlight, fontSize: 16 }}>Thêm sản phẩm</Text>
                        </Pressable>
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.orderList}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {ordersProcessing.data.map((item, index) => (
                            <TouchableOpacity key={index} style={{ display: "flex", alignItems: "center", marginTop: 1 }}
                                onPress={() => navigation.navigate("OrderItemProcessing", { orderId: item._id })}
                            >
                                <View style={styles.orderItem}>
                                    <Text style={{ color: Colors.light.blurText }}>Đơn: {item._id}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", marginBottom: 5, backgroundColor: Colors.light.backgroundIiem }}>
                                        <MaterialIcons name="home" color={Colors.light.blurText} size={24} />
                                        <View style={{ display: "flex", backgroundColor: Colors.light.backgroundIiem, width: "90%" }}>
                                            <Text style={{ color: Colors.light.blurText }}>{item.shop.shopName}</Text>
                                            <Text>Địa chỉ: {item.shop.address} </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", marginBottom: 8, backgroundColor: Colors.light.backgroundIiem }}>
                                        <Ionicons name="logo-usd" size={20} color={Colors.light.tint} />
                                        <Text style={{ color: Colors.light.textHighlight, fontWeight: "bold", fontSize: 14 }}> {formatMoney(item.total)}đ</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", marginBottom: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: Colors.light.backgroundIiem }}>
                                        <Text>{formatDayTime(item.createAt)}</Text>
                                        <Pressable>
                                            <View style={{ paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderColor: Colors.light.tint, borderRadius: 5, backgroundColor: Colors.light.backgroundIiem }}>
                                                <Text style={{ color: Colors.light.tint }}>Nhắn tin</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderList: {
        display: "flex",
        marginTop: 20,
    },
    orderItem: {
        display: "flex",
        backgroundColor: Colors.light.backgroundIiem,
        width: "99%",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginBottom: 9,
    },
});

