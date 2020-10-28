import styled from 'styled-components/native';
import {LinearGradient} from "expo-linear-gradient";
import {colors, metrics} from "../../styles";
import {Platform} from "react-native";
import Constants from 'expo-constants';

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
  }
})`
  flex: 1;
  background-color: green;
`;

export const Container = styled(LinearGradient).attrs({
  colors: colors.backgroundGradient,
})`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.white};
  margin-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 0}px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const Greetings = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: ${metrics.baseMargin * 2}px;
`;

export const Name = styled.Text`
  font-size: ${(props) => props.bigger ? 30 : 20}px;
  font-weight: ${(props) => props.bigger ? 800 : 400};
  color: ${(props) => props.bigger ? colors.secondary : colors.primary};
`;

export const Body = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const Donor = styled.TouchableOpacity`
  margin-top: ${metrics.baseMargin * 3}px;
`;
export const Donate = styled.Image`
  width: 200px;
  height: 200px;
`;

export const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 30px;
`;
export const Receiver = styled(Donor)``;

export const Receive = styled.Image`
  width: 200px;
  height: 200px;
`;
