import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import * as S from '../styles/SplashScreen';
import heart from '../assets/heart.png';
import text from '../assets/logo-text.png';
import {isEmptyOrFalse, isUndefined} from '../services/helpers';

export default ({navigation}) => {
  // State
  const {user} = useSelector(({UserReducer}) => UserReducer);
  // Verify user and token
  const checkUserAndTokenEffect = () => {
    if (isUndefined(navigation)) {
      return;
    }
    if (isEmptyOrFalse(user) || isEmptyOrFalse(user.token)) {
      return navigation.navigate('Login');
    }
    return navigation.navigate('Home');
  };
  // Effects
  useEffect(checkUserAndTokenEffect, []);
  // Render
  return (
      <S.Container>
        <S.Logo source={heart} width="40%" />
        <S.Logo source={text} />
      </S.Container>
  );
};
