import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Login/RegisterScreen';
import WelcomeScreen from '../screens/Login/WelcomeScreen';
import { LoginStackParamList } from '../types';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Colors from '../constants/Colors';
import HeaderLeft from '../components/HeaderLeft';
import LoginS2Screen from '../screens/Login/LoginS2Screen';
import RegisterS2Screen from '../screens/Login/RegisterS2Screen';
import RegisterS3Screen from '../screens/Login/RegisterS3Screen';

export default function LoginNavigation() {
  return (
    <NavigationContainer
      theme={DefaultTheme}>
      <LoginNavigator />
    </NavigationContainer>
  );
}


const LoginStack = createNativeStackNavigator<LoginStackParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
        <LoginStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <LoginStack.Screen name="Login" component={LoginScreen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đăng nhập',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <LoginStack.Screen name="LoginS2" component={LoginS2Screen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đăng nhập',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <LoginStack.Screen name="Register" component={RegisterScreen} 
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đăng ký',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <LoginStack.Screen name="RegisterS2" component={RegisterS2Screen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đăng ký',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
        <LoginStack.Screen name="RegisterS3" component={RegisterS3Screen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          title: 'Đăng ký',
          headerTitleStyle: {
            color: Colors.light.contentHeader,
            fontSize: 20,
          },
          headerLeft: () => (
            <HeaderLeft/>
          ),
        })}
        />
    </LoginStack.Navigator>
  );
}