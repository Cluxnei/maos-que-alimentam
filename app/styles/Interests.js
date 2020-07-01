import styled from 'styled-components/native';
import {Animated, Dimensions} from 'react-native';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import Colors from '../constants/Colors';

const {width} = Dimensions.get('screen');
const {primaryColor} = Colors;

export const Container = styled.View`
  width: 100%;
  padding: 20px 0;
  border-bottom-width: 2px;
  border-bottom-color: white;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
  width: 70%;
`;

export const ItemContainer = styled.View`
  flex-direction: row-reverse;
  width: ${width * 0.7}px;
  border-color: white;
  border-width: 1px;
  border-radius: 50px;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const EditItemButton = styled.TouchableOpacity`
  
`;

export const ItemCircle = styled(Animated.View)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
export const ItemIcon = styled(FontAwesome).attrs({
    size: 20,
    name: 'edit',
})`
  color: ${primaryColor};
  margin-left: 5px;
  margin-top: 2px;
`;

export const ItemText = styled.Text`
  padding-left: 60px;
  color: white;
`;

export const AddItemButton = styled.TouchableOpacity`
  width: 70%;
  border-radius: 30px;
  background-color: white;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const AddItemCircle = styled.View`
  background-color: ${primaryColor};
  width: 30px;
  height: 30px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const AddItemIcon = styled(AntDesign).attrs({
    size: 25,
    name: 'plus',
})`
  color: white;
`;
