import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Login/RegisterScreen';
import WelcomeScreen from '../screens/Login/WelcomeScreen';
import { LoginStackParamList } from '../types';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

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
        <LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <LoginStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </LoginStack.Navigator>
  );
}