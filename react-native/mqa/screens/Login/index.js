import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import * as S from './styles';
import {Platform} from 'react-native';
import {Formik} from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../styles';
import {Creators as LoginActions} from '../../store/ducks/auth';
import logo from '../../assets/images/logo.png';

const Login = () => {
  const {loading, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submit = (values) => dispatch(LoginActions.login(values));

  const handleSingUpPress = () => null;
  const handleForgotPasswordPress = () => null;

  useEffect(() => {
    let mounted = true;
    mounted && user && dispatch(LoginActions.persistLogin(user));
    return () => {
      mounted = false;
    }
  }, [user]);

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <S.Background>
        <S.SubContainer>
          <S.Logo source={logo} resizeMode="contain" />
          <Formik
            validateOnBlur={false}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email('Digite um email válido.')
                .required('Campo obrigatório'),
              password: yup
                .string()
                .min(3, 'Digite no mínimo 3 caracteres.')
                .required('Campo obrigatório'),
            })}
            initialValues={{email: user?.email || '', password: ''}}
            onSubmit={submit}
          >
            {({
                handleSubmit,
                values,
                errors,
                handleChange,
                handleBlur,
              }) => (
              <>
                <Input
                  onBlur={handleBlur('email')}
                  value={values.email}
                  msg={errors.email}
                  onChangeText={handleChange('email')}
                  placeholder="E-MAIL"
                  iconName="user"
                  iconSize={40}
                  loading={loading}
                />
                <Input
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  value={values.password}
                  msg={errors.password}
                  onChangeText={handleChange('password')}
                  placeholder="SENHA"
                  iconName="lock"
                  iconSize={40}
                  loading={loading}
                />
                <Button
                  style={{width: '80%'}}
                  noMargin={true}
                  title="ENTRAR"
                  fontColor={colors.primary}
                  color={colors.white}
                  onPress={handleSubmit}
                  loading={loading}
                />
              </>
            )}
          </Formik>
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
        </S.SubContainer>
      </S.Background>
    </S.Container>
  );
};

export default Login;
