import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MapView, { Marker } from 'react-native-maps';

interface RegisterInfo {
    phoneNumber: string;
    name: string;
    email: string;
    cardId: string;
    storeName: string;
    storeAddress: string;
    storeLocation: {
        latitude: number;
        longitude: number;
    };
    password: string;
}

export default function RegisterS3Screen({ navigation, route }: LoginStackScreenProps<"RegisterS3">) {

    const { phoneNumber } = route.params;
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({phoneNumber: phoneNumber, name: "", email: "", cardId: "", storeName: "", storeAddress: "", storeLocation: {
        latitude: 10.772029,
        longitude: 106.657817,
    }, password: ""});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isShowMap, setIsShowMap] = useState(false);

    const onChangePassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setRegisterInfo({...registerInfo, password: text});
        }
    }

    const onChangeConfirmPassword = (text: string) => {
        // password is 6 digits
        if (text.length <= 6) {
            setConfirmPassword(text);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
            <Text style={{fontSize: 16}}>Họ và tên</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập họ và tên"
                value={registerInfo.name}
                onChangeText={(text) => setRegisterInfo({...registerInfo, name: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Email</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập email"
                value={registerInfo.email}
                onChangeText={(text) => setRegisterInfo({...registerInfo, email: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Số CMND</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập số CMND"
                value={registerInfo.cardId}
                onChangeText={(text) => setRegisterInfo({...registerInfo, cardId: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Tên cửa hàng</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập tên cửa hàng" 
                value={registerInfo.storeName}
                onChangeText={(text) => setRegisterInfo({...registerInfo, storeName: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Địa chỉ cửa hàng</Text>
            <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                placeholder="Nhập địa chỉ cửa hàng"
                value={registerInfo.storeAddress}
                onChangeText={(text) => setRegisterInfo({...registerInfo, storeAddress: text})}
            />
            <Text style={{fontSize: 16, marginTop: 20}}>Chọn vị trí cửa hàng trên bản đồ</Text>
            <Pressable style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}
                onPress={() => setIsShowMap(true)}
            >
                <Text style={{fontSize: 16}}>{registerInfo.storeLocation.latitude}, {registerInfo.storeLocation.longitude}</Text>
                <Ionicons name='location' color={Colors.light.contentHeader} size={24}/>
            </Pressable>
            <Text style={{fontSize: 16, marginTop: 20}}>Mật khẩu</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                <TextInput style={{ fontSize: 16}}
                    keyboardType="numeric"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!isShowPassword}
                    value={registerInfo.password}
                    onChangeText={onChangePassword}
                />
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowPassword(!isShowPassword)}>
                    <FontAwesome name={isShowPassword ? "eye" : "eye-slash"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 16, marginTop: 20}}>Nhập lại mật khẩu</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10, borderBottomWidth: 1, width: "100%"}}>
                <TextInput style={{ fontSize: 16}}
                    keyboardType="numeric"
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={!isShowConfirmPassword}
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                />
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                    <FontAwesome name={isShowConfirmPassword ? "eye" : "eye-slash"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}}
            >
                <Text style={{fontSize: 16, color: "white"}}>Đăng ký</Text>
            </TouchableOpacity>
            </ScrollView>
            {isShowMap && <MapView
                style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
                initialRegion={{
                    latitude: 10.772029,
                    longitude: 106.657817,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={(e) => {
                    setRegisterInfo({...registerInfo, storeLocation: {
                        latitude: Number(e.nativeEvent.coordinate.latitude.toFixed(6)),
                        longitude: Number(e.nativeEvent.coordinate.longitude.toFixed(6)),
                    }});
                }}
            >
                <Marker
                    coordinate={{
                        latitude: registerInfo.storeLocation.latitude,
                        longitude: registerInfo.storeLocation.longitude,
                    }}
                />
            </MapView>
            }
            {isShowMap && <Pressable 
                style={{position: "absolute", bottom: 20, right: 20, left: 20, backgroundColor: Colors.light.buttonSuccess,
                    height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center"}} 
                onPress={() => setIsShowMap(false)}
            >
                <Text style={{fontSize: 16}}>Xác nhận</Text>
            </Pressable>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
});

