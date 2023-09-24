import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ScrollView, Switch, Modal } from "react-native";
import { Text, View } from "../components/Themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { IProduct } from "../type/product";
import { IProductCRUD } from "../screens/AddFoodScreen";
import { useUpdateProductMutation, useDeleteProductMutation } from "../redux/api/productApi";
import { useSelector, useDispatch } from 'react-redux';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { setStatus } from "../redux/status";
import { useUploadImageMutation } from "../redux/api/imageApi";
import {Picker} from '@react-native-picker/picker';

export default function UpdateAndDeleteFood({visible, setVisible, product}:{visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>, product: IProduct}) {

    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>();
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [productId, setProductId] = useState<string>("");
    const [productCRUD, setProductCRUD] = useState<IProductCRUD>({
        name: product.name,
        price_old: product.price_old.toString(),
        price: product.price.toString(),
        description: product.description,
        quantity: product.quantity.toString(),
        status: product.status,
        activeTime: {
            from: product.activeTime?.from,
            to: product.activeTime?.to,
        },
        category: product?.category,
    });

    useEffect(() => {
        setSelectedImage(product.image);
    }, [product.image]);

    useEffect(() => {
        setIsEnabled(product.status == "Active" ? true : false);
    }, [product.status]);

    useEffect(() => {
        setProductCRUD({
            name: product.name,
            price_old: product.price_old.toString(),
            price: product.price.toString(),
            description: product.description,
            quantity: product.quantity.toString(),
            status: product.status,
            activeTime: {
                from: product.activeTime?.from,
                to: product.activeTime?.to,
            },
            category: product?.category,
        });
        setProductId(product._id);
    }, [product]);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [uploadImage, { data: dataUploadImage, error: errorUploadImage, isLoading: isLoadingUploadImage }] = useUploadImageMutation();
    const listCategory = [
        "Rau củ quả",
        "Bánh mì",
        "Thịt",
        "Cá",
        "Trái cây",
        "Thức ăn nấu sẵn",
        "Khác"
      ]
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          aspect: [3, 3],
          base64: true,
        });
    
        if (!result.canceled) {
            // setSelectedImage(result.assets[0].uri);
            setSelectedImage(`data:image/jpg;base64,${result.assets[0].base64}`);
        } 
    };


    const handleDeleteProduct = async () => {
        let dataDel = JSON.stringify({
            id: productId,
        });
        await deleteProduct(dataDel).unwrap().then((res) => {
            console.log(res);
            setVisible(false);
            dispatch(setStatus({status: "deleteProductSuccess"}))
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleUpdateProduct = async () => {
        console.log(productCRUD);
        if (selectedImage == product.image) {
            let dataUpdate = JSON.stringify(
            { input:
                {
                _id: productId,
                name: productCRUD.name,
                price_old: parseInt(productCRUD.price_old),
                price: parseInt(productCRUD.price),
                description: productCRUD.description,
                quantity: parseInt(productCRUD.quantity),
                status: productCRUD.status,
                activeTime: {
                    from: productCRUD.activeTime.from,
                    to: productCRUD.activeTime.to,
                },
                category: productCRUD.category
            }
            });
            await updateProduct(dataUpdate).unwrap().then((res) => {
                console.log(res);
                setVisible(false);
                dispatch(setStatus({status: "updateProductSuccess"}))
            }).catch((err) => {
                console.log(err);
            });
        } else {
            let imgQuery = JSON.stringify({
                photo: ((selectedImage))
            });
            await uploadImage(imgQuery).unwrap().then((res) => {
                const image = res.singleUpload;
                setSelectedImage(image);
                let data = JSON.stringify({
                    input: {
                        _id: productId,
                        name: productCRUD.name,
                        price_old: parseInt(productCRUD.price_old),
                        price: parseInt(productCRUD.price),
                        description: productCRUD.description,
                        quantity: parseInt(productCRUD.quantity),
                        status: productCRUD.status,
                        activeTime: {
                            from: productCRUD.activeTime.from,
                            to: productCRUD.activeTime.to,
                        },
                        image: image,
                        category: productCRUD.category
                    }
                });
                console.log(data);
                updateProduct(data).unwrap().then((res) => {
                    console.log(res);
                    setVisible(false);
                    dispatch(setStatus({status: "updateProductSuccess"}))
                }).catch((err) => {
                    console.log(err);
                }
                );
            });
        }
    };

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <Text style={{fontSize: 16}}>Hình ảnh sản phẩm</Text>
                        <Pressable 
                            style={{width: 200, height: 200, borderWidth: 1, borderRadius: 10, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center"}}
                            onPress={() => pickImageAsync()}
                        >
                            {selectedImage ? (
                                <View>
                                    <Image source={{uri: selectedImage}} style={{width: 200, height: 200, borderRadius: 10}} />
                                    <Pressable
                                    style={{position: "absolute", top: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", width: 30, height: 30, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center"}}
                                    onPress={() => setSelectedImage(null)}
                                    >
                                        <Ionicons name="close" size={20} color="#fff" />
                                    </Pressable>
                                </View>
                            ) : (
                                <Ionicons name="add-circle-outline" size={50} color={Colors.light.tabIconDefault} />
                            )}
                        </Pressable>
                    </View>
                    <View style={{marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 16}}>Trạng thái</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: Colors.light.buttonSuccess }}
                            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setIsEnabled(!isEnabled);
                                setProductCRUD({...productCRUD, status: !isEnabled ? "Active" : "Inactive"});
                            }}
                            value={isEnabled}
                            style={{marginLeft: 20, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Loại sản phẩm</Text>
                        <View style={{ borderBottomWidth: 1 }}>
                            <Picker
                                selectedValue={productCRUD.category ? productCRUD.category[0] : "Rau củ quả"}
                                style={{height: 46, width: "100%", marginLeft: -5}}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setProductCRUD({...productCRUD, category: [itemValue]});
                                }
                                }
                            >
                                {listCategory.map((item, index) => {
                                    return <Picker.Item label={item} value={item} key={index} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 16}}>Tên sản phẩm</Text>
                        <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                            placeholder="Nhập tên sản phẩm"
                            value={productCRUD.name}
                            onChangeText={(text) => setProductCRUD({...productCRUD, name: text})}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Giá trước khuyến mãi</Text>
                        <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                            placeholder="Nhập giá trước khuyến mãi"
                            keyboardType="numeric"
                            value={productCRUD.price_old}
                            onChangeText={(text) => setProductCRUD({...productCRUD, price_old: text})}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Giá sau khuyến mãi</Text>
                        <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                            placeholder="Nhập giá sau khuyến mãi"
                            keyboardType="numeric"
                            value={productCRUD.price}
                            onChangeText={(text) => setProductCRUD({...productCRUD, price: text})}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Số lượng cần bán</Text>
                        <TextInput style={{width: "100%", fontSize: 16, borderBottomWidth: 1, marginTop: 10}}
                            placeholder="Nhập số lượng cần bán"
                            keyboardType="numeric"
                            value={productCRUD.quantity}
                            onChangeText={(text) => setProductCRUD({...productCRUD, quantity: text})}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Thời gian bán</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        <Pressable style={{width: "48%", height: 40, borderBottomWidth: 1, display: "flex", justifyContent: "center"}}
                            onPress={() => setShowFrom(true)}
                        >
                            <Text>{productCRUD.activeTime.from}</Text>
                        </Pressable>
                        <Pressable style={{width: "48%", height: 40, borderBottomWidth: 1, display: "flex", justifyContent: "center"}}
                            onPress={() => setShowTo(true)}
                        >
                            <Text>{productCRUD.activeTime.to}</Text>
                        </Pressable>
                    {showFrom && (
                    <RNDateTimePicker
                        value={from}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowFrom(false);
                            if (selectedTime) {
                                let fromHour = selectedTime.getHours() < 10 ? "0" + selectedTime.getHours() : selectedTime.getHours();
                                let fromMinute = selectedTime.getMinutes() < 10 ? "0" + selectedTime.getMinutes() : selectedTime.getMinutes();
                                setProductCRUD({
                                    ...productCRUD,
                                    activeTime: {
                                        ...product.activeTime,
                                        from: fromHour + ":" + fromMinute
                                    }
                                })
                            }
                               
                        }}
                        locale="vi-VN"
                        is24Hour={true}
                    />
                )}
                {showTo && (
                    <RNDateTimePicker
                        value={to}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowTo(false);
                            if (selectedTime) {
                                let toHour = selectedTime.getHours() < 10 ? "0" + selectedTime.getHours() : selectedTime.getHours();
                                let toMinute = selectedTime.getMinutes() < 10 ? "0" + selectedTime.getMinutes() : selectedTime.getMinutes();
                                setProductCRUD({
                                    ...productCRUD,
                                    activeTime: {
                                        ...product.activeTime,
                                        to: toHour + ":" + toMinute
                                    }
                                })
                            }
                        }}
                        locale="vi-VN"
                        is24Hour={true}
                    />
                )}
                    </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16}}>Mô tả sản phẩm</Text>
                        <TextInput
                            style={{width: "100%", fontSize: 16, borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 10, textAlignVertical: "top"}}
                            placeholder="Nhập mô tả sản phẩm"
                            multiline={true}
                            numberOfLines={4}
                            value={productCRUD.description}
                            onChangeText={(text) => setProductCRUD({...productCRUD, description: text})}
                        />
                    </View>
                    <View style={{height: 60, display: "flex", flexDirection: "row" ,justifyContent: "space-between", alignItems: "center", marginTop: 20}}>
                        <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonCancel, height: 50
                        , width: "45%", borderRadius: 10}}
                        onPress={() => {setDeleteModalVisible(true)}}
                        >
                            <Text style={{fontSize: 16}}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: Colors.light.buttonSuccess, height: 50
                        , width: "45%", borderRadius: 10}}
                        onPress={handleUpdateProduct}
                        >
                            <Text style={{fontSize: 16}}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setDeleteModalVisible(!deleteModalVisible);
                }}
            >
                <Pressable style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}
                    onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                >
                    <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 200}}
                        onPress={() => null}
                        activeOpacity={1}
                    >
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: 200, borderRadius: 10}}>
                        
                        <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 20, paddingHorizontal: 20}}>Bạn có chắc chắn muốn xóa sản phẩm này?</Text>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonCancel, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                            >
                                <Text style={{fontSize: 16}}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.buttonSuccess, width: "45%", height: 50, borderRadius: 10}}
                                onPress={() => {
                                    handleDeleteProduct();
                                }}
                            >
                                <Text style={{fontSize: 16}}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableOpacity>
                </Pressable>
            </Modal>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
});