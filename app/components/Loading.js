import React from 'react';
import * as S from '../styles/Loading';
import Colors from "../constants/Colors";

const {loadingColor} = Colors;

export default (props) => (<S.Loading {...props} color={loadingColor}/>);
