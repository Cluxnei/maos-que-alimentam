import React, {useEffect} from 'react';
import {resetNavigation} from "../constants/Utils";
import {TouchableOpacity, Text} from 'react-native';
import {storeData} from "../storage";
import {keys} from "../storage/Keys";

export default ({navigation, route}) => {
    const handleLogoutButtonPress = async () => {
        await Promise.all([storeData(keys.token, false), storeData(keys.user, false)]);
        return navigation.navigate('Login');
    };
    useEffect(() => {
        let mount = true;
        const {reset} = route.params;
        if (reset && mount) {
            return resetNavigation({navigation});
        }
        return () => mount = false;
    }, []);
    return (
        <>
            <TouchableOpacity onPress={handleLogoutButtonPress}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </>
    );
};