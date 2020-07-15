import React from 'react';
import * as S from '../styles/SplashScreen';
import heart from '../assets/logo.png';
import text from '../assets/logo.png';

export default () => {
  return (
      <S.Container>
        <S.Logo source={heart} />
        <S.Logo source={text} />
      </S.Container>
  );
}
