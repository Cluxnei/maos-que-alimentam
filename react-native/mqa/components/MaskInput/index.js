import React from 'react';
import * as S from './styles';

export default function MaskInput({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  msg,
  autoCapitalize,
  name,
  disabled,
  onBlur,
  type,
  options,
}) {
  return (
    <S.Container>
      {name && <S.Text>{name}</S.Text>}
      {msg && <S.Message>{msg}</S.Message>}
      <S.SubContainer name={name} disabled={disabled === true}>
        <S.TextInput
          type={type}
          options={options}
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
        />
      </S.SubContainer>
    </S.Container>
  );
}
