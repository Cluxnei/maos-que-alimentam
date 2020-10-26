import {showMessage} from "react-native-flash-message";
import {colors} from "../styles";

export const warningMessage = (message = 'Ops', description = 'Atenção') => showMessage({
  message,
  description,
  type: 'warning',
  backgroundColor: colors.warning,
  floating: true,
  position: 'top',
});

export const successMessage = (message = 'Sucesso', description = 'Ação realizada!') => showMessage({
  message,
  description,
  type: 'success',
  backgroundColor: colors.success,
  floating: true,
  position: 'top',
});

export const dangerMessage = (message = 'Ops', description = 'Ocorreu um erro') =>
  showMessage({
    message,
    description,
    type: 'danger',
    backgroundColor: colors.tomato,
    floating: true,
    position: 'top',
  });

export const offlineMessage = () => dangerMessage('Ops', 'Você está offline!');

