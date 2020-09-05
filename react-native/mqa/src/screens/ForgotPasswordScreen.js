import React, {useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as S from '../styles/Login';
import {showMessage, delay} from '../services/helpers';
import {validateErrorsMessages, validEmail} from '../constants/validation';
import api from '../services/api';
import routes from '../services/api/routes';
import {setUser} from '../storage/actions';
import {messages} from '../constants/messages';

export default ({navigation}) => {
    // Redux state
    const dispatch = useDispatch();
    const {user} = useSelector(({UserReducer}) => UserReducer);
    // Local state
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    const [widthAnimation] = useState(new Animated.Value(20));
    // Animations
    const startAnimation = () => {
        Animated.timing(widthAnimation, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    const resetAnimation = async () => {
        Animated.timing(widthAnimation, {
            toValue: 20,
            duration: 400,
            useNativeDriver: false,
        }).start();
        await delay(400);
    };
    // Handlers
    const handleEmailChangeText = email => dispatch(setUser({...user, email}));
    const handleEmailSubmitEditing = async () => {
        await attemptCredentials();
    };
    const handleSingUpPress = () => navigation.navigate('BasicInformation');
    // Methods
    const attemptForgotPassword = async (email) => {
        try {
            const {data: {success, result}} = await api.post(routes.forgotPassword, {email});
            return {success, result};
        } catch (e) {
            return false;
        }
    };
    const attemptCredentials = async() => {
        setIsPerformingAnyAction(true);
        if (!validEmail(user.email.trim())) {
            setIsPerformingAnyAction(false);
            return showMessage(validateErrorsMessages.email.invalid);
        }
        startAnimation();
        const forgotPasswordResponse = await attemptForgotPassword(user.email.trim());
        await resetAnimation();
        setIsPerformingAnyAction(false);
        if (!forgotPasswordResponse) {
            return showMessage(validateErrorsMessages.checkConnection);
        }
        const {success, result} = forgotPasswordResponse;
        if (!success) {
            return showMessage(result);
        }
        return showMessage(messages.passwordRecovered, 'success');
    };
    // Render
    return (
        <S.Container>
            <S.scroll>
                <S.body>
                    <S.Logo/>
                    <S.DataContainer>
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
                                onChangeText={handleEmailChangeText} autoCompleteType="email"
                                keyboardType="email-address" value={user.email}
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
        </S.Container>
    );
};
