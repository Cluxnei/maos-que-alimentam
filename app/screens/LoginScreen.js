import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
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

export default (props) => {
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
     * @param email
     * @param password
     * @returns {Promise<boolean|{result, success}>}
     */
    const attemptLogin = async (email, password) => {
        try {
            const {data: {success, result}} = await axios.post(routes.login, {email, password});
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    /**
     * Attempt and validate credentials
     * @returns {Promise<void>}
     */
    const attemptCredentials = async() => {
        setIsPerformingAnyAction(true);
        setMessage('');
        if (!validEmail(email) || !validPassword(password)) {
            setIsPerformingAnyAction(false);
            return setMessage('Ops... preencha corretamente os campos');
        }
        startAnimation();
        const loginResponse = await attemptLogin(email.trim(), password.trim());
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!loginResponse) {
            return setMessage('Ops... erro ao efetuar login, verifique sua conexão.');
        }
        const {success, result} = loginResponse;
        if (!success) {
            return setMessage(result);
        }
        const {user, token: accessToken} = result;
        if (!validUserToken(user, accessToken)) {
            return setMessage('Ops... faça login novamente por favor.');
        }
        await Promise.all([storeData(keys.token, accessToken), storeData(keys.user, user)]);
        await loginUser();
    };
    const loginUser = async () => {
        const [token, user] = await Promise.all([getData(keys.token), getData(keys.user)]);
        if (validUserToken(user, token)) {
            return props.navigation.navigate('Home', {reset: true});
        }
    };
    const init = () => {
        setIsPerformingAnyAction(true);
        loginUser().then(() => setIsPerformingAnyAction(false));
    };
    const handleForgotPasswordPress = () => props.navigation.navigate('ForgotPassword', {email});
    const handleSingUpPress = () => props.navigation.navigate('BasicInformation');
    useEffect(init, []);
    useEffect(() => {
        if (message !== '') {
            setMessage('');
        }
    }, [email, password]);
    return (
        <S.Container>
            <S.Background source={background}>
                <S.scroll>
                    <S.Header resizeMode="stretch" source={watermark}/>
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
                                    <S.InputIcon name="user"/>
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
                                    <S.InputIcon name="lock"/>
                                </S.InputCircle>
                                <S.InputField
                                    onChangeText={setPassword} autoCompleteType="password"
                                    clearTextOnFocus value={password}
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
