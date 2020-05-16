import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Loading from '../components/Loading';
import * as S from '../styles/Login';
import {getData, storeData} from "../storage";
import {keys} from "../storage/Keys";
import {validEmail, validPassword, validUserToken} from "../constants/Validate";
import watermark from '../assets/watermark.png';
import logo from '../assets/logo.png';
import background from '../assets/background.png';
import {delay} from "../constants/Utils";
import routes from "../api/Routes";
import axios from "../api/index";

export default ({navigation: navigate}) => {
    return (
        <>
        </>
    );
};