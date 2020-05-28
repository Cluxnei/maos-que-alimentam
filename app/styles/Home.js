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
    source: background
})`
  width: 100%;
  height: 100%;
  flex: 1;
  resize-mode: cover;
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
  margin-top: -80px;
  transform: rotateZ(3deg);
`;
export const Doador = styled.TouchableOpacity`
  margin: 15px 0;
`;
export const Doar = styled.Image.attrs({
    source: doar
})`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  resize-mode: contain;
`;
export const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 30px;
`;
export const Receptor = styled(Doador)`

`;
export const Receber = styled.Image.attrs({
    source: receber
})`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  resize-mode: contain;
`;