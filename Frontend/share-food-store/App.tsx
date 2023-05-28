import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import StoreNavigation from './navigation/Store';
import LoginNavigation from './navigation/Login';
import Toast from 'react-native-toast-message';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isLoggedIn = true;

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isLoggedIn) {
      return (
        <SafeAreaProvider>
          <StoreNavigation/>
          <Toast />
        </SafeAreaProvider>
      ); 
    } else {
      return (
        <SafeAreaProvider>
          <LoginNavigation/>
          <Toast />
        </SafeAreaProvider>
      );
    }
  }
}
