import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {validCep} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import searchCep from 'cep-promise';

export default ({navigation}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState(undefined);
    const [cepField, setCepField] = useState(undefined);
    const [logradouroField, setLogradouroField] = useState(undefined);
    const [cityField, setCityField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    //#endregion
    //#region handlers
    const handleCepSubmitEditing = async () => {
        setIsPerformingAnyAction(true);
        try {
            const rawCep = cepField.getRawValue();
            if (!validCep(rawCep)) {
                setIsPerformingAnyAction(false);
                return setMessage('Cep inválido');
            }
            const {street: s, city: c} = await searchCep(rawCep);
            setLogradouro(s);
            setCity(c);
        } catch (e) {
            setMessage('Cep não encontrado, insira os dados manualmente.')
        }
        setIsPerformingAnyAction(false);
        if (logradouroField) {
            logradouroField.focus();
        }
    };
    const handleLogradouroSubmitEditing = () => {
        if (cityField) {
            cityField.focus();
        }
    };
    const handleCitySubmitEditing = async () => {
        await handleNextPress();
    };
    const handleNextPress = async () => {
        setIsPerformingAnyAction(true);
        const rawCep = cepField.getRawValue();
        if (!validCep(rawCep)) {
            setIsPerformingAnyAction(false);
            return setMessage('Preencha corretamente os campos');
        }
        startAnimation();
        await Promise.all([
            storeData(keys.registration.cep, rawCep),
            storeData(keys.registration.logradouro, logradouro),
            storeData(keys.registration.city, city),
            storeData(keys.registration.step, 'AuthInformation')
        ]);
        await resetAnimation();
        setIsPerformingAnyAction(false);
        navigation.navigate('AuthInformation');
    };
    //#endregion
    //#region animation methods
    const startAnimation = () => {
        Animated.timing(widthAnimation, {
            toValue: 100,
            duration: 500,
        }).start();
    };
    const resetAnimation = async () => {
        Animated.timing(widthAnimation, {
            toValue: 20,
            duration: 400,
        }).start();
        await delay(400);
    };
    //#endregion
    //#region methods

    const init = () => {
        setIsPerformingAnyAction(true);
        getRegistration().then(({cep, logradouro, city, step}) => {
            setCep(cep);
            setLogradouro(logradouro);
            setCity(city);
            setIsPerformingAnyAction(false);
            if (!step || step === 'LocationInformation') {
                return;
            }
            navigation.navigate(step);
        });
    };
    //#endregion
    useEffect(init, []);
    useEffect(() => {
        if (message !== '') {
            setMessage('');
        }
    }, [cep, logradouro, city]);
    //#region render
    return (
        <S.Container>
            <S.Background source={background}>
                <S.scroll>
                    <S.body>
                        <S.Logo source={logo}/>
                        <S.DataContainer>
                            {message ? (
                                <S.MessageBox>
                                    <S.MessageText>{message}</S.MessageText>
                                </S.MessageBox>
                            ) : null}
                            <S.InputContainer>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.CepIcon />
                                </S.InputCircle>
                                <S.CepInputField
                                    onChangeText={(text) => setCep(text)} autoCompleteType="postal-code"
                                    value={cep} placeholder={isPerformingAnyAction ? '' : 'CEP'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="postalCode" ref={setCepField} onSubmitEditing={handleCepSubmitEditing}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.StreetIcon />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setLogradouro} autoCompleteType="street-address"
                                    keyboardType="default" value={logradouro}
                                    placeholder={isPerformingAnyAction ? '' : 'Logradouro'}
                                    returnKeyType="done" editable={!isPerformingAnyAction}
                                    textContentType="streetAddressLine1" ref={setLogradouroField}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                    onSubmitEditing={handleLogradouroSubmitEditing}
                                />
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.CityIcon />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setCity} autoCompleteType="off"
                                    keyboardType="default" value={city}
                                    placeholder={isPerformingAnyAction ? '' : 'Cidade'}
                                    returnKeyType="done" editable={!isPerformingAnyAction}
                                    textContentType="addressCity" ref={setCityField}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                    onSubmitEditing={handleCitySubmitEditing}
                                />
                            </S.InputContainer>
                            <S.InputContainer submit>
                                <S.SubmitButton onPress={handleNextPress} disabled={isPerformingAnyAction}>
                                    {!isPerformingAnyAction ?
                                        (<S.SubmitButtonText>PRÓXIMO</S.SubmitButtonText>) :
                                        (<S.LoadingContainer>
                                            <S.SubmitButtonText>CARREGANDO</S.SubmitButtonText>
                                            <Loading/>
                                        </S.LoadingContainer>)
                                    }
                                </S.SubmitButton>
                            </S.InputContainer>
                        </S.DataContainer>
                    </S.body>
                </S.scroll>
            </S.Background>
        </S.Container>
    );
    //#endregion
};
