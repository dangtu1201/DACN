/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import HomeScreen from '../screens/HomeScreen';
import FoodScreen from '../screens/FoodScreen';
import MessageScreen from '../screens/MessageScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Notification from '../components/Notification';
import AddFoodScreen from '../screens/AddFoodScreen';
import OrderItemScreen from '../screens/OrderItemScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderHistoryItemScreen from '../screens/OrderHistoryItemScreen';
import HeaderLeft from '../components/HeaderLeft';
import { Ionicons } from '@expo/vector-icons';

export default function StoreNavigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="AddFood" component={AddFoodScreen} 
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            title: 'Thêm sản phẩm',
            headerTitleStyle: {
              color: Colors.light.contentHeader,
              fontSize: 20,
            },
            headerLeft: () => (
              <HeaderLeft/>
            ),
           }}
        />
        <Stack.Screen name="OrderItem" component={OrderItemScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            title: 'Đơn hàng 123456',
            headerTitleStyle: {
              color: Colors.light.contentHeader,
              fontSize: 20,
            },
            headerLeft: () => (
              <HeaderLeft/>
            ),
          }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen}
          options={{
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
          }}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
          options={{
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
          }}
        />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            title: 'Lịch sử đơn hàng',
            headerTitleStyle: {
              color: Colors.light.contentHeader,
              fontSize: 20,
            },
            headerLeft: () => (
              <HeaderLeft/>
            ),
          }}
        />
        <Stack.Screen name="OrderHistoryItem" component={OrderHistoryItemScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            title: 'Đơn hàng 123456',
            headerTitleStyle: {
              color: Colors.light.contentHeader,
              fontSize: 20,
            },
            headerLeft: () => (
              <HeaderLeft/>
            ),
          }}
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
        options={() => ({
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
        })}
      />
      <BottomTab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          title: 'Sản phẩm',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <Notification/>
          )
        }}
      />
      <BottomTab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <Notification/>
          )

        }}
      />
      <BottomTab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <Notification/>
          )
        }}
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
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
