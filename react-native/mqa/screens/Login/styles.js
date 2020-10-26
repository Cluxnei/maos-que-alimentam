import { metrics, colors } from '../../styles';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.View`
  width: 80%;
`;

