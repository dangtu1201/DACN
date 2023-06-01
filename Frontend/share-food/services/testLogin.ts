import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export const storeUserId = async (value: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('userId', jsonValue)
    } catch (e) {
        // saving error
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Error when store userId',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}

export const getUserId = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userId')
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

export const clearUserId = async () => {
    try {
        await AsyncStorage.removeItem('userId')
    } catch (e) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Error when clear userId',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
}
