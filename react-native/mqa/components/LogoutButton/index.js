import React from 'react';
import {Creators as LoginActions} from '../../store/ducks/auth';
import * as S from './styled';
import {useDispatch} from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogoutButtonPress = () => dispatch(LoginActions.logout());
  return (
    <S.Button onPress={handleLogoutButtonPress}>
      <S.Icon name="logout"/>
      <S.Text>Sair</S.Text>
    </S.Button>
  );
}
