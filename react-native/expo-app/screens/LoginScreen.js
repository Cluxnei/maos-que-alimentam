import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../components/Loading';
import * as S from '../styles/Login';
import {getData, storeData} from "../storage";
import {keys} from "../storage/Keys";
import {
    isEmpty,
    isNotEmpty,
    validateErrorsMessages,
    validEmail,
    validUserToken
} from '../constants/Validate';
import {delay} from '../constants/Utils';
import routes from '../api/Routes';
import axios from '../api/index';

// TODO Adicionar labels com os passos do cadastro

export default ({navigation, route}) => {
    /**
     * Local states
     */
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(undefined);
    const [passwordField, setPasswordField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    /**
     * When email keyboard submit editing
     */
    const handleEmailSubmitEditing = () => {
        if (passwordField) {
            passwordField.focus();
        }
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
     * Attempt login request with credentials
     * @param {string} email
     * @param {string} password
     * @returns {Promise<boolean|{result, success}>}
     */
    const attemptLogin = async (email, password) => {
        try {
            const {
                data: {success, result}
            } = await axios.post(routes.login, {email, password});
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    /**
     * Attempt and validate credentials
     * @returns {Promise<void>}
     */
    const attemptCredentials = async () => {
        setIsPerformingAnyAction(true);
        setMessage('');
        if (!validEmail(email)) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.email.invalid);
        }
        if (isEmpty(password)) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.password.empty);
        }
        startAnimation();
        const loginResponse = await attemptLogin(email.trim(), password.trim());
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!loginResponse) {
            return setMessage(validateErrorsMessages.login.fail);
        }
        const {success, result} = loginResponse;
        if (!success) {
            return setMessage(result);
        }
        const {user, token: accessToken} = result;
        if (!validUserToken(user, accessToken)) {
            return setMessage(validateErrorsMessages.userAndToken);
        }
        await Promise.all([storeData(keys.token, accessToken), storeData(keys.user, user)]);
        await loginUser();
    };

    /**
     * Check if user and token is valid and navigate to home if valid
     * with reset parameter
     * @returns {Promise<void|WindowClient|null>}
     */
    const loginUser = async () => {
        const [token, user] = await Promise.all([getData(keys.token), getData(keys.user)]);
        if (validUserToken(user, token)) {
            return navigation.navigate('Home', {reset: true});
        }
    };
    /**
     * Login user if previous logged in
     * @returns {function(): void}
     */
    const loginPreviousLoggedUser = () => {
        let mounted = true;
        if (mounted) {
            setIsPerformingAnyAction(true);
            loginUser().then(() => {
                if (mounted) {
                    setIsPerformingAnyAction(false)
                }
            });
        }
        return () => {
            mounted = false;
        };
    };
    /**
     * Navigate to forgot password screen when button press
     * @returns {Promise<WindowClient | null>}
     */
    const handleForgotPasswordPress = () => navigation.navigate('ForgotPassword', {email});
    /**
     * Navigate to register screen when button press
     * @returns {Promise<WindowClient | null>}
     */
    const handleSingUpPress = () => navigation.navigate('BasicInformation');
    // Effects
    useEffect(loginPreviousLoggedUser, []);
    /**
     * Clear message when email or password changes
     */
    useEffect(() => {
        if (isNotEmpty(message)) {
            setMessage('');
        }
    }, [email, password]);

    useEffect(() => {
        if (isNotEmpty(route.params) && isNotEmpty(route.params.email) && isNotEmpty(route.params.password)) {
            setEmail(route.params.email);
            setPassword(route.params.password);
            loginPreviousLoggedUser();
        }
    }, [navigation, route]);

    return (
        <S.Container>
            <S.Background>
                <S.scroll>
                    <S.Header/>
                    <S.body>
                        <S.Logo/>
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
                                    <S.InputIcon name="user" />
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setEmail} autoCompleteType="email"
                                    autoCapitalize="none" keyboardType="email-address"
                                    value={email} placeholder={isPerformingAnyAction ? '' : 'E-mail'}
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
                                    <S.InputIcon name="lock"/>
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setPassword} autoCompleteType="password"
                                    clearTextOnFocus value={password} autoCapitalize="none"
                                    placeholder={isPerformingAnyAction ? '' : 'Senha'}
                                    onSubmitEditing={attemptCredentials} returnKeyType="done"
                                    secureTextEntry selectTextOnFocus textContentType="password"
                                    ref={setPasswordField} editable={!isPerformingAnyAction}
                                    style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                                />
                            </S.InputContainer>
                            <S.InputContainer submit>
                                <S.SubmitButton onPress={attemptCredentials} disabled={isPerformingAnyAction}>
                                    {!isPerformingAnyAction ?
                                        (<S.SubmitButtonText>LOGIN</S.SubmitButtonText>) :
                                        (<S.LoadingContainer>
                                            <S.SubmitButtonText>CARREGANDO</S.SubmitButtonText>
                                            <Loading/>
                                        </S.LoadingContainer>)
                                    }
                                </S.SubmitButton>
                            </S.InputContainer>
                        </S.DataContainer>
                        <S.LinksContainer>
                            <S.SingUpContainer>
                                <S.QuestionText>Não tem uma conta?</S.QuestionText>
                                <S.SingUpButton onPress={handleSingUpPress}>
                                    <S.SingUpButtonText>
                                        Cadastre-se
                                    </S.SingUpButtonText>
                                </S.SingUpButton>
                            </S.SingUpContainer>
                            <S.ForgotPasswordButton onPress={handleForgotPasswordPress}>
                                <S.ForgotPasswordButtonText>
                                    Esqueceu sua senha?
                                </S.ForgotPasswordButtonText>
                            </S.ForgotPasswordButton>
                        </S.LinksContainer>
                    </S.body>
                </S.scroll>
            </S.Background>
        </S.Container>
    );
};