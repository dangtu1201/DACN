import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootStackScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import { IProduct } from "../type/product";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { formatMoney } from "../services/formatMoney";
import { calculateDistance } from "../services/distance";
import { addProductToCart } from "../redux/cart";
import { toast } from "../services/toast";

export default function FoodScreen({ navigation, route }: RootStackScreenProps<"FoodItem">) {
    const {width} = Dimensions.get("window") ;
    const [count, setCount] = useState(1);
    const productId = route.params.foodId;
    const { currentData, error, isLoading, refetch } = useGetProductByIdQuery(JSON.stringify({productId: productId}));
    const userAddr = useSelector((state: RootState) => state.userAddr);
    const dispatch = useDispatch();

    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        if (currentData) {
            setProduct(currentData.getProductsById);
        }
    }, [currentData]);

    const handleAddToCart = () => {
        toast("success", "Thêm vào giỏ hàng thành công", "");
        dispatch(addProductToCart({product: product, quantity: count}));
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
            {isLoading ? <ActivityIndicator size="large" color={Colors.light.textHighlight} style={{marginTop: 30}} /> :
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingHorizontal: 20}}>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <Image style={{width: width - 40, height: width - 40, borderRadius: 10}} source={{ uri: product?.image }}/>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 20}}>
                        <View style={{display: "flex"}}>
                            <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 4}}>{product?.name}</Text>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                                <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                                { product?.rating != 0 ? <Text style={{marginLeft: 5}}>{product?.rating.toFixed(2)} ({product?.rating_list.length})</Text> : <Text style={{marginLeft: 5}}>Chưa có đánh giá</Text>}
                            </View>
                            <Text>Hôm nay: {product?.activeTime.from} - {product?.activeTime.to}</Text>
                        </View>
                        <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through", marginBottom: 4}}>{formatMoney(product?.price_old)}đ</Text>
                            <Text style={{fontWeight: "bold", fontSize: 16, color: Colors.light.textHighlight ,marginBottom: 4}}>{formatMoney(product?.price)}đ</Text>
                            <Text>Còn lại: {product?.quantity}</Text>
                        </View>
                    </View>
                    <Text style={{color: Colors.light.blurText, marginBottom: 10}}>Đã bán: 200</Text>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30}}>
                        <TouchableOpacity style={{display:"flex", justifyContent: "center", alignItems: "center" ,width: 34, height: 34, borderWidth: 1, borderColor: Colors.light.textHighlight}}
                            onPress={() => { count <= 1 ? setCount(1) :setCount(count - 1)}}
                        >
                            <Ionicons name="remove" size={24} color={Colors.light.textHighlight} />
                        </TouchableOpacity>
                        <Text style={{textAlign: "center", textAlignVertical: "center",width: 34, height: 34, fontSize: 16}}>{count}</Text>
                        <TouchableOpacity style={{display:"flex", justifyContent: "center", alignItems: "center" ,width: 34, height: 34, borderWidth: 1, borderColor: Colors.light.textHighlight}}
                            onPress={() => {setCount(count + 1)}}
                        >
                            <Ionicons name="add" size={24} color={Colors.light.textHighlight} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Mô tả</Text>
                        <Text style={{color: Colors.light.blurText, marginBottom: 10}}>{product?.description}</Text>
                    </View>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center", backgroundColor: Colors.light.storeBackground, 
                marginVertical: 20, paddingVertical: 10}}
                >
                    <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}></Image>
                    <View style={{display: "flex", marginLeft: 10, backgroundColor: Colors.light.storeBackground, width: "55%"}}>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 4}}>{product?.shop?.shopName}</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4, backgroundColor: Colors.light.storeBackground}}>
                            { product?.shop?.rating != 0 &&
                            <>
                            <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                            <Text style={{marginLeft: 5}}>{product?.shop?.rating.toFixed(2)}</Text>
                            <Text style={{marginHorizontal: 5}}>|</Text>
                            </>
                            }
                            <Text>{calculateDistance(userAddr.lat, userAddr.lng, product?.shop?.coordinates?.lat, product?.shop?.coordinates?.long)} Km</Text>
                        </View>
                        <Text style={{}}>Địa chỉ: {product?.shop?.address}</Text>
                    </View>
                    <Pressable onPress={()=>{navigation.navigate("Store", {storeId: product?.shop?._id})}}>
                        <Text style={{fontWeight: "bold"}}>Xem sản phẩm</Text>
                    </Pressable>
                </View>
                <View
                    style={{
                        borderBottomColor: Colors.light.blurBorder,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, paddingVertical: 10}}
                >
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 10}}>Đánh giá sản phẩm</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                            <Ionicons name="star" size={20} color={Colors.light.textHighlight} />
                            { product?.rating != 0 ? <Text style={{marginLeft: 5}}>{product?.rating.toFixed(2)} ({product?.rating_list?.length})</Text> : <Text style={{marginLeft: 5}}>Chưa có đánh giá</Text>}
                        </View>
                    </View>
                    <Pressable style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}
                        onPress={()=>{navigation.navigate("ReviewItem", {foodId: "1"})}}
                    >
                        <Text style={{ fontWeight: "bold"}}>Xem tất cả</Text>
                    </Pressable>
                </View>
                <View
                    style={{
                        borderBottomColor: Colors.light.blurBorder,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                { product?.rating != 0 &&
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, paddingVertical: 10}}
                >
                    <Image style={{ width:40, height: 40, borderRadius: 100}} source={require("../assets/images/icon.png")}/>
                    <View style={{display: "flex", marginLeft: 10, width: "90%"}}>
                        <Text>Nguyễn Văn A</Text>
                        
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                            {
                            [1,2,3,4,5].map((item, index) => {
                                return (
                                        <Ionicons name="star" size={20} color={Colors.light.textHighlight} key={index}/>
                                        )
                                    }
                                )
                            }
                        </View>
                        <Text style={{marginBottom: 10}}>Bánh mì dài là món ăn ngon nhất thế giới</Text>
                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4}}>
                            <Image style={{ width:80, height: 80, marginRight: 20}} source={require("../assets/images/icon.png")}/>
                            <Image style={{ width:80, height: 80}} source={require("../assets/images/icon.png")}/>
                        </View>
                    </View>
                </View>
                }
            </ScrollView>
            }
            { isLoading ? null :
            <View style={{height: 60, display: "flex", justifyContent: "center", alignItems: "center", borderTopWidth: 0.5, borderTopColor: Colors.light.blurBorder}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                , width: "90%", borderRadius: 10}}
                    onPress={handleAddToCart}
                >
                    <Text style={{fontSize: 16}}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});