import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { LoginStackScreenProps } from "../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { useRegisterMutation, useCreateShopMutation } from "../../redux/api/authApi";
import { toast } from "../../services/toast";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatMessage } from "../../services/format";

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

export default function RegisterS4Screen({ navigation, route }: LoginStackScreenProps<"RegisterS4">) {

    const { phoneNumber, id } = route.params;
    const userAddr = useSelector((state: RootState) => state.userAddr);
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({phoneNumber: phoneNumber, name: "", email: "", cardId: "", storeName: "", storeAddress: "", storeLocation: {
        latitude: userAddr.lat,
        longitude: userAddr.lng,
    }, password: ""});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowMap, setIsShowMap] = useState(false);
    
    const [createShop, { isLoading: isLoadingCreateShop, data: dataCreateShop, error: errorCreateShop }] = useCreateShopMutation();

    // validate email
    const validateEmail = (email: string) => {
        // validate email
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // validate register info
    const validateRegisterInfo = (registerInfo: RegisterInfo) => {
        // name is not empty
        if (registerInfo.name.length === 0) {
            toast("error","Họ và tên không hợp lệ","");
            return false;
        }
        // email is not empty
        if (registerInfo.email.length === 0 || !validateEmail(registerInfo.email)) {
            toast("error","Email không hợp lệ","");
            return false;
        }
        // cardId is not empty
        if (registerInfo.cardId.length === 0) {
            toast("error","Số CMND không hợp lệ","");
            return false;
        }
        // storeName is not empty
        if (registerInfo.storeName.length === 0) {
            toast("error","Tên cửa hàng không hợp lệ","");
            return false;
        }
        // storeAddress is not empty
        if (registerInfo.storeAddress.length === 0) {
            toast("error","Địa chỉ cửa hàng không hợp lệ","");
            return false;
        }
        // password is 6 digits
        if (registerInfo.password.length < 6) {
            toast("error","Mật khẩu phải có 6 ký tự","");
            return false;
        }
        // password and confirm password are the same
        if (registerInfo.password !== confirmPassword) {
            toast("error","Mật khẩu không khớp","");
            return false;
        }
        return true;
    }

    const onClickRegister = () => {
        if (validateRegisterInfo(registerInfo)) {
            let createShopInput = {
                input: {
                    shopName: registerInfo.storeName,
                    address: registerInfo.storeAddress,
                    coordinates: {
                        lat: `${registerInfo.storeLocation.latitude}`,
                        long: `${registerInfo.storeLocation.longitude}`,
                    },
                    shopOwner: id,
                    CID: registerInfo.cardId,
                    status: "Unapproved",
                }
            }
            createShop(JSON.stringify(createShopInput)).unwrap().then((res) => {
                toast("success","Đăng ký thành công","Vui lòng đợi admin phê duyệt cửa hàng của bạn");
                navigation.navigate("Login");
            }
            ).catch((err) => {
                toast("error", formatMessage(err.message),"");
                console.log(err);
            }
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
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
            <TouchableOpacity style={{backgroundColor: Colors.light.textHighlight, width: "100%", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 40}}
                onPress={onClickRegister}
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
                provider={PROVIDER_GOOGLE}
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

