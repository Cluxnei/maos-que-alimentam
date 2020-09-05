import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../constants/colors";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../storage/actions";

export default ({navigation}) => {
  const {user} = useSelector(({UserReducer}) => UserReducer);
  const dispatch = useDispatch();
  const handleLogoutButtonPress = async () => {
    dispatch(setUser({...user, password: '', token: ''}));
    navigation.dispatch(CommonActions.navigate({name: 'Login'}));
  };
  return (
    <TouchableOpacity style={{marginRight: 20}} onPress={handleLogoutButtonPress}>
      <AntDesign name="logout" size={24} color={Colors.secondColor} />
      <Text style={{ color: Colors.secondColor}}>Sair</Text>
    </TouchableOpacity>
  );
}
