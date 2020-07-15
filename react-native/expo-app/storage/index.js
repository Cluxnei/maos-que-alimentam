import {AsyncStorage} from 'react-native';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@${key}`, JSON.stringify(value), () => null);
    } catch (e) {
        return false;
    }
    return true;
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`, () => null);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (e) {
        return null;
    }
    return null;
};
