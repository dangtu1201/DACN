import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrderTabParamList } from "../types";
import OrderProcessingScreen from "./Order/OrderProcessingScreen";
import OrderHistoryScreen from "./Order/OrderHistoryScreen";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function OrderScreen({ navigation }: RootTabScreenProps<"Order">) {
    const OrderTab = createBottomTabNavigator<OrderTabParamList>();
    return (
        <OrderTab.Navigator
            initialRouteName="OrderProcessing"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.light.background,
                    position: 'absolute',
                    top: 0
                },
            }}>
            <OrderTab.Screen
                name="OrderProcessing"
                component={OrderProcessingScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? <Text style={{ color: Colors.light.tint, fontSize: 16, fontWeight: "bold" }}>Đang sử lý</Text>
                            : <Text style={{ color: Colors.light.tint, fontSize: 16, fontWeight: "bold"  }}>Đang sử lý</Text>
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return focused ? <View style={{width: "80%",borderBottomWidth: 2, borderBottomColor: Colors.light.tint}}></View> : <View></View>
                    }
                }}
            />
            <OrderTab.Screen
                name="OrderHistory"
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? <Text style={{ color: Colors.light.tint, fontSize: 16, fontWeight: "bold"  }}>Lịch sử</Text>
                            : <Text style={{ color: Colors.light.tint, fontSize: 16, fontWeight: "bold"  }}>Lịch sử</Text>
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return focused ? <View style={{width: "80%",borderBottomWidth: 2, borderBottomColor: Colors.light.tint}}></View> : <View></View>
                    }
                }}
            />
        </OrderTab.Navigator>
    );
}



