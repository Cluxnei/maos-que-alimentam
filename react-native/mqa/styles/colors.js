import {Platform} from 'react-native';

const selectionColor = Platform.OS === 'ios' ? 'white' : 'rgba(255,255,255, 0.3)';

const backgroundGradient = ['#ff3e6f', '#ff8978'];

export default {
  selectionColor,
  backgroundGradient,
  white: '#ffffff',
  primary: '#ff7576',
  secondary: '#ff2669',
  danger: '#c32a1e',
  success: '#4caf50',
  warning: '#ffa500',
  placeHolderInput: '#ffffff',
  textDanger: '#fae155'
};
