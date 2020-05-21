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
    const handleCnpjSubmitEditing = () => {
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
        await Promise.all([
            storeData(keys.registration.name, name),
            storeData(keys.registration.cnpj, rawCnpj),
            storeData(keys.registration.phone, rawPhone),
            storeData(keys.registration.step, 'LocationInformation')
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
        getRegistration().then(({name, cnpj, phone, step}) => {
            setName(name);
            setCnpj(cnpj);
            setPhone(phone);
            setIsPerformingAnyAction(false);
            if (!step || step === 'BasicInformation') {
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
    }, [name]);
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
