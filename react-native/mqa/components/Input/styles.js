import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.secundary,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontWeight: '300',
    padding: metrics.basePadding / 1.5,
    color: colors.white,
  },
  text: {
    paddingBottom: 3,
    marginTop: 10,
    fontSize: 12,
    color: colors.white,
  },
  msg: {
    fontSize: 11,
    color: colors.danger,
    right: 0,
    flex: 1,
    textAlign: 'right',
  },
});

export default styles;
