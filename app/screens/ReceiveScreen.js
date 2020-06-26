import React, {useCallback} from 'react';
import * as S from '../styles/Receive'
import Interests from '../components/Interests';
import {interests} from '../api/Mocks.json';
import background from '../assets/background.png';
import {Alert} from "react-native";

export default () => {
    const handleEditItemPress = useCallback((item) => {
        Alert.alert('Clicou no item', item.name);
    }, []);
    return (
        <S.Background source={background}>
            <S.Container>
                <S.Title>INTERESSES</S.Title>
                <Interests items={interests} onEditPress={handleEditItemPress}/>
            </S.Container>
            <S.ScrollContainer>

            </S.ScrollContainer>
        </S.Background>
    );
};
