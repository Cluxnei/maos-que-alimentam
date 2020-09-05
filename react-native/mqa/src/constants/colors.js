import {Platform} from 'react-native';

const primaryColor = '#ff7576';
const secondColor = '#ff2669';
const selectionColor = Platform.OS === 'ios' ? 'white' : 'rgba(255,255,255, 0.3)';

export default {
  primaryColor,
  secondColor,
  loadingColor: 'black',
  selectionColor,
  errorColor: 'red',
};
