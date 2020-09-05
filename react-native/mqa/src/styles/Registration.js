import styled from 'styled-components/native';
import Colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dimensions, Animated, KeyboardAvoidingView} from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import LinearGradient from "react-native-linear-gradient";
import logo from '../assets/logo.png';

const {primaryColor, secondColor, selectionColor} = Colors;
const {width} = Dimensions.get('screen');

export const Container = styled(LinearGradient).attrs({
  colors: ['#ff8978', '#ff3e6f'],
})`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const scroll = styled(KeyboardAvoidingView).attrs({
  behavior: 'position',
  keyboardVerticalOffset: 5
})``;
export const body = styled.View`
  margin: 0 20px;
  align-items: center;
`;
export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  width: 90%;
  margin-top: 10px;
`;
export const DataContainer = styled.View``;
export const InputContainer = styled.View`
  flex-direction: row;
  width: ${width * 0.7}px;
  border-radius: 50px;
  margin: ${({submit}) => !!submit ? 15 : 10}px 0;
  border-width: ${({error}) => error ? 2 : 1}px;
  border-color: ${({error}) => error ? Colors.errorColor : 'white'};
`;
export const InputCircle = styled(Animated.View)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
export const EmailIcon = styled(EvilIcons).attrs({
  size: 35,
  name: 'user'
})`
  color: ${primaryColor};
`;
export const PasswordIcon = styled(EvilIcons).attrs({
  size: 35,
  name: 'lock'
})`
  color: ${primaryColor};
`;
export const ConfirmPasswordIcon = styled(AntDesign).attrs({
  size: 26,
  name: 'lock'
})`
  color: ${primaryColor};
`;
export const NameIcon = styled(AntDesign).attrs({
  size: 35,
  name: 'addusergroup'
})`
  color: ${primaryColor};
`;
export const CnpjIcon = styled(Entypo).attrs({
  size: 26,
  name: 'text-document-inverted'
})`
  color: ${primaryColor};
`;
export const PhoneIcon = styled(FontAwesome).attrs({
  size: 35,
  name: 'mobile-phone'
})`
  color: ${primaryColor};
`;
export const StreetIcon = styled(Entypo).attrs({
  size: 35,
  name: 'location-pin'
})`
  color: ${primaryColor};
`;
export const CityIcon = styled(FontAwesome5).attrs({
  size: 22,
  name: 'city'
})`
  color: ${primaryColor};
`;
export const ZipcodeIcon = styled(FontAwesome5).attrs({
  size: 25,
  name: 'map-marked-alt'
})`
  color: ${primaryColor};
`;
export const CnpjInputField = styled(TextInputMask).attrs({
  selectionColor,
  autoCorrect: false,
  placeholderTextColor: 'white',
  type: 'cnpj'
})`
  background-color: transparent;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  margin-left: -50px;
  color: white;
`;
export const zipcodeInputField = styled(TextInputMask).attrs({
  selectionColor,
  autoCorrect: false,
  placeholderTextColor: 'white',
  type: 'zip-code'
})`
  background-color: transparent;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  margin-left: -50px;
  color: white;
`;
export const PhoneInputField = styled(TextInputMask).attrs({
  selectionColor,
  autoCorrect: false,
  placeholderTextColor: 'white',
  type: 'cel-phone',
  options: {
    maskType: 'BRL',
    withDDD: true,
    dddMask: '(99) '
  }
})`
  background-color: transparent;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  margin-left: -50px;
  color: white;
`;
export const InputField = styled.TextInput.attrs({
  selectionColor,
  autoCorrect: false,
  placeholderTextColor: 'white',
})`
  background-color: transparent;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  margin-left: -50px;
  color: white;
`;
export const SubmitButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  text-align: center;
  width: 100%;
  background-color: white;
  border-radius: 50px;
`;
export const SubmitButtonText = styled.Text`
  color: ${secondColor};
`;
export const LoadingContainer = styled.View`
  flex-direction: row;
`;
