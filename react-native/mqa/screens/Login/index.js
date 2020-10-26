import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import * as S from './styles';
import {Platform} from 'react-native';
import {Formik} from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../styles';
import {Creators as LoginActions} from '../../store/ducks/login';

const Login = () => {
  const {loading} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const submit = (values) => {
    dispatch(LoginActions.login(values));
  };

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <S.SubContainer>
        <Formik
          validateOnBlur={false}
          validationSchema={yup.object().shape({
            username: yup
              .string()
              .min(4, 'Digite no mínimo 4 caracteres.')
              .required('Campo obrigatório'),
            password: yup
              .string()
              .min(4, 'Digite no mínimo 4 caracteres.')
              .required('Campo obrigatório'),
          })}
          initialValues={{username: '', password: ''}}
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
                onBlur={handleBlur('username')}
                value={values.username}
                msg={errors.username}
                onChangeText={handleChange('username')}
                name="USUÁRIO"
              />
              <Input
                secureTextEntry
                onBlur={handleBlur('password')}
                value={values.password}
                msg={errors.password}
                onChangeText={handleChange('password')}
                name="SENHA"
              />
              <Button
                title="ENTRAR"
                color={colors.secundary}
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>
      </S.SubContainer>
    </S.Container>
  );
};

export default Login;