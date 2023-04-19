/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import FoodScreen from '../screens/FoodScreen';
import OrderScreen from '../screens/OrderScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodItemScreen from '../screens/FoodItemScreen';
import { View, Text } from '../components/Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, RootStackScreenProps } from '../types';

import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
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
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color={Colors.light.contentHeader} style={{marginRight: 20}}/>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
                <View style={{ marginRight: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name='shopping-cart' color={Colors.light.contentHeader} size={28}/>
                </View>
            </TouchableOpacity>
          )
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
  const colorScheme = 'light';

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
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
              <Ionicons name='location' color={Colors[colorScheme].contentHeader} size={24}/>
              <Text style={{ fontSize: 14, color: Colors[colorScheme].contentHeader }}>Địa chỉ</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='shopping-cart' color={Colors[colorScheme].contentHeader} size={28}/>
            </View>
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
              <Ionicons name='location' color={Colors[colorScheme].contentHeader} size={24}/>
              <Text style={{ fontSize: 14, color: Colors[colorScheme].contentHeader }}>Địa chỉ</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='shopping-cart' color={Colors[colorScheme].contentHeader} size={28}/>
            </View>
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
            color: Colors[colorScheme].contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='shopping-cart' color={Colors[colorScheme].contentHeader} size={28}/>
            </View>
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
            color: Colors[colorScheme].contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='shopping-cart' color={Colors[colorScheme].contentHeader} size={28}/>
            </View>
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
            color: Colors[colorScheme].contentHeader,
            fontSize: 20,
          },
          headerRight: () => (
            <View style={{ marginRight: 20, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name='shopping-cart' color={Colors[colorScheme].contentHeader} size={28}/>
            </View>
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
