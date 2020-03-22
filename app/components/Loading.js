import React from 'react';
import * as S from '../styles/Loading';
import Colors from "../constants/Colors";

const {loadingColor} = Colors;
const size = 100;

export default (props) => (
    <S.Container>
        <S.Loading {...props} size={size} color={loadingColor}/>
    </S.Container>
);
