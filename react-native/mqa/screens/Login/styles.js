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
  width: 80%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Logo = styled.Image`
  width: 100%;
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
  align-items: center;
  width: ${metrics.screenWidth * 0.7}px;
`;

export const QuestionText = styled.Text`
  color: white;
`;

export const SingUpButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: 30px;
  padding: ${metrics.basePadding / 4}px ${metrics.basePadding}px;
  justify-content: center;
  align-items: center;
`;

export const SingUpButtonText = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 30px;
`;

export const ForgotPasswordButtonText = styled.Text`
  color: white;
`;


