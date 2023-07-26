import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Pressable, ScrollView, Modal, ActivityIndicator, RefreshControl } from "react-native";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useGetOrderByIDQuery, useUpdateOrderMutation } from "../../redux/api/orderApi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatMoney } from "../../services/formatMoney";
import { formatDayTime } from "../../services/format";
import { calculateDistance } from "../../services/distance";
import { IProductItem } from "../../type/order";
import { toast } from "../../services/toast";
import { setOrderStatus } from "../../redux/orderStatus";

export default function OrderItemProcessingScreen({ navigation, route }: RootStackScreenProps<"OrderItemProcessing">) {

    const [modalVisible, setModalVisible] = useState(false);
    const orderId = route.params.orderId;
    const [updateOrder, { isLoading, isError, error }] = useUpdateOrderMutation();
    const { currentData, isLoading: orderLoading, refetch } = useGetOrderByIDQuery({"id": orderId});
    const userAddr = useSelector((state: RootState) => state.userAddr);
    const dispatch = useDispatch();
    
    const handleCancleOrder = () => {
        console.log(orderId);
        updateOrder({
            "input": {
              "status": "Cancel"
            },
            "id": orderId
          }).unwrap().then((res) => {
            toast("success","Hủy đơn hàng thành công","");
            dispatch(setOrderStatus({status: "CancelOrderSuccess"}))
            navigation.navigate("Root");
        }).catch((err) => {
            console.log(err);
        });
    }

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
            {orderLoading ? <ActivityIndicator size="large" color={Colors.light.textHighlight} style={{marginTop: 30}}/> :
            <>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor: Colors.light.storeBackground, 
                    marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
                >
                    <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../../assets/images/icon.png")}></Image>
                    <View style={{display: "flex", marginLeft: 10, backgroundColor: Colors.light.storeBackground, width: "80%"}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 4}}>{currentData?.getPaymentById?.shop?.shopName}</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4, backgroundColor: Colors.light.storeBackground}}>
                            <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                            <Text style={{marginLeft: 5}}>4.5 (100)</Text>
                            <Text style={{marginLeft: 5}}>|</Text>
                            <Text style={{marginLeft: 5}}>{calculateDistance(userAddr.lat,userAddr.lng,currentData?.getPaymentById?.shop?.coordinates?.lat, currentData?.getPaymentById?.shop?.coordinates?.long)} Km</Text>
                        </View>
                        <Text style={{}}>Địa chỉ: {currentData?.getPaymentById?.shop?.address} </Text>
                        <Text style={{}}>Số điện thoại: 0123456789</Text>
                    </View>
                </View>
                <View style={{display: "flex", paddingHorizontal: 20}}>
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
                <View style={{display: "flex", paddingHorizontal: 20, marginTop: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Chi tiết đơn hàng</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center", marginBottom: 10}}>
                            <Text style={{fontWeight: "bold", fontSize: 16}}>{currentData?.getPaymentById?.shop?.shopName}</Text> 
                        </View>
                        <Pressable onPress={() => navigation.navigate("Store", { storeId: currentData?.getPaymentById?.shop?._id })}>
                            <Text style={{
                                color: Colors.light.textHighlight, paddingHorizontal: 10, borderColor: Colors.light.textHighlight, backgroundColor: Colors.light.storeBackground
                                , borderRadius: 10, borderWidth: 1
                            }}>Xem cửa hàng</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.foodList}>
                    {currentData?.getPaymentById?.products.map((item : IProductItem, index: number) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            onPress={() => navigation.navigate("FoodItem", {foodId: item.product._id})}
                        >
                            <View style={styles.foodItem}>
                                <View style={{width: "35%", backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                    <Image style={styles.foodImage} source={{uri: item.product.image}}/>
                                </View>
                                <View style={{paddingVertical: 10, backgroundColor: Colors.light.backgroundIiem, width: "45%", justifyContent: "space-between"}}>
                                    <Text style={{fontWeight: "bold", display: "flex"}}>{item.product.name}</Text>
                                    <Text style={{display: "flex"}}>{item?.product.activeTime.from} - {item?.product.activeTime.to}</Text>
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
            <View style={{height: 100, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Tổng tiền</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.light.textHighlight}}>{formatMoney(currentData?.getPaymentById?.total)}đ</Text>
                </View>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonCancel, height: 50
                , width: "90%", borderRadius: 10}}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{fontSize: 16}}>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
            </>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 200}}
                        onPress={() => null}
                        activeOpacity={1}
                    >
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: 200, borderRadius: 10}}>
                        
                        <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 20, paddingHorizontal: 20}}>Bạn có chắc chắn muốn hủy đơn hàng này?</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonCancel, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={{fontSize: 16}}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess, width: "45%", height: 50, borderRadius: 10}}
                                onPress={handleCancleOrder}
                            >
                                <Text style={{fontSize: 16}}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableOpacity>
                </Pressable>
            </Modal>
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

