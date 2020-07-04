import React, {useState} from 'react';
import background from '../assets/background.png';
import * as S from '../styles/AddInterest';
import {isEmpty, validateErrorsMessages} from '../constants/Validate';
import axios from '../api';
import routes from '../api/Routes';

export default ({navigation}) => {
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [itemName, setItemName] = useState('');
    const [errorField, setErrorField] = useState(undefined);
    const [itemNameField, setItemNameField] = useState(undefined);

    const createItem = async (name) => {
        try {
            const {
                data: {success, result}
            } = await axios.post(routes.storeItem, {name});
            return {success, result};
        } catch (e) {
            return false;
        }
    };

    const handleAddItemButtonPress = async () => {
        if (isEmpty(itemName)) {
            setErrorField('itemName');
            if (itemNameField) {
                itemNameField.focus();
            }
            return setMessage(validateErrorsMessages.name);
        }
        setIsPerformingAnyAction(true);
        const response = await createItem(itemName.trim());
        if (!response) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.checkConnection);
        }
        if (!response.success) {
            setIsPerformingAnyAction(false);
            return setMessage(response.result);
        }
        setIsPerformingAnyAction(false);
        return navigation.navigate('SelectItem');
    };

    return (
        <S.Background source={background}>
            <S.Container>
                <S.Scroll>
                    {message ? (
                        <S.MessageBox>
                            <S.MessageText>{message}</S.MessageText>
                        </S.MessageBox>
                    ) : null}
                    <S.InputContainer error={errorField === 'itemName'}>
                        <S.InputCircle>
                            <S.ItemNameIcon />
                        </S.InputCircle>
                        <S.ItemNameInputField
                            onChangeText={setItemName}
                            value={itemName} placeholder={isPerformingAnyAction ? '' : 'Nome do item'}
                            returnKeyType="done" editable={!isPerformingAnyAction}
                            onSubmitEditing={handleAddItemButtonPress}
                            ref={setItemNameField}
                            style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                        />
                    </S.InputContainer>
                    <S.AddItemButton onPress={handleAddItemButtonPress}>
                        <S.AddItemCircle>
                            <S.AddItemIcon/>
                        </S.AddItemCircle>
                    </S.AddItemButton>
                </S.Scroll>
            </S.Container>
        </S.Background>
    );
};
