import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import {Dimensions, Animated} from "react-native";

const {primaryColor, secondColor} = Colors;
const {width} = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
`;
export const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex: 1;
  resize-mode: cover;
`;
export const scroll = styled.KeyboardAvoidingView.attrs({behavior: 'position', keyboardVerticalOffset: -64})``;
export const Header = styled.Image`
  width: 100%;
  height: 200px;
`;
export const body = styled.View`
  margin: 0 20px;
  align-items: center;
`;
export const Logo = styled.Image`
  resize-mode: contain;
  width: 90%;
`;
export const DataContainer = styled.View`
  margin-top: 10px;
`;
export const InputContainer = styled.View`
  flex-direction: row;
  width: ${width * 0.7}px;
  border-color: white;
  border-width: 1px;
  border-radius: 50px;
  margin: ${({submit}) => !!submit ? 15 : 5}px 0;
`;
export const InputCircle = styled(Animated.View)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
export const InputIcon = styled(EvilIcons).attrs({size: 35})`
  color: ${primaryColor};
`;
export const InputField = styled.TextInput.attrs({
    selectionColor: secondColor,
    autoCorrect: false,
    placeholderTextColor: 'white'
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
export const LinksContainer = styled.View`
  width: 80%;
  margin-top: 15px;
  align-items: center;
`;
export const SingUpContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
export const QuestionText = styled.Text`
  color: white;
`;
export const SingUpButton = styled.TouchableOpacity`
  
`;
export const SingUpButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
export const ForgotPasswordButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 30px;
`;
export const ForgotPasswordButtonText = styled.Text`
  color: white;
`;
export const LoadingContainer = styled.View`
  flex-direction: row;
`;
