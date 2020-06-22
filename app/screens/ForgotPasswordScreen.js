import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../components/Loading';
import * as S from '../styles/ForgotPassword';
import {isNotEmpty, validateErrorsMessages, validEmail} from '../constants/Validate';
import logo from '../assets/logo.png';
import background from '../assets/background.png';
import {delay} from '../constants/Utils';
import routes from '../api/Routes';
import axios from '../api/index';
import messages from '../constants/Messages';

export default ({route, navigation}) => {
    /**
     * States
     */
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [email, setEmail] = useState(route.params.email || '');
    const [message, setMessage] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));
    /**
     * Attempt credentials when email keyboard submit editing
     * @returns {Promise<void>}
     */
    const handleEmailSubmitEditing = async () => {
        await attemptCredentials();
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
     * Attempt reset password request
     * @param {string} email
     * @returns {Promise<boolean|{result, success}>}
     */
    const attemptForgotPassword = async (email) => {
        try {
            const {data: {success, result}} = await axios.post(routes.forgotPassword, {email});
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    /**
     * Attempt and validade credentials
     * @returns {Promise<void>}
     */
    const attemptCredentials = async() => {
        setIsPerformingAnyAction(true);
        setMessage('');
        if (!validEmail(email)) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.email);
        }
        startAnimation();
        const forgotPasswordResponse = await attemptForgotPassword(email.trim());
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!forgotPasswordResponse) {
            return setMessage(validateErrorsMessages.checkConnection);
        }
        const {success, result} = forgotPasswordResponse;
        if (!success) {
            return setMessage(result);
        }
        return setMessage(messages.passwordRecovered);
    };
    /**
     * Navigate to register screen when button press
     * @returns {Promise<WindowClient | null>}
     */
    const handleSingUpPress = () => navigation.navigate('BasicInformation');
    /**
     * Clear message when email changes
     */
    useEffect(() => {
        if (isNotEmpty(message)) {
            setMessage('');
        }
    }, [email]);
    //#region render
    return (
        <S.Container>
            <S.Background source={background}>
                <S.scroll>
                    <S.Header />
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
                            <S.InputContainer submit>
                                <S.SubmitButton onPress={attemptCredentials} disabled={isPerformingAnyAction}>
                                    {!isPerformingAnyAction ?
                                        (<S.SubmitButtonText>SOLICITAR NOVA SENHA</S.SubmitButtonText>) :
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
                        </S.LinksContainer>
                    </S.body>
                </S.scroll>
            </S.Background>
        </S.Container>
    );
    //#endregion
};
