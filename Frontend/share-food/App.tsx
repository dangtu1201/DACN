import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import LoginNavigation from './navigation/Login';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isLoggedIn = true;

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isLoggedIn) {
      return (
        <SafeAreaProvider>
          <Navigation/>
        </SafeAreaProvider>
      ); 
    } else {
      return (
        <SafeAreaProvider>
          <LoginNavigation/>
        </SafeAreaProvider>
      );
    }
  }
}
