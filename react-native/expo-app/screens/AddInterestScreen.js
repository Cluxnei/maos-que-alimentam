import React, {useEffect, useState} from 'react';
import * as S from '../styles/AddInterest'
import background from '../assets/background.png';
import {isEmpty, isNotEmpty, validateErrorsMessages} from '../constants/Validate';


export default ({navigation}) => {
    // Local state
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [errorField, setErrorField] = useState('');
    const [quantity, setQuantity] = useState('0');
    const [quantityField, setQuantityField] = useState(undefined);
    const [item, setItem] = useState(undefined);
    const [unit, setUnit] = useState(undefined);


    const handleSelectItemButtonPress = () => navigation.navigate('SelectItem');
    const handleSelectUnitButtonPress = () => navigation.navigate('SelectUnit');

    const handleAddInterestButtonPress = async () => {
        if (isEmpty(item)) {
            setErrorField('item');
            return setMessage(validateErrorsMessages.item);
        }
        if (isEmpty(unit)) {
            setErrorField('unit');
            return setMessage(validateErrorsMessages.unit);
        }
        const numberQuantity = parseInt(quantity, 10);
        if (isNaN(numberQuantity) || numberQuantity === 0) {
            setErrorField('quantity');
            return setMessage(validateErrorsMessages.quantity);
        }

    };

    useEffect(() => {
        if (isNotEmpty(message)) {
            setMessage('');
        }
    }, [quantity]);
    return (
        <S.Background source={background}>
            <S.Container>
                <S.Scroll>
                    {message ? (
                        <S.MessageBox>
                            <S.MessageText>{message}</S.MessageText>
                        </S.MessageBox>
                    ) : null}
                    <S.SelectItemButton onPress={handleSelectItemButtonPress}>
                        <S.SelectItemLabel>{item ? item : 'Selecionar item'}</S.SelectItemLabel>
                        <S.InputCircle>
                            <S.SelectItemIcon />
                        </S.InputCircle>
                    </S.SelectItemButton>
                    <S.SelectItemUnitButton onPress={handleSelectUnitButtonPress}>
                        <S.SelectItemLabel>{unit ? unit : 'Selecionar unidade'}</S.SelectItemLabel>
                        <S.InputCircle>
                            <S.SelectUnitIcon />
                        </S.InputCircle>
                    </S.SelectItemUnitButton>
                    <S.InputContainer error={errorField === 'quantity'}>
                        <S.InputCircle>
                            <S.QuantityIcon />
                        </S.InputCircle>
                        <S.QuantityInputField
                            onChangeText={setQuantity}
                            keyboardType="numeric" value={quantity}
                            placeholder={isPerformingAnyAction ? '' : 'Quantidade'}
                            returnKeyType="done" editable={!isPerformingAnyAction}
                            onSubmitEditing={handleAddInterestButtonPress}
                            ref={setQuantityField}
                            style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                        />
                    </S.InputContainer>
                    <S.AddItemButton onPress={handleAddInterestButtonPress}>
                        <S.AddItemCircle>
                            <S.AddItemIcon/>
                        </S.AddItemCircle>
                    </S.AddItemButton>
                  </S.Scroll>
            </S.Container>
        </S.Background>
    );
};
