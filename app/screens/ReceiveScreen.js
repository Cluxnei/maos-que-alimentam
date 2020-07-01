import React, {useCallback, useEffect, useState} from 'react';
import * as S from '../styles/Receive'
import Interests from '../components/Interests';
import background from '../assets/background.png';
import {Alert} from 'react-native';
import {getData, storeData} from '../storage';
import {keys} from '../storage/Keys';
import axios from "../api";
import routes from "../api/Routes";

export default ({navigation}) => {
    // Local state
    const [isPerformingAnAction, setIsPerformingAnAction] = useState(false);
    const [interests, setInterests] = useState([]);
    // Methods

    const getInterests = async () => {
        try {
            const {
                data: {success, result}
            } = await axios.get(routes.getInterests);
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    const loadInterestFromStorage = async () => {
        const response = await getInterests();
        if (response) {
            const {success, result: {interests: apiInterests}} = response;
            if (success && apiInterests && apiInterests.length > 0) {
                await storeData(keys.interests, apiInterests);
            }
        }
        const storageInterests = await getData(keys.interests);
        setInterests(storageInterests || []);
    };
    // Effects
    // Load from storage to state
    useEffect(() => {
        let mount = true;
        if (mount) {
            setIsPerformingAnAction(true);
            loadInterestFromStorage().then(() => {
                setIsPerformingAnAction(false);
            });
        }
        return () => {
            mount = false;
        };
    }, []);
    // Handlers
    const handleEditItemPress = useCallback((item) => {
        Alert.alert('Clicou no item', item.name);
    }, []);

    return (
        <S.Background source={background}>
            <S.Container>
                <S.Title>INTERESSES</S.Title>
                {interests.length === 0 && <S.Title>Nenhum interesse cadastrado</S.Title>}
                <Interests items={interests} onEditPress={handleEditItemPress} navigation={navigation}/>
            </S.Container>
            {/*<S.ScrollContainer>*/}

            {/*</S.ScrollContainer>*/}
        </S.Background>
    );
};
