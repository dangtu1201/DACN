import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function OrderScreen({ navigation }: RootTabScreenProps<"Order">) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });


