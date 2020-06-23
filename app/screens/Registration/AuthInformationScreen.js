import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import Loading from '../../components/Loading';
import * as S from '../../styles/Registration';
import {storeData} from "../../storage";
import {keys} from "../../storage/Keys";
import {isNotEmpty, validateErrorsMessages, validEmail, validPassword} from "../../constants/Validate";
import logo from '../../assets/logo.png';
import background from '../../assets/background.png';
import {delay, getRegistration} from "../../constants/Utils";
import axios from '../../api/index';
import routes from "../../api/Routes";

export default ({navigation}) => {
    /**
     * Local states
     */
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(undefined);
    const [passwordField, setPasswordField] = useState(undefined);
    const [confirmPasswordField, setConfirmPasswordField] = useState(undefined);
    const [widthAnimation] = useState(new Animated.Value(20));

    /**
     * Perform register account request
     * @returns {Promise<boolean>}
     */
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
    /**
     * Save user and token to storage
     * @param user
     * @returns {Promise<boolean[]>}
     */
    const loginRegisteredUser = async (user) => await Promise.all([
        storeData(keys.user, user),
        storeData(keys.token, user.token)
    ]);

    /**
     * Perform api request to check if email is already in use
     * @param {string} email
     * @returns {Promise<{error: boolean}|{result, success}>}
     */
    const checkEmail = async (email) => {
        try {
            const {data: {result, success}} = await axios.post(routes.checkEmail, {email});
            return {success, result};
        } catch (e) {
            return {error: true};
        }
    };

    /**
     * Validate email and focus on password
     * @returns {Promise<void>}
     */
    const handleEmailSubmitEditing = async () => {
        if (!validEmail((email || ''))) {
            return setMessage(validateErrorsMessages.email.invalid);
        }
        setIsPerformingAnyAction(true);
        startAnimation();
        const validatedEmail = await checkEmail(email);
        if (validatedEmail.error) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.email.error);
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
    /**
     * Validate password and focus on confirm password when password keyboard submit editing
     */
    const handlePasswordSubmitEditing = () => {
        if (!validPassword(password)) {
            setPassword('');
            return setMessage(validateErrorsMessages.password.rules);
        }
        if (confirmPasswordField) {
            confirmPasswordField.focus();
        }
    };
    /**
     * Validate confirmed password and handle next button press
     * when confirm password keyboard submit editing
     * @returns {Promise<void>}
     */
    const handleConfirmPasswordSubmitEditing = async () => {
        if (!validPassword(confirmPassword)) {
            setConfirmPassword('');
            return setMessage(validateErrorsMessages.password.rules);
        }
        await handleNextPress();
    };

    /**
     * Perform validations, save to storage and navigate to home screen
     * @returns {Promise<void>}
     */
    const handleNextPress = async () => {
        if (!validEmail(email)) {
            return setMessage(validateErrorsMessages.email.invalid);
        }
        if (!validPassword(password)) {
            return setMessage(validateErrorsMessages.password.rules);
        }
        if (!validPassword(confirmPassword)) {
            return setMessage(validateErrorsMessages.password.rules);
        }
        if (password !== confirmPassword) {
            if (confirmPasswordField) {
                confirmPasswordField.focus();
            }
            return setMessage(validateErrorsMessages.password.notMatch);
        }
        startAnimation();
        setIsPerformingAnyAction(true);
        const validatedEmail = await checkEmail(email);
        if (validatedEmail.error) {
            setIsPerformingAnyAction(false);
            return setMessage(validateErrorsMessages.email.error);
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
        console.log(user);
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!user) {
            return setMessage(validateErrorsMessages.accountRegistration);
        }
        await loginRegisteredUser(user);
        navigation.navigate('Home', {reset: true});
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
        getRegistration().then(({email}) => {
            setEmail(email);
            setIsPerformingAnyAction(false);
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
    }, [email, password, confirmPassword]);

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
                                    keyboardType="email-address" value={email} autoCapitalize="none"
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
