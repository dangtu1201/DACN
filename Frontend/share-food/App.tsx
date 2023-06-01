import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import LoginNavigation from './navigation/Login';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import RootNavigation from './navigation';


export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
    )
  }
}
