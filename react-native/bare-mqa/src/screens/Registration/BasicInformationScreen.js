import React, {useState} from 'react';
import {Animated} from 'react-native';
import * as S from '../../styles/Registration';
import {validateErrorsMessages, validPhone} from '../../constants/validation';
import {delay, isEmptyOrFalse} from '../../services/helpers';
import {validateCnpj} from 'react-native-masked-text/lib/masks/cnpj.mask';
import api from '../../services/api';
import routes from '../../services/api/routes';
import {showMessage} from '../../services/helpers';
import {setUser} from "../../storage/actions";
import {useDispatch, useSelector} from "react-redux";

export default ({navigation}) => {
  // Global state
  const {user} = useSelector(({UserReducer}) => UserReducer);
  const dispatch = useDispatch();
  // Local state
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [nameField, setNameField] = useState(undefined);
  const [cnpjField, setCnpjField] = useState(undefined);
  const [phoneField, setPhoneField] = useState(undefined);
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
  const handleNameInputChangeText = name => dispatch(setUser({...user, name}));
  const handleCnpjInputChangeText = cnpj => dispatch(setUser({...user, cnpj}));
  const handlePhoneInputChangeText = phone => dispatch(setUser({...user, phone}));
  const handleNameSubmitEditing = () => {
    if (cnpjField) {
      cnpjField.getElement().focus();
    }
  };
  const handleCnpjSubmitEditing = async () => {
    const rawCnpj = cnpjField.getRawValue();
    if (!validateCnpj(rawCnpj)) {
      setErrorField('cnpj');
      if (cnpjField) {
        cnpjField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.cnpj.invalid);
    }
    setIsPerformingAnyAction(true);
    startAnimation();
    const validCnpj = await checkCnpj(rawCnpj);
    await resetAnimation();
    if (validCnpj.error) {
      setIsPerformingAnyAction(false);
      return showMessage(validateErrorsMessages.cnpj.error);
    }
    if (!validCnpj.success) {
      setIsPerformingAnyAction(false);
      setErrorField('cnpj');
      if (cnpjField) {
        cnpjField.getElement().focus();
      }
      return showMessage(validCnpj.result);
    }
    setIsPerformingAnyAction(false);
    if (phoneField) {
      phoneField.getElement().focus();
    }
  };
  const handleNextPress = async () => {
    setIsPerformingAnyAction(true);
    const rawCnpj = cnpjField.getRawValue();
    const rawPhone = phoneField.getRawValue();
    if (isEmptyOrFalse(user.name)) {
      setIsPerformingAnyAction(false);
      setErrorField('name');
      if (nameField) {
        nameField.focus();
      }
      return showMessage(validateErrorsMessages.name);
    }
    if (!validateCnpj(rawCnpj)) {
      setIsPerformingAnyAction(false);
      setErrorField('cnpj');
      if (cnpjField) {
        cnpjField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.cnpj.invalid);
    }
    if (!validPhone(rawPhone)) {
      setIsPerformingAnyAction(false);
      setErrorField('phone');
      if (phoneField) {
        phoneField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.phone.invalid);
    }
    startAnimation();
    const validCnpj = await checkCnpj(rawCnpj);
    if (validCnpj.error) {
      setIsPerformingAnyAction(false);
      setErrorField('cnpj');
      if (cnpjField) {
        cnpjField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.cnpj.error);
    }
    if (!validCnpj.success) {
      setIsPerformingAnyAction(false);
      setErrorField('cnpj');
      if (cnpjField) {
        cnpjField.getElement().focus();
      }
      return showMessage(validCnpj.result);
    }
    const validCelPhone = await checkPhone(rawPhone);
    if (validCelPhone.error) {
      setIsPerformingAnyAction(false)
      setErrorField('phone');
      if (phoneField) {
        phoneField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.phone.error);
    }
    if (!validCelPhone.success) {
      setIsPerformingAnyAction(false);
      setErrorField('phone');
      if (phoneField) {
        phoneField.getElement().focus();
      }
      return showMessage(validCelPhone.result);
    }
    setErrorField('');
    resetAnimation().done();
    setIsPerformingAnyAction(false);
    navigation.navigate('LocationInformation');
  };
  // Methods
  const checkCnpj = async (cnpj) => {
    try {
      const {data: {success, result}} = await api.post(routes.checkCnpj, {cnpj});
      return {success, result};
    } catch (e) {
      return {error: true};
    }
  };
  const checkPhone = async (phone) => {
    try {
      const {data: {success, result}} = await api.post(routes.checkPhone, {phone});
      return {success, result};
    } catch (e) {
      return {error: true};
    }
  };
  // Render
  return (
    <S.Container>
      <S.scroll>
        <S.body>
          <S.Logo />
          <S.DataContainer>
            <S.InputContainer error={errorField === 'name'}>
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
                ref={setNameField}
                onChangeText={handleNameInputChangeText} autoCompleteType="name"
                keyboardType="default" value={user.name}
                placeholder={isPerformingAnyAction ? '' : 'Nome da entidade'}
                returnKeyType="next" editable={!isPerformingAnyAction}
                textContentType="organizationName" onSubmitEditing={handleNameSubmitEditing}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'cnpj'}>
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
                onChangeText={(text) => handleCnpjInputChangeText(text)} autoCompleteType="off"
                keyboardType="numeric" value={user.cnpj} autoCaptalize="none"
                placeholder={isPerformingAnyAction ? '' : 'CNPJ'}
                returnKeyType="next" editable={!isPerformingAnyAction}
                textContentType="none" onSubmitEditing={handleCnpjSubmitEditing}
                ref={setCnpjField}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'phone'}>
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
                onChangeText={(text) => handlePhoneInputChangeText(text)} autoCompleteType="tel"
                keyboardType="numeric" value={user.phone} autoCaptalize="none"
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
