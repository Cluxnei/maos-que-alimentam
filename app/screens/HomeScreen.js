import React, {useEffect, useLayoutEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {resetNavigation} from '../constants/Utils';
import * as S from '../styles/Home';
import HomeLogoutButton from '../components/HomeLogoutButton';
import {getData} from '../storage';
import {keys} from '../storage/Keys';
import {isEmpty} from "../constants/Validate";

export default ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HomeLogoutButton navigation={navigation} />
            ),
        });
    }, [navigation]);
    useEffect(() => {
        let mount = true;
        const {reset} = route.params;
        if (reset && mount) {
            return resetNavigation(navigation);
        }
        return () => {
            mount = false;
        };
    }, []);
    const getUser = async () => await getData(keys.user);
    useEffect(() => {
        let mount = true;
        getUser().then((user) => {
            if (mount && isEmpty(user)) {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Login',
                        params: {},
                    })
                );
            }
        });
        return () => {
            mount = false;
        }
    }, [navigation]);
    return (
        <S.Container>
            <S.Background>
                <S.Header/>
                <S.Doador>
                    <S.Doar/>
                    <S.Text>Doar</S.Text>
                </S.Doador>
                <S.Receptor>
                    <S.Receber/>
                    <S.Text>Receber</S.Text>
                </S.Receptor>
            </S.Background>
        </S.Container>
    );
};
