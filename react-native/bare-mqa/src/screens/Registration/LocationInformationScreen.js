import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import * as S from '../../styles/Registration';
import {validateErrorsMessages, validCep} from "../../constants/validation";
import {delay, isEmptyOrFalse} from "../../services/helpers";
import searchZipcode from 'cep-promise';
import {useDispatch, useSelector} from "react-redux";
import {showMessage} from "../../services/helpers";
import {setUser} from "../../storage/actions";

export default ({navigation}) => {
  // Global state
  const {user} = useSelector(({UserReducer}) => UserReducer);
  const dispatch = useDispatch();
  // Local state
  const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
  const [zipcodeField, setZipcodeField] = useState(undefined);
  const [streetField, setStreetField] = useState(undefined);
  const [cityField, setCityField] = useState(undefined);
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
  const handleZipCodeInputChangeText = zipcode => dispatch(setUser({...user, zipcode}));
  const handleStreetInputChangeText = street => dispatch(setUser({...user, street}));
  const handleCityInputChangeText = city => dispatch(setUser({...user, city}));
  const handleZipcodeSubmitEditing = async () => {
    setIsPerformingAnyAction(true);
    const rawZipcode = zipcodeField.getRawValue();
    if (!validCep(rawZipcode)) {
      setIsPerformingAnyAction(false);
      setErrorField('zipcode');
      if (zipcodeField) {
        zipcodeField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.zipcode.invalid);
    }
    startAnimation();
    const location = await findZipcode(rawZipcode);
    await resetAnimation();
    if (location.error) {
      setIsPerformingAnyAction(false);
      setErrorField('zipcode');
      if (zipcodeField) {
        zipcodeField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.zipcode.notFound);
    }
    dispatch(setUser({
      ...user,
      street: location.street,
      city: location.city,
    }));
    setIsPerformingAnyAction(false);
    if (streetField) {
      streetField.focus();
    }
  };
  const handleStreetSubmitEditing = () => {
    if (cityField) {
      cityField.focus();
    }
  };
  const handleCitySubmitEditing = async () => {
    await handleNextPress();
  };
  const handleNextPress = async () => {
    setIsPerformingAnyAction(true);
    const rawZipcode = zipcodeField.getRawValue();
    if (!validCep(rawZipcode)) {
      setIsPerformingAnyAction(false);
      setErrorField('zipcode');
      if (zipcodeField) {
        zipcodeField.getElement().focus();
      }
      return showMessage(validateErrorsMessages.zipcode.invalid);
    }
    if (isEmptyOrFalse(user.street)) {
      setIsPerformingAnyAction(false);
      setErrorField('street');
      if (streetField) {
        streetField.focus();
      }
      return showMessage(validateErrorsMessages.street);
    }
    if (isEmptyOrFalse(user.city)) {
      setIsPerformingAnyAction(false);
      setErrorField('city');
      if (cityField) {
        cityField.focus();
      }
      return showMessage(validateErrorsMessages.city);
    }
    setErrorField('');
    startAnimation();
    await resetAnimation();
    setIsPerformingAnyAction(false);
    navigation.navigate('AuthInformation');
  };
  // Methods
  const findZipcode = async zipcode => {
    try {
      const {street, city} = await searchZipcode(zipcode);
      return {street, city};
    } catch (e) {
      return {error: true};
    }
  };
  // Effects
  useEffect(() => {
    if (zipcodeField && zipcodeField.getRawValue().length === 8) {
      handleZipcodeSubmitEditing().done()
    }
  }, [user.zipcode])
  // Render
  return (
    <S.Container>
      <S.scroll>
        <S.body>
          <S.Logo />
          <S.DataContainer>
            <S.InputContainer error={errorField === 'zipcode'}>
              <S.InputCircle style={
                {
                  width: isPerformingAnyAction ? widthAnimation.interpolate({
                    inputRange: [20, 100],
                    outputRange: ['20%', '100%'],
                  }) : 50
                }
              }>
                <S.ZipcodeIcon />
              </S.InputCircle>
              <S.zipcodeInputField
                onChangeText={(text) => handleZipCodeInputChangeText(text)} autoCompleteType="postal-code"
                value={user.zipcode} placeholder={isPerformingAnyAction ? '' : 'CEP'}
                returnKeyType="next" editable={!isPerformingAnyAction}
                textContentType="postalCode" ref={setZipcodeField} onSubmitEditing={handleZipcodeSubmitEditing}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'street'}>
              <S.InputCircle style={
                {
                  width: isPerformingAnyAction ? widthAnimation.interpolate({
                    inputRange: [20, 100],
                    outputRange: ['20%', '100%'],
                  }) : 50
                }
              }>
                <S.StreetIcon />
              </S.InputCircle>
              <S.InputField
                onChangeText={handleStreetInputChangeText} autoCompleteType="street-address"
                keyboardType="default" value={user.street}
                placeholder={isPerformingAnyAction ? '' : 'Logradouro'}
                returnKeyType="done" editable={!isPerformingAnyAction}
                textContentType="streetAddressLine1" ref={setStreetField}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                onSubmitEditing={handleStreetSubmitEditing}
              />
            </S.InputContainer>
            <S.InputContainer error={errorField === 'city'}>
              <S.InputCircle style={
                {
                  width: isPerformingAnyAction ? widthAnimation.interpolate({
                    inputRange: [20, 100],
                    outputRange: ['20%', '100%'],
                  }) : 50
                }
              }>
                <S.CityIcon />
              </S.InputCircle>
              <S.InputField
                onChangeText={handleCityInputChangeText} autoCompleteType="off"
                keyboardType="default" value={user.city}
                placeholder={isPerformingAnyAction ? '' : 'Cidade'}
                returnKeyType="done" editable={!isPerformingAnyAction}
                textContentType="addressCity" ref={setCityField}
                style={{color: isPerformingAnyAction ? 'transparent' : 'white'}}
                onSubmitEditing={handleCitySubmitEditing}
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
