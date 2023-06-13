import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Modal } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps  } from "../types";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function OrderItemScreen({ navigation }: RootStackScreenProps<"OrderItem">) {

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{display: "flex", justifyContent:"center",
                    marginVertical: 20, paddingVertical: 10, marginBottom: 20}}
                >
                    <Text style={{marginLeft: 20}}>Tên khách hàng: Nguyễn Văn A</Text>
                    <Text style={{marginLeft: 20, marginTop: 10}}>Số điện thoại: 0903123923</Text>
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
                            {paymentMethod=="cash"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
                            <Text style={{marginLeft: 10}}>Thanh toán tại cửa hàng</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                            {paymentMethod=="momo"?<Ionicons name="radio-button-on" size={24}/>:<Ionicons name="radio-button-off" size={24}/>}
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
                    <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center", marginBottom: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 16}}>Tiệm bánh hạnh phúc</Text> 
                    </View>
                </View>
                <View style={styles.foodList}>
                        {[1,2,3,4,5,6,7,8,9].map((item, index) => 
                            (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            >
                                <View style={styles.foodItem}>
                                    <View style={{width: "35%", backgroundColor: Colors.light.backgroundIiem, borderRadius: 10}}>
                                        <Image style={styles.foodImage} source={require("../assets/images/icon.png")}/>
                                    </View>
                                    <View style={{paddingVertical: 10, backgroundColor: Colors.light.backgroundIiem, width: "45%", justifyContent: "space-between"}}>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>Bánh mì thịt nướng</Text>
                                        <Text style={{fontWeight: "bold", display: "flex"}}>Số lượng: 1</Text>
                                    </View>
                                    <View style={{display: "flex", width: "20%", alignItems: "flex-end", justifyContent: "space-between", borderRadius: 10, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Pressable style={{padding: 10, marginBottom: 20}}>
                                        </Pressable>
                                        <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through", marginRight: 10}}>50.000đ</Text>
                                        <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", marginRight: 10, marginBottom: 10}}>30.000đ</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                        )}
                    </View>
            </ScrollView>
            <View style={{height: 100, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>Tổng tiền</Text>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.light.textHighlight}}>300.000đ</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%"}}>
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonCancel, height: 50
                    , width: "45%", borderRadius: 10
                    }}
                        onPress={() => setCancelModalVisible(true)}
                    >
                        <Text style={{fontSize: 16}}>Hủy đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                    , width: "45%", borderRadius: 10
                    }}
                        onPress={() => setSuccessModalVisible(true)}
                    >
                        <Text style={{fontSize: 16}}>Hoàn thành</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={cancelModalVisible}
                onRequestClose={() => {
                    setCancelModalVisible(!cancelModalVisible);
                }}
            >
                <Pressable style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}
                    onPress={() => setCancelModalVisible(!cancelModalVisible)}
                >
                    <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 200}}
                        onPress={() => null}
                        activeOpacity={1}
                    >
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: 200, borderRadius: 10}}>
                        
                        <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 20, paddingHorizontal: 20}}>Bạn có chắc chắn muốn hủy đơn hàng này?</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonCancel, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => setCancelModalVisible(!cancelModalVisible)}
                            >
                                <Text style={{fontSize: 16}}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => {
                                    setCancelModalVisible(!cancelModalVisible);
                                    navigation.navigate("Root");
                                }}
                            >
                                <Text style={{fontSize: 16}}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableOpacity>
                </Pressable>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => {
                    setSuccessModalVisible(!successModalVisible);
                }}
            >
                <Pressable style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}
                    onPress={() => setSuccessModalVisible(!successModalVisible)}
                >
                    <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 200}}
                        onPress={() => null}
                        activeOpacity={1}
                    >
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: 200, borderRadius: 10}}>
                        
                        <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 20, paddingHorizontal: 20}}>Bạn có chắc chắn muốn hoàn thành đơn hàng này?</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonCancel, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => setSuccessModalVisible(!successModalVisible)}
                            >
                                <Text style={{fontSize: 16}}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => {
                                    setSuccessModalVisible(!successModalVisible);
                                    navigation.navigate("Root");
                                }}
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


