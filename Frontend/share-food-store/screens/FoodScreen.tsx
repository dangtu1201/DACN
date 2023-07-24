import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../components/Pagination";
import Colors from "../constants/Colors";
import UpdateAndDeleteFood from "../components/UpdateAndDeleteFood";
import { useGetProductsQuery } from "../redux/api/productApi";
import { IProduct } from "../type/product";
import { formatMoney } from "../services/formatMoney";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";
import { setStatus } from "../redux/status";

interface IFillter {
    field: "updateTime" | "createTime" | "price",
    status: "asc" | "desc"
}

type IStock = "all" | "inStock" | "outStock"

export default function FoodScreen({ navigation }: RootTabScreenProps<"Food">) {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<IFillter>({field: "updateTime", status: "asc"});
    const [inStock, setInStock] = useState<IStock>("all");
    const [isOpenfillter, setIsOpenfillter] = useState(false);
    const [isOpenInStock, setIsOpenInStock] = useState(false);
    const [isModalOutPress, setIsModalOutPress] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [updateAndDeleteFood, setUpdateAndDeleteFood] = useState(false);
    const [productUpdateAndDelete, setProductUpdateAndDelete] = useState<IProduct>(
        {
            _id: "",
            name: "",
            quantity: 0,
            price: 0,
            price_old: 0,
            activeTime: {
                from: "",
                to: ""
            },
            status: "",
            description: "",
            image: "",
            shop: "",
            category: [""],
            discount_id: [""]
        }

    );
    const totalPage = 10;
    const dispatch = useDispatch();
    const shop = useSelector((state: RootState) => state.shop);
    const status = useSelector((state: RootState) => state.status);
    const [fillter, setFillter] = useState({
        shopId: '',
    });
    
    const { currentData, error, isLoading, refetch } = useGetProductsQuery(JSON.stringify(fillter));

    useEffect(() => {
        if (shop._id) {
            setFillter({
                ...fillter,
                shopId: shop._id
            })
        }
    }, [shop?._id])

    useEffect(() => {
        if (status.status === "addProductSuccess" || status.status === "updateProductSuccess" || status.status === "deleteProductSuccess") {
            refetch();
            dispatch(setStatus({status: ""}));
        }
    }, [status])


    const fillterOptions = {
        "updateTime": "Ngày cập nhật",
        "createTime": "Ngày tạo",
        "price": "Giá"
    }

    const stockOptions = {
        "all": "Tất cả",
        "inStock": "Đang bán",
        "outStock": "Chưa bán"
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
            <Pressable style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, display: isModalOutPress ? "flex" : "none"}}
                onPress={() => {setIsOpenfillter(false); setIsOpenInStock(false); setIsModalOutPress(false)}}
            ></Pressable>
            
            <TouchableOpacity style={{alignSelf: "flex-end", marginBottom: 10}}
                onPress={() => navigation.navigate("AddFood")}
            >
                <Text style={{fontSize: 16, color: Colors.light.textHighlight, fontWeight: "bold"}}>Thêm sản phẩm</Text>
            </TouchableOpacity>
            <View style={styles.search}>
                <Ionicons name="search" size={24} color="black" style={{alignItems:"center", marginRight: 5}}/>
                <TextInput style={styles.searchInput}/>
            </View>
            <View style={styles.filterFood}>
                <Pressable style={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "center", 
                            width: 160, backgroundColor: "#fff", elevation: 2, padding: 5}}
                            onPress={() => {setIsOpenfillter(!isOpenfillter); setIsModalOutPress(true)}}
                >
                    <Text style={{fontSize: 16, marginRight: 5}}>{fillterOptions[filter.field]}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                </Pressable>
                <Pressable style={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems: "center",
                            width: 160, backgroundColor: "#fff", elevation: 2, padding: 5}}
                            onPress={() => {setIsOpenInStock(!isOpenInStock); setIsModalOutPress(true)}}
                >
                    <Text style={{fontSize: 16, marginRight: 5}}>{stockOptions[inStock]}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                </Pressable>
            </View>    
            {isOpenfillter && <View style={{position: "absolute", top: 138, left: 20, zIndex: 1, width: 160,
                 backgroundColor: "#fff", elevation: 2}}
                 >
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "updateTime"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Ngày cập nhật</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "createTime"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Ngày tạo</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setFilter({...filter, field: "price"}) ; setIsOpenfillter(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Giá</Text>
                </Pressable>
            </View>}
            {isOpenInStock && <View style={{position: "absolute", top: 138 , zIndex: 1, width: 160,
                    right: 20,backgroundColor: "#fff", elevation: 2}}
                    >
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("all") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Tất cả</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("inStock") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Đang bán</Text>
                </Pressable>
                <Pressable style={{padding: 5, borderTopWidth: 0.5, borderBottomWidth: 0.5}}
                    onPress={() => {setInStock("outStock") ; setIsOpenInStock(false); setIsModalOutPress(false)}}
                >
                    <Text style={{fontSize: 16}}>Chưa bán</Text>
                </Pressable>
            </View>}

            {isLoading && <ActivityIndicator size="large" color={Colors.light.textHighlight} />}
           
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.foodList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                    {currentData?.getProductsByShop?.map((item: IProduct, index: number) => 
                        (<TouchableOpacity key={index} style={{display: "flex", alignItems: "center", marginTop: 1}}
                            onPress={()=>{
                                setProductUpdateAndDelete(item);
                                setUpdateAndDeleteFood(true);
                            }
                            }
                        >
                            <View style={styles.foodItem}>
                                <Image style={styles.foodImage} source={{ uri: item.image }}/>
                                <View style={{padding: 10, backgroundColor: Colors.light.backgroundIiem}}>
                                    <Text style={{fontWeight: "bold", display: "flex", width: 200}}>{item?.name}</Text>
                                    <Text>Số lượng: {item?.quantity}</Text>
                                    <Text>Trạng thái: <Text style={{color: item?.status === "Active" ? Colors.light.textHighlight : "#C30000"}}>{item?.status === "Active" ? "Đang bán" : "Chưa bán"}</Text></Text>
                                    <Text>Thời gian bán: {item?.activeTime?.from} - {item?.activeTime?.to}</Text>
                                    <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", width: 200, marginTop: 4, backgroundColor: Colors.light.backgroundIiem}}>
                                        <Text style={{color: Colors.light.blurText, textDecorationLine: "line-through"}}>{formatMoney(item?.price_old)}đ</Text>
                                        <Text style={{color: Colors.light.textHighlight, fontWeight: "bold"}}>{formatMoney(item.price)}đ</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)
                    )}
            </ScrollView>
            {/* <Pagination
                currentPage={currentPage}
                totalPages = {totalPage}
                onPress = {setCurrentPage}
            /> */}
            <UpdateAndDeleteFood
                visible={updateAndDeleteFood}
                setVisible={setUpdateAndDeleteFood}
                product={productUpdateAndDelete}
            />
                    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    search: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.light.background,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
    },
    searchInput: {
        width: "90%",
    },
    filterFood: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    foodList: {
        marginTop: 10,
        display: "flex",
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
        height: "100%",
        borderRadius: 10,
    }

});

