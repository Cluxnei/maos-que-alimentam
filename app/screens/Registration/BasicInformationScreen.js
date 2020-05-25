import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {validNotEmpty, validPhone} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import {validateCnpj} from "react-native-masked-text/lib/masks/cnpj.mask";
import axios from '../../api/index';
import routes from '../../api/Routes';

export default ({navigation}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState(undefined);
    const [cnpjField, setCnpjField] = useState(undefined);
    const [phoneField, setPhoneField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    //#endregion
    //#region handlers
    const handleNameSubmitEditing = () => {
        if (cnpjField) {
            cnpjField.getElement().focus();
        }
    };
    const checkCnpj = async (cnpj) => {
        try {
            const {data: {success, result}} = await axios.post(routes.checkCnpj, {cnpj});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };
    const checkPhone = async (phone) => {
        try {
            const {data: {success, result}} = await axios.post(routes.checkPhone, {phone});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };
    const handleCnpjSubmitEditing = async () => {
        const rawCnpj = cnpjField.getRawValue();
        if (!validateCnpj(rawCnpj)) {
            return setMessage('CNPJ inválido.');
        }
        setIsPerformingAnyAction(true);
        startAnimation();
        checkCnpj(rawCnpj).then(async ({success, result, error}) => {
            await resetAnimation();
            if (error) {
                setIsPerformingAnyAction(false);
                return setMessage('Erro ao verificar CNPJ. Verifique sua conexão.');
            }
            if (!success) {
                setIsPerformingAnyAction(false);
                return setMessage(result);
            }
        });
        setIsPerformingAnyAction(false);
        if (phoneField) {
            phoneField.getElement().focus();
        }
    };
    const handleNextPress = async () => {
        setIsPerformingAnyAction(true);
        const rawCnpj = cnpjField.getRawValue();
        const rawPhone = phoneField.getRawValue();
        if (!validateCnpj(rawCnpj) || !validPhone(rawPhone) || !validNotEmpty(name)) {
            setIsPerformingAnyAction(false);
            return setMessage('Preencha corretamente os campos');
        }
        startAnimation();
        const validCnpj = await checkCnpj(rawCnpj);
        if (validCnpj.error) {
            setIsPerformingAnyAction(false);
            return setMessage('Erro ao verificar CNPJ. Verifique sua conexão.');
        }
        if (!validCnpj.success) {
            setIsPerformingAnyAction(false);
            return setMessage(validCnpj.result);
        }
        const validCelPhone = await checkPhone(rawPhone);
        if (validCelPhone.error) {
            setIsPerformingAnyAction(false);
            return setMessage('Erro ao verificar celular. Verifique sua conexão.');
        }
        if (!validCelPhone.success) {
            setIsPerformingAnyAction(false);
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
        getRegistration().then(({name, cnpj, phone}) => {
            setName(name);
            setCnpj(cnpj);
            setPhone(phone);
            setIsPerformingAnyAction(false);
        });
    };
    //#endregion
    useEffect(init, []);
    useEffect(() => {
        if (message !== '') {
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
                            <S.InputContainer>
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
                                    onChangeText={setName} autoCompleteType="name"
                                    keyboardType="default" value={name}
                                    placeholder={isPerformingAnyAction ? '' : 'Nome da entidade'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="organizationName" onSubmitEditing={handleNameSubmitEditing}
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
                                    <S.CnpjIcon />
                                </S.InputCircle>
                                <S.CnpjInputField
                                    onChangeText={(text) => setCnpj(text)} autoCompleteType="off"
                                    keyboardType="numeric" value={cnpj}
                                    placeholder={isPerformingAnyAction ? '' : 'CNPJ'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="none" onSubmitEditing={handleCnpjSubmitEditing}
                                    ref={setCnpjField}
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
                                    <S.PhoneIcon />
                                </S.InputCircle>
                                <S.PhoneInputField
                                    onChangeText={(text) => setPhone(text)} autoCompleteType="tel"
                                    keyboardType="numeric" value={phone}
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
