import styled from 'styled-components/native';
import {metrics, colors} from '../../styles';
import {EvilIcons} from "@expo/vector-icons";
import {Animated} from "react-native";

export const MainContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

export const Container = styled.View`
  flex-direction: row;
  width: ${metrics.screenWidth * 0.7}px;
  border-color: white;
  border-width: 1px;
  border-radius: 50px;
  margin: ${metrics.baseMargin}px 0;
`;

export const InputCircle = styled(Animated.View)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const InputIcon = styled(EvilIcons)`
  color: ${colors.primary};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${colors.textDanger};
  font-weight: bold;
  padding-left: ${metrics.basePadding / 2}px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: colors.placeHolderInput,
  selectionColor: colors.selectionColor,
})`
  background-color: transparent;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  margin-left: -50px;
  font-weight: 300;
  color: ${colors.white};
  opacity: ${(props) => props.hide ? 0 : 1};
`;
