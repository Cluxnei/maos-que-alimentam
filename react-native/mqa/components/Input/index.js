/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';

import { TextInput, View, Text } from 'react-native';

import styles from './styles';

export default function Input({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  msg,
  autoCapitalize,
  name,
  disabled,
  first,
  onBlur,
}) {
  return (
    <View>
      {name && <Text style={styles.text}>{name}</Text>}
      <View
        style={[
          first === true ? styles.inputContainerFirst : styles.inputContainer,
          !name ? { marginTop: 15 } : {},
          disabled === true ? { backgroundColor: '#f1f1f1' } : {},
        ]}
      >
        <TextInput
          style={styles.input}
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
        {msg && <Text style={styles.msg}>{msg}</Text>}
      </View>
    </View>
  );
}
