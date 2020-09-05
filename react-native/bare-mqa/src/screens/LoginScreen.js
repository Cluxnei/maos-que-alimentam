import React, {useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as S from '../styles/Login';
import {isEmptyOrFalse, showMessage, delay} from '../services/helpers';
import {validateErrorsMessages, validEmail} from '../constants/validation';
import api from '../services/api';
import routes from '../services/api/routes';
import {setUser} from '../storage/actions';

export default ({navigation}) => {
  // Redux state
  const dispatch = useDispatch();
  const {user} = useSelector(({UserReducer}) => UserReducer);
  // Local state
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [passwordField, setPasswordField] = useState(undefined);
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
  const handlePasswordChangeText = password => dispatch(setUser({...user, password}));
  const handleEmailSubmitEditing = () => {
    if (passwordField) {
        passwordField.focus();
    }
  };
  const handleForgotPasswordPress = () => navigation.navigate('ForgotPassword');
  const handleSingUpPress = () => navigation.navigate('BasicInformation');
  // Methods
  const attemptLogin = async (email, password) => {
    try {
        const {
            data: {success, result}
        } = await api.post(routes.login, {email, password});
        return {success, result};
    } catch (e) {
        return false;
    }
  };
  const attemptCredentials = async () => {
    if (!validEmail(user.email)) {
        return showMessage(validateErrorsMessages.email.invalid);
    }
    if (isEmptyOrFalse(user.password)) {
        return showMessage(validateErrorsMessages.password.empty);
    }
    startAnimation();
    setIsPerformingAnyAction(true);
    const loginResponse = await attemptLogin(user.email.trim(), user.password.trim());
    await resetAnimation();
    setIsPerformingAnyAction(false);
    if (!loginResponse) {
        return showMessage(validateErrorsMessages.login.fail);
    }
    const {success, result} = loginResponse;
    if (!success) {
        return showMessage(result);
    }
    const {user: u, token: t} = result;
    if (isEmptyOrFalse(u) || isEmptyOrFalse(t)) {
        return showMessage(validateErrorsMessages.userAndToken);
    }
    dispatch(setUser({...u, token: t.access_token}));
    return navigation.navigate('Home');
  };
  // Render
  return (console.tron.log('render', isPerformingAnyAction, user, widthAnimation) || true) && (
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
                            <S.InputIcon name="user" />
                        </S.InputCircle>
                        <S.InputField
                            onChangeText={handleEmailChangeText} autoCompleteType="email"
                            autoCapitalize="none" keyboardType="email-address"
                            value={user.email} placeholder={isPerformingAnyAction ? '' : 'E-mail'}
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
                            onChangeText={handlePasswordChangeText} autoCompleteType="password"
                            clearTextOnFocus value={user.password} autoCapitalize="none"
                            placeholder={isPerformingAnyAction ? '' : 'Senha'}
                            onSubmitEditing={attemptCredentials} returnKeyType="done"
                            secureTextEntry selectTextOnFocus textContentType="password"
                            ref={setPasswordField} editable={!isPerformingAnyAction}
                            style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                        />
                    </S.InputContainer>
                    <S.InputContainer submit>
                        <S.SubmitButton onPress={attemptCredentials} disabled={isPerformingAnyAction}>
                            {!isPerformingAnyAction ? (
                                <S.SubmitButtonText>LOGIN</S.SubmitButtonText>
                            ) : (
                                <S.LoadingContainer>
                                    <S.SubmitButtonText>CARREGANDO</S.SubmitButtonText>
                                </S.LoadingContainer>
                            )}
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
    </S.Container>
  );
};
