import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function OrderHistoryScreen({ navigation }: RootStackScreenProps<"OrderHistory">) {
    return (
      <View style={styles.container}>
      <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.orderList}
      >
          {[1,2,3,4,5,6,7,8,9].map((item, index) =>(
              <TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                    onPress={() => navigation.navigate("OrderHistoryItem")}
              >
                  <View style={styles.orderItem}>
                      <Text style={{color: Colors.light.blurText}}>Đơn: 123456</Text>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 5, backgroundColor: Colors.light.backgroundIiem}}>
                          <Ionicons name="person-circle-outline" color={Colors.light.blurText} size={24}/>
                          <View style={{display: "flex", backgroundColor: Colors.light.backgroundIiem, width: "90%"}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{color: Colors.light.blurText}}>Nguyễn Văn A</Text>
                                    <Text style={{fontWeight: "bold", color: Colors.light.textHighlight}}>Hoàn thành</Text>
                                </View>
                                <Text style={{marginTop: 5}}>0903123923</Text>
                          </View>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 8, backgroundColor: Colors.light.backgroundIiem}}>
                          <Ionicons name="logo-usd" size={20} color={Colors.light.tint}/>
                          <Text style={{color: Colors.light.textHighlight, fontWeight: "bold", fontSize: 14}}> 60.000đ</Text>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", marginBottom: 5, justifyContent: "space-between", alignItems: "center", backgroundColor: Colors.light.backgroundIiem}}>
                          <Text>09/04/2023,20:30</Text>
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




