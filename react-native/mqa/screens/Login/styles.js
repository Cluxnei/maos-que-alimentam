import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    marginTop: metrics.baseMargin,
  },
  text: {
    color: colors.white,
    marginTop: metrics.basePadding / 2,
  },
});

export default styles;
