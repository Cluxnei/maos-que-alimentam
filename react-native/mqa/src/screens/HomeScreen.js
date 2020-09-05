import React, {useEffect, useLayoutEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import * as S from '../styles/Home';
import HomeLogoutButton from '../components/HomeLogoutButton';
import {useSelector} from "react-redux";
import {isEmptyOrFalse} from "../services/helpers";

export default ({navigation}) => {
  // Global state
  const {user} = useSelector(({UserReducer}) => UserReducer);
  // Handlers
  const handleDonateButtonPress = () => navigation.navigate('Donate');
  const handleReceiveButtonPress = () => navigation.navigate('Receive');
  // Effects
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HomeLogoutButton navigation={navigation} />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    let mount = true;
    if (mount && isEmptyOrFalse(user.token)) {
      navigation.dispatch(CommonActions.navigate({name: 'Login'}));
    }
    return () => {
      mount = false;
    }
  }, [navigation]);

  return (
    <S.Container>
      <S.Header/>
      <S.Donor onPress={handleDonateButtonPress}>
        <S.Donate/>
        <S.Text>Doar</S.Text>
      </S.Donor>
      <S.Receiver onPress={handleReceiveButtonPress}>
          <S.Receive/>
          <S.Text>Receber</S.Text>
        </S.Receiver>
    </S.Container>
  );
};
