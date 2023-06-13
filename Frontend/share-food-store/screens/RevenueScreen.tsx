import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function RevenueScreen({ navigation }: RootStackScreenProps<"Revenue">) {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    const fomatDate = (date: Date) => {
        // dd/mm/yyyy
        let day = date.getDate() || '';
        if (Number(day) < 10) {
            day = '0' + day;
        }
        let month = date.getMonth() + 1 || '';
        if (Number(month) < 10) {
            month = '0' + month;
        }
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // from date less than to date
    const checkDate = (from: Date, to: Date) => {
        if (from.getTime() > to.getTime()) {
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 30}}>
                <Text style={{fontSize: 16}}>Chọn khoảng thời gian</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10}}>
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                        width: "45%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
                    }}
                        onPress={() => setShowFrom(true)}
                    >
                        <Text>{fomatDate(fromDate)}</Text>
                    </TouchableOpacity>
                    <Text style={{textDecorationLine: "line-through", paddingBottom: 10}}>   </Text>
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                        width: "45%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
                    }}
                        onPress={() => setShowTo(true)}
                    >
                        <Text>{fomatDate(toDate)}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: Colors.light.backgroundIiem,
                        width: "40%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 10, paddingHorizontal: 16
                    }}
                        onPress={() => {}}
                    >
                        <Text>Xem báo cáo</Text>
                    </TouchableOpacity>
                {showFrom && (
                    <RNDateTimePicker
                        value={fromDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowFrom(false);
                            if (selectedDate) {
                                setFromDate(selectedDate);
                            }
                        }}
                        locale="vi-VN"
                        maximumDate={toDate}
                    />
                )}
                {showTo && (
                    <RNDateTimePicker
                        value={toDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowTo(false);
                            if (selectedDate) {
                                setToDate(selectedDate);
                            }
                        }}
                        locale="vi-VN"
                    />
                )}
            </View>
            <View style={{display: "flex", flexDirection: "column", backgroundColor: Colors.light.backgroundIiem, height: 200,
                        width: "100%", borderRadius: 10, elevation: 2, marginBottom: 10, paddingVertical: 30, paddingHorizontal: 16,
                        justifyContent: "space-around"
            }}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Số đơn đã bán: 20</Text>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Số sản phẩm đã bán: 200</Text>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>Tổng doanh thu: 2.000.000đ</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

