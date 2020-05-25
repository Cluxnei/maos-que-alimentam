import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {validCep, validNotEmpty} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import searchZipcode from 'cep-promise';

export default ({navigation}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState(undefined);
    const [zipcodeField, setZipcodeField] = useState(undefined);
    const [streetField, setStreetField] = useState(undefined);
    const [cityField, setCityField] = useState(undefined);
    const [notOnLoad, setNotOnLoad] = useState(true);
    const [widthAnimation] = useState(new Animated.Value(20));
    //#endregion
    //#region handlers
    const findZipcode = async (zipcode) => {
        try {
            const {street, city} = await searchZipcode(zipcode);
            return {street, city};
        } catch (e) {
            return {error: true};
        }
    };
    const handleZipcodeSubmitEditing = async () => {
        setIsPerformingAnyAction(true);
        const rawZipcode = zipcodeField.getRawValue();
        if (!validCep(rawZipcode)) {
            setIsPerformingAnyAction(false);
            return setMessage('Cep inválido');
        }
        startAnimation();
        const location = await findZipcode(rawZipcode);
        await resetAnimation();
        if (location.error) {
            setIsPerformingAnyAction(false);
            return setMessage('Cep não encontrado, insira os dados manualmente.');
        }
        setStreet(location.street);
        setCity(location.city);
        setIsPerformingAnyAction(false);
        if (streetField) {
            streetField.focus();
        }
    };
    const handleStreetSubmitEditing = () => {
        if (cityField) {
            cityField.focus();
        }
    };
    const handleCitySubmitEditing = async () => {
        await handleNextPress();
    };
    const handleNextPress = async () => {
        setIsPerformingAnyAction(true);
        const rawZipcode = zipcodeField.getRawValue();
        if (!validCep(rawZipcode)) {
            setIsPerformingAnyAction(false);
            return setMessage('CEP Inválido!');
        }
        if (!validNotEmpty(street) || !validNotEmpty(city)) {
            setIsPerformingAnyAction(false);
            return setMessage('Dados incorretos!');
        }
        startAnimation();
        await Promise.all([
            storeData(keys.registration.zipcode, rawZipcode),
            storeData(keys.registration.street, street),
            storeData(keys.registration.city, city)
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
        setNotOnLoad(false);
        getRegistration().then(({zipcode, street, city}) => {
            setZipcode(zipcode);
            setStreet(street);
            setCity(city);
            setIsPerformingAnyAction(false);
            setNotOnLoad(true);
        });
    };
    //#endregion
    useEffect(init, []);
    useEffect(() => {
        if (message !== '') {
            setMessage('');
        }
    }, [zipcode, street, city]);
    useEffect(() => {
        if (zipcodeField && notOnLoad && zipcodeField.getRawValue().length === 8) {
            handleZipcodeSubmitEditing().done()
        }
    }, [zipcode])
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
                                    <S.ZipcodeIcon />
                                </S.InputCircle>
                                <S.CepInputField
                                    onChangeText={(text) => setZipcode(text)} autoCompleteType="postal-code"
                                    value={zipcode} placeholder={isPerformingAnyAction ? '' : 'CEP'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="postalCode" ref={setZipcodeField} onSubmitEditing={handleZipcodeSubmitEditing}
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
                                    onChangeText={setStreet} autoCompleteType="street-address"
                                    keyboardType="default" value={street}
                                    placeholder={isPerformingAnyAction ? '' : 'Logradouro'}
                                    returnKeyType="done" editable={!isPerformingAnyAction}
                                    textContentType="streetAddressLine1" ref={setStreetField}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                    onSubmitEditing={handleStreetSubmitEditing}
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
