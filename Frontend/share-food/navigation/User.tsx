/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import FoodScreen from '../screens/FoodScreen';
import OrderScreen from '../screens/OrderScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodItemScreen from '../screens/FoodItemScreen';
import StoreScreen from '../screens/StoreScreen';
import OrderCartScreen from '../screens/OrderCartScreen';
import OrderItemProcessingScreen from '../screens/Order/OrderItemProcessingScreen';
import OrderItemHistoryScreen from '../screens/Order/OrderItemHistoryScreen';
import HeaderLeft from '../components/HeaderLeft';
import ShoppingCart from '../components/ShoppingCart';
import DishScreen from '../screens/DishScreen';
import PopularStoreScreen from '../screens/PopularStoreScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewItemScreen from '../screens/ReviewItemScreen';
import { View, Text } from '../components/Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, RootStackScreenProps } from '../types';
import { useEffect, useState } from 'react';
import { useAsync } from '../hooks/useAsync';
import { getLocationAddress } from '../api/getLocationAddress';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAddr, setAddress, setLocation } from '../redux/userAddr';
import { RootState } from '../redux/store';
import { useMeQuery } from "../redux/api/authApi";



export default function UserNavigation() {

  const dispatch = useDispatch()
  const userAddress = useSelector((state: RootState) => state.userAddr)
  const login = useSelector((state: RootState) => state.login)

  const getLocationAddressAsync = useAsync(getLocationAddress)
  
  useMeQuery('')

  useEffect(() => {
    getLocationAddressAsync.execute(userAddress.lat, userAddress.lng).then((response) => {
      if (response !== null) {
        dispatch(setAddress(response))
      }
    }).catch((error) => {
      console.log(error)
    })
  }, []);

  return (
    <NavigationContainer
      theme={DefaultTheme}>
      <UserNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FoodItem" component={FoodItemScreen} 
        options={({navigation} : RootStackScreenProps<"FoodItem">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Sản phẩm',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
        />
        <Stack.Screen name="Store" component={StoreScreen}
        options={({navigation} : RootStackScreenProps<"Store">) => ({ 
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Cửa hàng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
        />
        <Stack.Screen name="OrderCart" component={OrderCartScreen}
        options={({navigation} : RootStackScreenProps<"OrderCart">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Giỏ hàng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <Stack.Screen name="OrderItemProcessing" component={OrderItemProcessingScreen}
        options={({navigation} : RootStackScreenProps<"OrderItemProcessing">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đơn hàng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}} >
              <MaterialIcons name='message' color={Colors.light.contentHeader} size={28}/>
            </TouchableOpacity>
          ),
        })}
        />
        <Stack.Screen name="OrderItemHistory" component={OrderItemHistoryScreen}
        options={({navigation} : RootStackScreenProps<"OrderItemHistory">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đơn hàng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}} >
              <MaterialIcons name='message' color={Colors.light.contentHeader} size={28}/>
            </TouchableOpacity>
          ),
        })}
        />
        <Stack.Screen name="Dish" component={DishScreen}
        initialParams={{name: "recommended"}}
        options={({navigation} : RootStackScreenProps<"Dish">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Món ăn',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
        />
        <Stack.Screen name="PopularStore" component={PopularStoreScreen}
        options={({navigation} : RootStackScreenProps<"PopularStore">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Cửa hàng được ưa chuộng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen}
        options={({navigation} : RootStackScreenProps<"EditProfile">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Chỉnh sửa tài khoản',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
        options={({navigation} : RootStackScreenProps<"ChangePassword">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đổi mật khẩu',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <Stack.Screen name="Review" component={ReviewScreen}
        options={({navigation} : RootStackScreenProps<"Review">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đánh giá đơn hàng',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <Stack.Screen name="ReviewItem" component={ReviewItemScreen}
        options={({navigation} : RootStackScreenProps<"ReviewItem">) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đánh giá sản phẩm',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const userAddress = useSelector((state: RootState) => state.userAddr)

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.light.background,
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: () => (<Text></Text>),
          headerLeft: () => (
            <View style={{ marginLeft:10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='location' color={Colors.light.contentHeader} size={24}/>
              <Text style={{ fontSize: 14, color: Colors.light.contentHeader, width: "75%" }} numberOfLines={1}>{userAddress.address}</Text>
            </View>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
      />
      <BottomTab.Screen
        name="Food"
        component={FoodScreen}
        options={({ navigation }: RootTabScreenProps<'Food'>) => ({
          title: 'Sản phẩm',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
          headerTitle: () => (<Text></Text>),
          headerLeft: () => (
            <View style={{ marginLeft:10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='location' color={Colors.light.contentHeader} size={24}/>
              <Text style={{ fontSize: 14, color: Colors.light.contentHeader, width: "75%" }} numberOfLines={1}>{userAddress.address}</Text>
            </View>
          ),
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
      />
      <BottomTab.Screen
        name="Order"
        component={OrderScreen}
        options={({ navigation }: RootTabScreenProps<'Order'>) => ({
          title: 'Đơn hàng',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
      />
      <BottomTab.Screen
        name="Message"
        component={MessageScreen}
        options={({ navigation }: RootTabScreenProps<'Message'>) => ({
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <ShoppingCart/>
          )
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
