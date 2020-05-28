import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import {storeData} from "../storage";
import {keys} from "../storage/Keys";

export default ({navigation}) => {
    const handleLogoutButtonPress = async () => {
        await Promise.all([storeData(keys.token, false), storeData(keys.user, false)]);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Login',
                params: {},
            })
        );
    };
    return (
        <TouchableOpacity style={{marginRight: 20}} onPress={handleLogoutButtonPress}>
            <AntDesign name="logout" size={24} color={Colors.secondColor} />
            <Text style={{ color: Colors.secondColor}}>Sair</Text>
        </TouchableOpacity>
    );
}