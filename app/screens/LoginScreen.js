import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import * as S from '../styles/Login';
import {getData} from "../storage";
import {TokenKey, UserKey} from "../storage/Keys";
import {validUserToken} from "../constants/Validate";
import watermark from '../assets/watermark.png';
import logo from '../assets/logo.png';
import background from '../assets/background.png';

export default ({navigation: navigate}) => {
    //#region states
    const [isPerformingAnyAction, setIsPerformingAnyAction] = useState(false);
    //#endregion
    //#region methods
    const loginUser = async () => {
        const [token, user] = [await getData(TokenKey), await getData(UserKey)];
        if (validUserToken(user, token)) {
            return navigate('Home');
        }
    };
    const init = () => {
        setIsPerformingAnyAction(true);
        loginUser().then(() => setIsPerformingAnyAction(false));
    };
    //#endregion
    useEffect(init, []);
    //#region render
    if (isPerformingAnyAction) {
        return (<Loading/>);
    }
    return (
        <S.Container>
            <S.Background source={background}>
                <S.scroll>
                    <S.Header resizeMode="stretch" source={watermark}/>
                    <S.body>
                        <S.Logo source={logo}/>
                        <S.DataContainer>
                            <S.InputContainer>
                                <S.InputCircle>
                                    <S.InputIcon name="user"/>
                                </S.InputCircle>
                                <S.InputField>
                                    <S.InputText>Input</S.InputText>
                                </S.InputField>
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle>
                                    <S.InputIcon name="lock"/>
                                </S.InputCircle>
                                <S.InputField>
                                    <S.InputText>Input</S.InputText>
                                </S.InputField>
                            </S.InputContainer>
                            <S.InputContainer submit={true}>
                                <S.SubmitButton>
                                    <S.SubmitButtonText>LOGIN</S.SubmitButtonText>
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
