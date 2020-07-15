import React, {useEffect, useState} from 'react';
import axios from '../api';
import routes from '../api/Routes';
import {validateErrorsMessages} from '../constants/Validate';
import background from "../assets/background.png";
import * as S from "../styles/Receive";
import ItemList from "../components/ItemList";

export default ({navigation}) => {

    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [items, setItems] = useState([]);

    const getItemsRequest = async () => {
        try {
            const {
                data: {success, result}
            } = await axios.get(routes.getItems);
            return {success, result};
        } catch (e) {
            return false;
        }
    };

    const loadItems = async () => {
        const response = await getItemsRequest();
        if (!response) {
            return setMessage(validateErrorsMessages.checkConnection);
        }
        if (!response.success) {
            return setMessage(response.result);
        }
        setItems(response.result);
    };

    const handleItemPress = () => {};

    useEffect(() => {
        let mount = true;
        if (mount) {
            setIsPerformingAnyAction(true);
        }
        loadItems().then(() => {
            if (mount) {
                setIsPerformingAnyAction(false);
            }
        });
        return () => {
            mount = false;
        }
    }, []);

    return (
        <S.Background source={background}>
            <S.Container>
                <S.Title>Itens</S.Title>
                {items.length === 0 && <S.Title>Parece que não há itens ainda, mas você pode cadastrar um</S.Title>}
                <ItemList items={items} onItemPress={handleItemPress} navigation={navigation}/>
            </S.Container>
        </S.Background>
    );
};
