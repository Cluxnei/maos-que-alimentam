import styled from 'styled-components/native';
import doar from '../assets/doar.png';
import receber from '../assets/receber.png';
import {Dimensions} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

const width = Dimensions.get('screen').width;
const buttonSize = width * 0.4;

export const Container = styled(LinearGradient).attrs({
  colors: ['#ff8978', '#ff3e6f'],
})`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  background-color: white;
`;

export const Donor = styled.TouchableOpacity`
  margin-top: 25px;
`;
export const Donate = styled.Image.attrs({
  source: doar,
  resizeMode: 'contain',
})`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
`;
export const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 30px;
`;
export const Receiver = styled(Donor)``;
export const Receive = styled.Image.attrs({
  source: receber,
  resizeMode: 'contain',
})`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
`;
