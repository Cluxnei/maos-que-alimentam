import React, {useEffect} from 'react';
import {resetNavigation} from "../constants/Utils";
import * as S from "../styles/Home";
import {storeData} from "../storage";
import {keys} from "../storage/Keys";

export default ({navigation, route}) => {
    const handleLogoutButtonPress = async () => {
        await Promise.all([storeData(keys.token, false), storeData(keys.user, false)]);
        return navigation.navigate('Login');
    };
    useEffect(() => {
        let mount = true;
        const {reset} = route.params;
        if (reset && mount) {
            return resetNavigation({navigation});
        }
        return () => mount = false;
    }, []);
    return (
        <S.Container>
            <S.Background>
                <S.Doador>
                    <S.Doar />
                    <S.Text>Doar</S.Text>
                </S.Doador>
                <S.Receptor>
                    <S.Receber />
                    <S.Text>Receber</S.Text>
                </S.Receptor>
            </S.Background>
        </S.Container>
    );
};