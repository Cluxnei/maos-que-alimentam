import styled from 'styled-components/native';
import doar from '../assets/doar.png';
import receber from '../assets/receber.png';
import background from '../assets/background.png';
import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;

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
export const Doador = styled.TouchableOpacity`
  margin: 15px 0;
`;
export const Doar = styled.Image.attrs({
    source: doar
})`
  width: ${width * 0.5}px;
  height: ${width * 0.5}px;
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
  width: ${width * 0.5}px;
  height: ${width * 0.5}px;
  resize-mode: contain;
`;