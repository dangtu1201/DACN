/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface LoginParamList extends LoginStackParamList {}
  }
}

export type LoginStackParamList = {
  Login: undefined;
  LoginS2: {phoneNumber: string};
  Register: undefined;
  RegisterS2: {phoneNumber: string};
  RegisterS3: {phoneNumber: string};
  Welcome: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  FoodItem: {foodId: string};
  Store: {storeId: string | undefined};
  OrderCart: undefined;
  OrderItemProcessing: undefined;
  OrderItemHistory: undefined;
  Dish: {name: string};
  PopularStore: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Review: {orderId: string};
  ReviewItem: {foodId: string};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type LoginStackScreenProps<Screen extends keyof LoginStackParamList> = NativeStackScreenProps<
  LoginStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Food: undefined;
  Order: NavigatorScreenParams<OrderTabParamList> | undefined;
  Message: undefined;
  Profile: undefined;
};

export type OrderTabParamList = {
  OrderProcessing: undefined;
  OrderHistory: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OrderTabScreenProps<Screen extends keyof OrderTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<OrderTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
