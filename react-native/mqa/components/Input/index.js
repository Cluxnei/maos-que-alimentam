import React, {useEffect, useState} from 'react';

import * as S from './styles';
import {Animated} from "react-native";

export default function Input({
    placeholder,
    keyboardType,
    secureTextEntry,
    value,
    onChangeText,
    msg,
    autoCapitalize,
    disabled,
    onBlur,
    multiline,
    textInputStyle,
    loading,
    iconName,
    iconSize,
  }) {
  const [widthAnimation] = useState(new Animated.Value(20));

  const startAnimation = () => {
    Animated.timing(widthAnimation, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const resetAnimation = async () => {
    Animated.timing(widthAnimation, {
      toValue: 20,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    let mounted = true;
    mounted && (
      loading ? startAnimation() : resetAnimation()
    );
    return () => {
      mounted = false;
    };
  }, [loading]);

  return (
    <S.MainContainer>
    {msg && <S.Message>{msg}</S.Message>}
      <S.Container>
        <S.InputCircle style={
          {
            width: loading ? widthAnimation.interpolate({
              inputRange: [20, 100],
              outputRange: ['20%', '100%'],
            }) : 50
          }
        }>
          <S.InputIcon name={iconName} size={iconSize} />
        </S.InputCircle>
        <S.TextInput
          hide={loading}
          autoCapitalize={autoCapitalize || 'none'}
          autoCorrect={false}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onBlur}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType || 'default'}
          secureTextEntry={!!secureTextEntry}
          editable={!disabled}
          multiline={multiline}
          style={textInputStyle}
        />
      </S.Container>
    </S.MainContainer>
  );
}
