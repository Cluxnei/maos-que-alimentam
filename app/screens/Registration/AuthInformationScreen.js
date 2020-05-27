import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {validEmail, validPassword} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import axios from '../../api/index';
import routes from "../../api/Routes";

export default ({navigation}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(undefined);
    const [passwordField, setPasswordField] = useState(undefined);
    const [confirmPasswordField, setConfirmPasswordField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    //#endregion
    //#region handlers
    const registerAccount = async () => {
        const registration = await getRegistration();
        try {
            const {data: {success, result: {user}}} = await axios.post(routes.register, registration);
            if (success) {
                return user;
            }
            return false;
        } catch (e) {
            return false;
        }
    };
    const loginRegisteredUser = async (user) => await Promise.all([
        storeData(keys.user, user),
        storeData(keys.token, user.token)
    ]);
    const checkEmail = async (email) => {
        try {
            const {data: {result, success}} = await axios.post(routes.checkEmail, {email});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };
    const handleEmailSubmitEditing = async () => {
        if (!validEmail((email || ''))) {
            return setMessage('Email inválido');
        }
        setIsPerformingAnyAction(true);
        startAnimation();
        const validatedEmail = await checkEmail(email);
        if (validatedEmail.error) {
            setIsPerformingAnyAction(false);
            return setMessage('Erro ao verificar e-mail. Verifique sua conexão.');
        }
        if (!validatedEmail.success) {
            setIsPerformingAnyAction(false);
            return setMessage(validatedEmail.result);
        }
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (passwordField) {
            passwordField.focus();
        }
    };
    const handlePasswordSubmitEditing = () => {
        if (!validPassword(password)) {
            setPassword('');
            return setMessage('Senha inválida');
        }
        if (confirmPasswordField) {
            confirmPasswordField.focus();
        }
    };
    const handleConfirmPasswordSubmitEditing = () => {
        if (!validPassword(confirmPassword)) {
            setConfirmPassword('');
            return setMessage('Senha inválida');
        }
        handleNextPress().done();
    };
    const handleNextPress = async () => {
        if (!validPassword(password) || !validPassword(confirmPassword) || !validEmail(email)) {
            return setMessage('Preencha corretamente os campos');
        }
        if (password !== confirmPassword) {
            if (confirmPasswordField) {
                confirmPasswordField.focus();
            }
            return setMessage('Senhas não correspondem');
        }
        startAnimation();
        setIsPerformingAnyAction(true);
        const validatedEmail = await checkEmail(email);
        if (validatedEmail.error) {
            setIsPerformingAnyAction(false);
            return setMessage('Erro ao verificar e-mail. Verifique sua conexão.');
        }
        if (!validatedEmail.success) {
            setIsPerformingAnyAction(false);
            return setMessage(validatedEmail.result);
        }
        await Promise.all([
            storeData(keys.registration.email, email),
            storeData(keys.registration.password, password)
        ]);
        const user = await registerAccount();
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!user) {
            return setMessage('Erro ao criar sua conta, tente novamente mais tarde.');
        }
        await loginRegisteredUser(user);
        navigation.navigate('Home', {reset: true});
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
        getRegistration().then(({email}) => {
            setEmail(email);
            setIsPerformingAnyAction(false);
        });
    };
    //#endregion
    useEffect(init, []);
    useEffect(() => {
        if (message !== '') {
            setMessage('');
        }
    }, [email, password, confirmPassword]);
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
                                    <S.EmailIcon />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setEmail} autoCompleteType="email"
                                    keyboardType="email-address" value={email}
                                    placeholder={isPerformingAnyAction ? '' : 'E-mail'}
                                    returnKeyType="next" editable={!isPerformingAnyAction}
                                    textContentType="emailAddress" onSubmitEditing={handleEmailSubmitEditing}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50,
                                    }
                                }>
                                    <S.PasswordIcon />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setPassword} autoCompleteType="password"
                                    clearTextOnFocus value={password}
                                    placeholder={isPerformingAnyAction ? '' : 'Senha'}
                                    onSubmitEditing={handlePasswordSubmitEditing} returnKeyType="next"
                                    secureTextEntry selectTextOnFocus textContentType="password"
                                    ref={setPasswordField} editable={!isPerformingAnyAction}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle style={
                                    {
                                        width: isPerformingAnyAction ? widthAnimation.interpolate({
                                            inputRange: [20, 100],
                                            outputRange: ['20%', '100%'],
                                        }) : 50,
                                    }
                                }>
                                    <S.ConfirmPasswordIcon />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setConfirmPassword} autoCompleteType="password"
                                    clearTextOnFocus value={confirmPassword}
                                    placeholder={isPerformingAnyAction ? '' : 'Confirmar senha'}
                                    onSubmitEditing={handleConfirmPasswordSubmitEditing} returnKeyType="done"
                                    secureTextEntry selectTextOnFocus textContentType="password"
                                    ref={setConfirmPasswordField} editable={!isPerformingAnyAction}
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
