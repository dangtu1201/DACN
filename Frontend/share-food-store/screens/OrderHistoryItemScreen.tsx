import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps  } from "../types";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useGetOrderByIDQuery } from "../redux/api/orderApi";
import { formatMoney } from "../services/formatMoney";
import { IProductItem } from "../type/order";


export default function OrderHistoryItemScreen({ navigation, route }: RootStackScreenProps<"OrderHistoryItem">) {

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const orderId = route.params.orderId;
    const { currentData, isLoading, refetch } = useGetOrderByIDQuery({"id": orderId});
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch();
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size="large" color={Colors.light.textHighlight} style={{marginTop: 30}}/> :
            <>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{display: "flex", justifyContent:"center",
                    marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
                >
                    <Text style={{marginLeft: 20}}>Tên khách hàng: {currentData?.getPaymentById?.user?.name}</Text>
                    <Text style={{marginLeft: 20, marginTop: 10}}>Số điện thoại: {currentData?.getPaymentById?.user?.phone}</Text>
                </View>
                <View
                style={{
                    borderBottomColor: Colors.light.blurBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
                <View style={{display: "flex", paddingHorizontal: 20, paddingTop: 10}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Hình thức thanh toán</Text>
                    <Pressable>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {currentData?.getPaymentById?.paymentMethod=="CASH"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
                            <Text style={{marginLeft: 10}}>Thanh toán tại cửa hàng</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {currentData?.getPaymentById?.paymentMethod=="MOMO"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
                            <Text style={{marginLeft: 10}}>Thanh toán momo</Text>
                        </View>
                    </Pressable>
                </View>
                <View
                style={{
                    borderBottomColor: Colors.light.blurBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
                <View style={{display: "flex", paddingHorizontal: 20, marginTop: 10, flexDirection: "row"}}>  
                    <Text style={{marginBottom: 10}}>Trạng thái:  </Text>
                    { currentData?.getPaymentById?.status == "Done" ?
                    <Text style={{fontWeight: "bold", color: Colors.light.textHighlight, marginBottom: 10}}>Hoàn thành</Text>
                    : <Text style={{fontWeight: "bold", color: Colors.light.textCancel, marginBottom: 10}}>Đã hủy</Text>
                    }
                </View>
                <View
                style={{
                    borderBottomColor: Colors.light.blurBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
                <View style={{display: "flex", paddingHorizontal: 20, marginTop: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Chi tiết đơn hàng</Text>
                    <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center", marginBottom: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>{currentData?.getPaymentById?.shop?.shopName}</Text> 
                    </View>
                </View>
                <View style={styles.foodList}>
                        {currentData?.getPaymentById?.products.map((item: IProductItem, index: number) => 
                            (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            >
                                <View style={styles.foodItem}>
                                    <View style={{width: "35%", backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                        <Image style={styles.foodImage} source={{ uri: item.product.image }}/>
                                    </View>
                                    <View style={{paddingVertical: 10, backgroundColor: Colors.light.backgroundIiem, width: "45%", justifyContent: "space-between"}}>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>{item.product.name}</Text>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>Số lượng: {item.quantity}</Text>
                                    </View>
                                    <View style={{display: "flex", width: "20%", alignItems: "flex-end", justifyContent: "space-between", borderRadius: 10, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Pressable style={{padding: 10, marginBottom: 20}}>
                                        </Pressable>
                                        <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through", marginRight: 10}}>{formatMoney(item.product.price_old)}đ</Text>
                                        <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", marginRight: 10, marginBottom: 10}}>{formatMoney(item.product.price)}đ</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                        )}
                    </View>
            </ScrollView>
            <View style={{height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Tổng tiền</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.light.textHighlight}}>{formatMoney(currentData?.getPaymentById?.total)}đ</Text>
                </View>
            </View>
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


