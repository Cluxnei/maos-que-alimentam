import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

export const Background = styled.ImageBackground.attrs({
    resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
    contentContainerStyle: {
        flex: 1,
        alignItems: 'center',
    }
})``;

export const MessageBox = styled.View`
  background-color: white;
  padding: 10px 20px;
  border-radius: 15px;
  width: 70%;
  margin-bottom: 10px;
`;

export const MessageText = styled.Text`
  color: ${Colors.primaryColor};
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

export const SelectItemButton = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-direction: row;
  width: 70%;
  border-width: 1px;
  border-color: white;
  border-radius: 50px;
  margin: 10px 0;
`;

export const SelectItemLabel = styled.Text`
  color: white;
  padding-left: 20px;
`;

export const SelectItemIcon = styled(AntDesign).attrs({
    size: 20,
    name: 'down',
})`
  color: ${Colors.primaryColor};
`;

export const SelectUnitIcon = styled(AntDesign).attrs({
    size: 25,
    name: 'down',
})`
  color: ${Colors.primaryColor};
`;

export const SelectItemUnitButton = styled(SelectItemButton)``;

export const InputContainer = styled.View`
  flex-direction: row-reverse;
  width: 70%;
  border-color: white;
  border-width: 1px;
  border-radius: 50px;
  margin: 15px 0;
`;

export const InputCircle = styled.View`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
export const QuantityIcon = styled(MaterialCommunityIcons).attrs({
   name: 'plus-minus',
   size: 25,
})`
  color: ${Colors.primaryColor};
`;

export const QuantityInputField = styled.TextInput.attrs({
    selectionColor: Colors.selectionColor,
    autoCorrect: false,
    placeholderTextColor: 'white'
})`
  background-color: transparent;
  width: 100%;
  padding-left: 75px;
  padding-right: 20px;
  margin-left: -50px;
  color: white;
`;

export const AddItemButton = styled.TouchableOpacity`
  width: 70%;
  border-radius: 30px;
  background-color: white;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
`;

export const AddItemCircle = styled.View`
  background-color: ${Colors.primaryColor};
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

export const ItemNameIcon = styled(MaterialCommunityIcons).attrs({
    name: 'food',
    size: 30,
})`
  color: ${Colors.primaryColor};
`;

export const ItemNameInputField = styled(QuantityInputField)``;
