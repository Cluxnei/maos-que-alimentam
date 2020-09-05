import React, {useState} from 'react';
import {Animated} from 'react-native';
import * as S from '../../styles/Registration';
import {validateErrorsMessages, validEmail, validPassword} from '../../constants/validation';
import {
  delay,
  showMessage,
  clearCnpj,
  clearPhone,
  clearZipCode,
} from '../../services/helpers';
import api from '../../services/api';
import routes from "../../services/api/routes";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../storage/actions";
import {messages} from "../../constants/messages";

export default ({navigation}) => {
  // Global state
  const {user} = useSelector(({UserReducer}) => UserReducer);
  const dispatch = useDispatch();
  // Local state
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [emailField, setEmailField] = useState(undefined);
  const [passwordField, setPasswordField] = useState(undefined);
  const [confirmPasswordField, setConfirmPasswordField] = useState(undefined);
  const [widthAnimation] = useState(new Animated.Value(20));
  const [errorField, setErrorField] = useState('');
  // Animation
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
  const handleEmailInputChangeText = email => dispatch(setUser({...user, email}));
  const handlePasswordInputChangeText = password => dispatch(setUser({...user, password}));
  const handleConfirmPasswordInputChangeText = confirmPassword => dispatch(setUser({...user, confirmPassword}));
  const handleEmailSubmitEditing = async () => {
    setErrorField('');
    if (!validEmail((user.email || ''))) {
      setErrorField('email');
      if (emailField) {
        emailField.focus();
      }
      return showMessage(validateErrorsMessages.email.invalid);
    }
    setIsPerformingAnyAction(true);
    startAnimation();
    const validatedEmail = await checkEmail(user.email);
    if (validatedEmail.error) {
      if (emailField) {
        emailField.focus();
      }
      setIsPerformingAnyAction(false);
      setErrorField('email');
      return showMessage(validateErrorsMessages.email.error);
    }
    if (!validatedEmail.success) {
      if (emailField) {
        emailField.focus();
      }
      setIsPerformingAnyAction(false);
      setErrorField('email');
      return showMessage(validatedEmail.result);
    }
    await resetAnimation();
    setIsPerformingAnyAction(false);
    if (passwordField) {
      passwordField.focus();
    }
  };
  const handlePasswordSubmitEditing = () => {
    setErrorField('');
    if (!validPassword(user.password)) {
      dispatch(setUser({...user, password: ''}));
      setErrorField('password');
      if (passwordField) {
        passwordField.focus();
      }
      return showMessage(validateErrorsMessages.password.rules);
    }
    if (confirmPasswordField) {
      confirmPasswordField.focus();
    }
  };
  const handleConfirmPasswordSubmitEditing = async () => {
    setErrorField('');
    if (!validPassword(user.password)) {
      setErrorField('password');
      if (passwordField) {
        passwordField.focus();
      }
      return showMessage(validateErrorsMessages.password.rules);
    }
    if (!validPassword(user.confirmPassword)) {
      dispatch(setUser({...user, confirmPassword: ''}))
      setErrorField('confirmPassword');
      if (confirmPasswordField) {
        confirmPasswordField.focus();
      }
      return showMessage(validateErrorsMessages.password.rules);
    }
    await handleNextPress();
  };
  const handleNextPress = async () => {
    setErrorField('');
    if (!validEmail(user.email)) {
      setErrorField('email');
      if (emailField) {
        emailField.focus();
      }
      return showMessage(validateErrorsMessages.email.invalid);
    }
    if (!validPassword(user.password)) {
      setErrorField('password');
      if (passwordField) {
        passwordField.focus();
      }
      return showMessage(validateErrorsMessages.password.rules);
    }
    if (!validPassword(user.confirmPassword)) {
      setErrorField('confirmPassword');
      if (confirmPasswordField) {
        confirmPasswordField.focus();
      }
      return showMessage(validateErrorsMessages.password.rules);
    }
    if (user.password !== user.confirmPassword) {
      if (confirmPasswordField) {
        confirmPasswordField.focus();
      }
      setErrorField('confirmPassword');
      return showMessage(validateErrorsMessages.password.notMatch);
    }
    startAnimation();
    setIsPerformingAnyAction(true);
    const validatedEmail = await checkEmail(user.email);
    if (validatedEmail.error) {
      setIsPerformingAnyAction(false);
      setErrorField('email');
      if (emailField) {
        emailField.focus();
      }
      return showMessage(validateErrorsMessages.email.error);
    }
    if (!validatedEmail.success) {
      setIsPerformingAnyAction(false);
      setErrorField('email');
      if (emailField) {
        emailField.focus();
      }
      return showMessage(validatedEmail.result);
    }
    const registeredUser = await registerAccount();
    await resetAnimation();
    setIsPerformingAnyAction(false);
    if (!registeredUser) {
      return showMessage(validateErrorsMessages.accountRegistration);
    }
    showMessage(messages.accountRegistration, 'success');
    setErrorField('');
    navigation.navigate('Login');
  };
  // Methods
  const registerAccount = async () => {
    const registration = {
      name: user.name,
      cnpj: clearCnpj(user.cnpj),
      phone: clearPhone(user.phone),
      zipcode: clearZipCode(user.zipcode),
      street: user.street,
      city: user.city,
      email: user.email,
      password: user.password,
    };
    try {
      const {data: {success, result: {user}}} = await api.post(routes.register, registration);
      if (success) {
        return user;
      }
      return false;
    } catch (e) {
      return false;
    }
  };
  const checkEmail = async (email) => {
    try {
      const {data: {result, success}} = await api.post(routes.checkEmail, {email});
      return {success, result};
    } catch (e) {
      return {error: true};
    }
  };

  return (
    <S.Container>
      <S.scroll>
        <S.body>
          <S.Logo/>
          <S.DataContainer>
            <S.InputContainer error={errorField === 'email'}>
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
                onChangeText={handleEmailInputChangeText} autoCompleteType="email"
                keyboardType="email-address" value={user.email} autoCapitalize="none"
                placeholder={isPerformingAnyAction ? '' : 'E-mail'} ref={setEmailField}
                returnKeyType="next" editable={!isPerformingAnyAction}
                textContentType="emailAddress" onSubmitEditing={handleEmailSubmitEditing}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'password'}>
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
                onChangeText={handlePasswordInputChangeText} autoCompleteType="password"
                value={user.password}
                placeholder={isPerformingAnyAction ? '' : 'Senha'}
                onSubmitEditing={handlePasswordSubmitEditing} returnKeyType="next"
                secureTextEntry selectTextOnFocus textContentType="password"
                ref={setPasswordField} editable={!isPerformingAnyAction}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'confirmPassword'}>
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
                onChangeText={handleConfirmPasswordInputChangeText} autoCompleteType="password"
                value={user.confirmPassword}
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
                  </S.LoadingContainer>)
                }
              </S.SubmitButton>
            </S.InputContainer>
          </S.DataContainer>
        </S.body>
      </S.scroll>
    </S.Container>
  );
};
