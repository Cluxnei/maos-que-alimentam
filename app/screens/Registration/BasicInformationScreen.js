import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from '../../storage';
import {keys} from '../../storage/Keys';
import {isEmpty, isNotEmpty, validateErrorsMessages, validPhone} from '../../constants/Validate';
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from '../../constants/Utils';
import {validateCnpj} from 'react-native-masked-text/lib/masks/cnpj.mask';
import axios from '../../api/index';
import routes from '../../api/Routes';

export default ({navigation}) => {
    /**
     * Local states
     */
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState(undefined);
    const [nameField, setNameField] = useState(undefined);
    const [cnpjField, setCnpjField] = useState(undefined);
    const [phoneField, setPhoneField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    const [errorField, setErrorField] = useState('');
    /**
     * Focus on cnpj field when name keyboard submit editing
     */
    const handleNameSubmitEditing = () => {
        if (cnpjField) {
            cnpjField.getElement().focus();
        }
    };
    /**
     * Perform an api request to verify if cnpj is already in use
     * @param {string} cnpj
     * @returns {Promise<{error: boolean}|{result, success}>}
     */
    const checkCnpj = async (cnpj) => {
        try {
            const {data: {success, result}} = await axios.post(routes.checkCnpj, {cnpj});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };

    /**
     * Perform an api request to verify if phone is already in use
     * @param phone
     * @returns {Promise<{error: boolean}|{result, success}>}
     */
    const checkPhone = async (phone) => {
        try {
            const {data: {success, result}} = await axios.post(routes.checkPhone, {phone});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };

    /**
     * Validate cnpj when keyboard submit editing
     * @returns {Promise<void>}
     */
    const handleCnpjSubmitEditing = async () => {
        const rawCnpj = cnpjField.getRawValue();
        if (!validateCnpj(rawCnpj)) {
            setErrorField('cnpj');
            if (cnpjField) {
                cnpjField.getElement().focus();
            }
            return setMessage(validateErrorsMessages.cnpj.invalid);
        }
        setIsPerformingAnyAction(true);
        startAnimation();
        const validCnpj = await checkCnpj(rawCnpj);
        await resetAnimation();
        if (validCnpj.error) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.cnpj.error);
        }
        if (!validCnpj.success) {
            setIsPerformingAnyAction(false);
            setErrorField('cnpj');
            if (cnpjField) {
                cnpjField.getElement().focus();
            }
            return setMessage(validCnpj.result);
        }
        setIsPerformingAnyAction(false);
        if (phoneField) {
            phoneField.getElement().focus();
        }
    };
    /**
     * Perform validations, save to storage and navigate to registration next step
     * @returns {Promise<void>}
     */
    const handleNextPress = async () => {
        setIsPerformingAnyAction(true);
        const rawCnpj = cnpjField.getRawValue();
        const rawPhone = phoneField.getRawValue();
        if (isEmpty(name)) {
            setIsPerformingAnyAction(false);
            setErrorField('name');
            if (nameField) {
                nameField.focus();
            }
            return setMessage(validateErrorsMessages.name);
        }
        if (!validateCnpj(rawCnpj)) {
            setIsPerformingAnyAction(false);
            setErrorField('cnpj');
            if (cnpjField) {
                cnpjField.getElement().focus();
            }
            return setMessage(validateErrorsMessages.cnpj.invalid);
        }
        if (!validPhone(rawPhone)) {
            setIsPerformingAnyAction(false);
            setErrorField('phone');
            if (phoneField) {
                phoneField.getElement().focus();
            }
            return setMessage(validateErrorsMessages.phone.invalid);
        }
        startAnimation();
        const validCnpj = await checkCnpj(rawCnpj);
        if (validCnpj.error) {
            setIsPerformingAnyAction(false);
            setErrorField('cnpj');
            if (cnpjField) {
                cnpjField.getElement().focus();
            }
            return setMessage(validateErrorsMessages.cnpj.error);
        }
        if (!validCnpj.success) {
            setIsPerformingAnyAction(false);
            setErrorField('cnpj');
            if (cnpjField) {
                cnpjField.getElement().focus();
            }
            return setMessage(validCnpj.result);
        }
        const validCelPhone = await checkPhone(rawPhone);
        if (validCelPhone.error) {
            setIsPerformingAnyAction(false)
            setErrorField('phone');
            if (phoneField) {
                phoneField.getElement().focus();
            }
            return setMessage(validateErrorsMessages.phone.error);
        }
        if (!validCelPhone.success) {
            setIsPerformingAnyAction(false);
            setErrorField('phone');
            if (phoneField) {
                phoneField.getElement().focus();
            }
            return setMessage(validCelPhone.result);
        }
        await Promise.all([
            storeData(keys.registration.name, name),
            storeData(keys.registration.cnpj, rawCnpj),
            storeData(keys.registration.phone, rawPhone)
        ]);
        await resetAnimation();
        setIsPerformingAnyAction(false);
        navigation.navigate('LocationInformation');
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
        getRegistration().then(({name, cnpj, phone}) => {
            setName(name);
            setCnpj(cnpj);
            setPhone(phone);
            setIsPerformingAnyAction(false);
        });
    };
    // Effects
    useEffect(getPreviousInformationFromStorage, []);
    /**
     * Clear message when fields changes
     */
    useEffect(() => {
        if (isNotEmpty(errorField)) {
            setErrorField('');
        }
        if (isNotEmpty(message)) {
            setMessage('');
        }
    }, [name, cnpj, phone]);
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
                            <S.InputContainer error={errorField === 'name'}>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.NameIcon />
                                </S.InputCircle>
                                <S.InputField
                                    ref={setNameField}
                                    onChangeText={setName} autoCompleteType="name"
                                    keyboardType="default" value={name}
                                    placeholder={isPerformingAnyAction ? '' : 'Nome da entidade'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="organizationName" onSubmitEditing={handleNameSubmitEditing}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer error={errorField === 'cnpj'}>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.CnpjIcon />
                                </S.InputCircle>
                                <S.CnpjInputField
                                    onChangeText={(text) => setCnpj(text)} autoCompleteType="off"
                                    keyboardType="numeric" value={cnpj} autoCaptalize="none"
                                    placeholder={isPerformingAnyAction ? '' : 'CNPJ'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="none" onSubmitEditing={handleCnpjSubmitEditing}
                                    ref={setCnpjField}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer error={errorField === 'phone'}>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50
                                    }
                                }>
                                    <S.PhoneIcon />
                                </S.InputCircle>
                                <S.PhoneInputField
                                    onChangeText={(text) => setPhone(text)} autoCompleteType="tel"
                                    keyboardType="numeric" value={phone} autoCaptalize="none"
                                    placeholder={isPerformingAnyAction ? '' : 'Celular'}
                                    returnKeyType="done" editable={!isPerformingAnyAction}
                                    textContentType="telephoneNumber" onSubmitEditing={handleNextPress}
                                    ref={setPhoneField}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
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
