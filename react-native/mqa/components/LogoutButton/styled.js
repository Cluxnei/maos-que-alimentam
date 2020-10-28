import {AntDesign} from "@expo/vector-icons";
import styled from 'styled-components/native';
import {colors, metrics} from '../../styles';

export const Button = styled.TouchableOpacity`
  margin-right: ${metrics.baseMargin * 2}px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 20px;
`;

export const Icon = styled(AntDesign).attrs({
  size: 34,
})`
  color: ${colors.primary};
`;
