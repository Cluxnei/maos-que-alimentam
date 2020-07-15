import styled from 'styled-components/native';
import doar from '../assets/doar.png';
import receber from '../assets/receber.png';
import background from '../assets/background.png';
import watermark from '../assets/watermark.png';
import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
const buttonSize = width * 0.4;

export const Container = styled.View`
  flex: 1;
`;
export const Background = styled.ImageBackground.attrs({
    source: background,
    resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Header = styled.Image.attrs({
    source: watermark,
    resizeMode: 'stretch'
})`
  width: 110%;
  height: 100px;
  margin-top: -140px;
  margin-bottom: 20px;
  transform: rotateZ(3deg);
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
