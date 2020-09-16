import { metrics, colors } from '../../styles';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 200px;
  margin-top: ${metrics.baseMargin};
`;

export const Text = styled.Text`
  color: ${colors.white};
  margin-top: ${metrics.basePadding / 2};
`;
