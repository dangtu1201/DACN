import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import LoginNavigation from './navigation/Login';
import { store } from './redux/store';
import { Provider } from 'react-redux'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isLoggedIn = true;

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isLoggedIn) {
      return (
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation/>
          </SafeAreaProvider>
        </Provider>
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
