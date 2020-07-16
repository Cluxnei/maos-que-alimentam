import React from 'react';
import * as S from '../styles/SplashScreen';
import heart from '../assets/heart.png';
import text from '../assets/logo-text.png';

export default () => {
  return (
      <S.Container>
        <S.Logo source={heart} width="40%" />
        <S.Logo source={text} />
      </S.Container>
  );
};
