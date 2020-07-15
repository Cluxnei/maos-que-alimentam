import React, {useCallback} from 'react';
import * as S from '../styles/Interests';

const render = ({item, index}, onEditPress) => (
    <S.ItemContainer key={index}>
        <S.EditItemButton onPress={() => onEditPress(item)}>
            <S.ItemCircle>
                <S.ItemIcon/>
            </S.ItemCircle>
        </S.EditItemButton>
        <S.ItemText>{item.name}</S.ItemText>
    </S.ItemContainer>
);

const keyExtractor = ({id}, index) => `${id}-${index}`;

export default ({items, onEditPress, navigation}) => {

    const handleAddItemButtonPress = useCallback(() => navigation.navigate('AddInterest'), []);

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
