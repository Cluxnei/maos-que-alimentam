import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {isEmpty, isNotEmpty, validateErrorsMessages, validCep} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import searchZipcode from 'cep-promise';

export default ({navigation}) => {
    /**
     * Local state
     */
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
    const [errorField, setErrorField] = useState('');

    /**
     * Perform request to find zipcode information
     * @param {string} zipcode
     * @returns {Promise<{error: boolean}|{city: string, street: string}>}
     */
    const findZipcode = async (zipcode) => {
        try {
            const {street, city} = await searchZipcode(zipcode);
            return {street, city};
        } catch (e) {
            return {error: true};
        }
    };
    /**
     * Validate zipcode and focus on street when zipcode keyboard
     * submit editing
     * @returns {Promise<void>}
     */
    const handleZipcodeSubmitEditing = async () => {
        setIsPerformingAnyAction(true);
        const rawZipcode = zipcodeField.getRawValue();
        if (!validCep(rawZipcode)) {
            setIsPerformingAnyAction(false);
            setErrorField('zipcode');
            if (zipcodeField) {
                zipcodeField.focus();
            }
            return setMessage(validateErrorsMessages.zipcode.invalid);
        }
        startAnimation();
        const location = await findZipcode(rawZipcode);
        await resetAnimation();
        if (location.error) {
            setIsPerformingAnyAction(false);
            setErrorField('zipcode');
            if (zipcodeField) {
                zipcodeField.focus();
            }
            return setMessage(validateErrorsMessages.zipcode.notFound);
        }
        setStreet(location.street);
        setCity(location.city);
        setIsPerformingAnyAction(false);
        if (streetField) {
            streetField.focus();
        }
    };
    /**
     * Focus on city when street keyboard submit editing
     */
    const handleStreetSubmitEditing = () => {
        if (cityField) {
            cityField.focus();
        }
    };
    /**
     * Link city keyboard submit editing with next button press
     * @returns {Promise<void>}
     */
    const handleCitySubmitEditing = async () => {
        await handleNextPress();
    };
    /**
     * Validate, save on storage and navigate to next registration step
     * @returns {Promise<void>}
     */
    const handleNextPress = async () => {
        setIsPerformingAnyAction(true);
        const rawZipcode = zipcodeField.getRawValue();
        if (!validCep(rawZipcode)) {
            setIsPerformingAnyAction(false);
            setErrorField('zipcode');
            if (zipcodeField) {
                zipcodeField.focus();
            }
            return setMessage(validateErrorsMessages.zipcode.invalid);
        }
        if (isEmpty(street)) {
            setIsPerformingAnyAction(false);
            setErrorField('street');
            if (streetField) {
                streetField.focus();
            }
            return setMessage(validateErrorsMessages.street);
        }
        if (isEmpty(city)) {
            setIsPerformingAnyAction(false);
            setErrorField('city');
            if (cityField) {
                cityField.focus();
            }
            return setMessage(validateErrorsMessages.city);
        }
        startAnimation();
        await Promise.all([
            storeData(keys.registration.zipcode, rawZipcode),
            storeData(keys.registration.street, street),
            storeData(keys.registration.city, city)
        ]);
        await delay(400);
        await resetAnimation();
        setIsPerformingAnyAction(false);
        navigation.navigate('AuthInformation');
    };
    /**
     * Start width animation
     */
    const startAnimation = () => {
        Animated.timing(widthAnimation, {
            toValue: 100,
            duration: 500,
        }).start();
    };
    /**
     * Revert width animation
     * @returns {Promise<void>}
     */
    const resetAnimation = async () => {
        Animated.timing(widthAnimation, {
            toValue: 20,
            duration: 400,
        }).start();
        await delay(400);
    };

    /**
     * Get previous saved information from storage and fill on local state
     */
    const getPreviousInformationFromStorage = () => {
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
    // Effects
    useEffect(getPreviousInformationFromStorage, []);
    /**
     * Clear message when fields changes
     */
    useEffect(() => {
        if (isNotEmpty(message)) {
            setMessage('');
        }
    }, [zipcode, street, city]);
    /**
     * Call zipcode keyboard submit editing when length in full filled
     */
    useEffect(() => {
        if (zipcodeField && notOnLoad && zipcodeField.getRawValue().length === 8) {
            handleZipcodeSubmitEditing().done()
        }
    }, [zipcode])

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
                            <S.InputContainer error={errorField === 'zipcode'}>
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
                            <S.InputContainer error={errorField === 'street'}>
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
                            <S.InputContainer error={errorField === 'city'}>
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
