import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { formatMoney } from "../services/formatMoney";
import { formatDayTime } from "../services/format";

export default function OrderScreen({ navigation }: RootTabScreenProps<"Order">) {

    const ordersProcessing = useSelector((state: RootState) => state.ordersProcessing);

    return (
      <View style={styles.container}>
      <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.orderList}
      >
          {ordersProcessing.data.map((item, index) =>(
              <TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                  onPress={() => navigation.navigate("OrderItem", {orderId: item._id})}
              >
                  <View style={styles.orderItem}>
                      <Text style={{color: Colors.light.blurText}}>Đơn: {item._id}</Text>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 5, backgroundColor: Colors.light.backgroundIiem}}>
                          <Ionicons name="person-circle-outline" color={Colors.light.blurText} size={24}/>
                          <View style={{display: "flex", backgroundColor: Colors.light.backgroundIiem, width: "90%"}}>
                              <Text style={{color: Colors.light.blurText}}>{item.user.name}</Text>
                              <Text style={{marginTop: 5}}>{item.user.phone}</Text>
                          </View>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 8, backgroundColor: Colors.light.backgroundIiem}}>
                          <Ionicons name="logo-usd" size={20} color={Colors.light.tint}/>
                          <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", fontSize: 14}}> {formatMoney(item.total)}đ</Text>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: Colors.light.backgroundIiem}}>
                          <Text>{formatDayTime(item.createAt)}</Text>
                          <Pressable>
                              <View style={{paddingHorizontal: 15, paddingVertical: 5, borderWidth: 1, borderColor: Colors.light.tint, borderRadius: 5, backgroundColor: Colors.light.backgroundIiem}}>
                                  <Text style={{color: Colors.light.tint}}>Nhắn tin</Text>
                              </View>
                          </Pressable>
                      </View>
                  </View>
              </TouchableOpacity>
          ))}
      </ScrollView>
  </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
  },
  title: {
      fontSize: 20,
      fontWeight: "bold",
  },
  orderList: {
      display: "flex",
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




