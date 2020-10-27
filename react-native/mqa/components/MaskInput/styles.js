import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import {metrics, colors} from '../../styles';

export const Container = styled.View``;

export const SubContainer = styled.View`
  flex-direction: column;
  border-width: 1px;
  width: ${metrics.screenWidth * 0.8}px;
  justify-content: space-between;
  border-color: ${colors.secondary};
  background-color: ${colors.primary};
  align-items: center;
  margin-top: ${(props) => !props.name ? 15 : 0}px;
`;

export const Text = styled.Text`
  padding-bottom: 3px;
  margin-top: 10px;
  font-size: 12px;
  color: ${colors.white};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${colors.danger};
  font-weight: bold;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const TextInput = styled(TextInputMask).attrs({
  placeholderTextColor: colors.placeHolderInput,
})`
  width: 100%;
  font-weight: 300;
  padding: ${metrics.basePadding / 1.5}px;
  color: ${colors.white};
`;
