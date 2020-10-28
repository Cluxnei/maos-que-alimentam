import React from 'react';
import * as S from './styles';
import doar from '../../assets/images/doar.png';
import receber from '../../assets/images/receber.png';
import LogoutButton from "../../components/LogoutButton";
import {useSelector} from "react-redux";

export default function Home() {
  const {user} = useSelector((state) => state.auth);
  const handleDonateButtonPress = () => null;
  const handleReceiveButtonPress = () => null;

  return (
    <S.Scroll>
      <S.Container>
        <S.Header>
          <S.Greetings>
            <S.Name bigger>Olá,</S.Name>
            <S.Name>{user !== null ? user.name : ''}</S.Name>
          </S.Greetings>
          <LogoutButton />
        </S.Header>
        <S.Body>
          <S.Donor onPress={handleDonateButtonPress}>
            <S.Donate resizeMode="contain" source={doar}/>
            <S.Text>Doar</S.Text>
          </S.Donor>
          <S.Receiver onPress={handleReceiveButtonPress}>
            <S.Receive resizeMode="contain" source={receber}/>
            <S.Text>Receber</S.Text>
          </S.Receiver>
        </S.Body>
      </S.Container>
    </S.Scroll>
  );
};
