import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../components/Loading';
import * as S from '../styles/Login';
import {validEmail} from "../constants/Validate";
import watermark from '../assets/watermark.png';
import logo from '../assets/logo.png';
import background from '../assets/background.png';
import {delay} from "../constants/Utils";
import routes from "../api/Routes";
import axios from "../api/index";

export default ({route, navigation}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [email, setEmail] = useState(route.params.email || '');
    const [message, setMessage] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    //#endregion
    //#region handlers
    const handleEmailSubmitEditing = async () => {
        await attemptCredentials();
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
    const attemptForgotPassword = async (email) => {
        try {
            const {data: {success, result}} = await axios.post(routes.forgotPassword, {email});
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    const attemptCredentials = async() => {
        setIsPerformingAnyAction(true);
        setMessage('');
        if (!validEmail(email)) {
            setIsPerformingAnyAction(false);
            return setMessage('Ops... preencha corretamente os campos');
        }
        startAnimation();
        const forgotPasswordResponse = await attemptForgotPassword(email.trim());
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!forgotPasswordResponse) {
            return setMessage('Ops... verifique sua conexão.');
        }
        const {success, result} = forgotPasswordResponse;
        if (!success) {
            return setMessage(result);
        }
        return setMessage('Enviamos uma nova senha em seu email');
    };
    useEffect(() => {
        if (message !== '') {
            setMessage('');
        }
    }, [email]);
    //#region render
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
                                <S.SingUpButton>
                                    <S.SingUpButtonText>
                                        Cadastre-se
                                    </S.SingUpButtonText>
                                </S.SingUpButton>
                            </S.SingUpContainer>
                            <S.ForgotPasswordButton>
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
    //#endregion
};
