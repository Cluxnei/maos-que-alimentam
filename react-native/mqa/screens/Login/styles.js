import {metrics, colors} from '../../styles';
import styled from 'styled-components/native';
import {LinearGradient} from 'expo-linear-gradient';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Background = styled(LinearGradient).attrs({
  colors: colors.backgroundGradient,
})`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.View`
  width: 70%;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 80%;
  height: 150px;
  margin-bottom: ${metrics.baseMargin}px;
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

export const SingUpButton = styled.TouchableOpacity``;

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


