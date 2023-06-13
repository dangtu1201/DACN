import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export const storeUser = async (value: {userId: string, userToken: string}) => {
    try {
        const jsonValue = JSON.stringify(value)
        console.log(value);
        await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
        // saving error
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Error when store user',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}

export const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Error when get userId',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}

export const clearUser = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Error when clear user',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}


