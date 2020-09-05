import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles';

const Header = ({ title, goBack }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <View style={{ flex: 3, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => (goBack ? goBack() : navigation.goBack())}
        >
          <Ionicons
            style={{
              paddingHorizontal: 20,
              backgroundColor: colors.secundary,
            }}
            name="ios-arrow-back"
            size={33}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          flex: 4,
          fontWeight: 'bold',
          color: colors.white,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 2 }} />
    </View>
  );
};

export default Header;
