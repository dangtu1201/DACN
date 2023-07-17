import Toast from 'react-native-toast-message';


export const toast = (type: "success" | "error" | "info", text1: string, text2: string) => {
    Toast.show({
        type,
        text1,
        text2,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 100,
        bottomOffset: 40,
        position: 'top',
    });
}
