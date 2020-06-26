import React from 'react';
import * as S from '../styles/Interests';

const render = ({item, index}, onEditPress) => (
    <S.ItemContainer key={index}>
        <S.EditItemButton onPress={() => onEditPress(item)}>
            <S.ItemCircle>
                <S.ItemIcon name="edit"/>
            </S.ItemCircle>
        </S.EditItemButton>

        <S.ItemText>{item.name}</S.ItemText>
    </S.ItemContainer>
);

const keyExtractor = ({id}, index) => `${id}-${index}`;

export default ({items, onEditPress}) => {
    return (
        <S.Container>
            <S.List
                keyExtractor={keyExtractor}
                data={items}
                renderItem={(ri) => render(ri, onEditPress)}
            />
        </S.Container>
    );
};
