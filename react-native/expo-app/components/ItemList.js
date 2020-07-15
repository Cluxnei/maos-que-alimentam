import React, {useCallback} from 'react';
import * as S from '../styles/Interests';
import {ItemNameIcon} from '../styles/AddInterest';

const render = ({item, index}, onPress) => (
    <S.ItemContainer key={index}>
        <S.EditItemButton onPress={() => onPress(item)}>
            <S.ItemCircle>
                <ItemNameIcon/>
            </S.ItemCircle>
        </S.EditItemButton>
        <S.ItemText>{item.name}</S.ItemText>
    </S.ItemContainer>
);

const keyExtractor = ({id}, index) => `${id}-${index}`;

export default ({items, onEditPress, navigation}) => {

    const handleAddItemButtonPress = useCallback(() => navigation.navigate('AddItem'), []);

    return (
        <S.Container>
            <S.List
                keyExtractor={keyExtractor}
                data={items}
                renderItem={(ri) => render(ri, onEditPress)}
            />
            <S.AddItemButton onPress={handleAddItemButtonPress}>
                <S.AddItemCircle>
                    <S.AddItemIcon/>
                </S.AddItemCircle>
            </S.AddItemButton>
        </S.Container>
    );
};
