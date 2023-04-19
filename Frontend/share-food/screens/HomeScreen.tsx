import React from 'react'
import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons';



export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity>
                    <View style={{ marginLeft:10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='location' color={Colors.light.contentHeader} size={24}/>
                        <Text style={{ fontSize: 14, color: Colors.light.contentHeader }}>Địa chỉ</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name='shopping-cart' color={Colors.light.contentHeader} size={28}/>
                    </View>
                </TouchableOpacity>
            ),
                
        });
    }, []);
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
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