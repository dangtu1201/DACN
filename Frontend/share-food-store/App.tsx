import useCachedResources from './hooks/useCachedResources';
import { store } from './redux/store';
import { Provider } from 'react-redux'
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
