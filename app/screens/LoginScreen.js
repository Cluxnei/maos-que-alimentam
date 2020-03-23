import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import * as S from '../styles/Login';
import {getData} from "../storage";
import {TokenKey, UserKey} from "../storage/Keys";
import {validUserToken} from "../constants/Validate";

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
            <S.Background>
                <S.scroll>
                    <S.Header>
                        <S.Watermark source={watermark} resizeMode="contain" />
                    </S.Header>
                    <S.body>
                        <S.Logo source={logo} resizeMode="contain" />
                        <S.DataContainer>
                            <S.InputContainer>
                                <S.InputCircle>
                                    <S.InputIcon source={inputIcon} resizeMode="contain" />
                                </S.InputCircle>
                                <S.InputField>
                                    <S.InputText>Input</S.InputText>
                                </S.InputField>
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.InputCircle>
                                    <S.InputIcon source={inputIcon} resizeMode="contain" />
                                </S.InputCircle>
                                <S.InputField>
                                    <S.InputText>Input</S.InputText>
                                </S.InputField>
                            </S.InputContainer>
                            <S.InputContainer>
                                <S.SubmitButton>
                                    <S.SubmitButtonText>LOGIN</S.SubmitButtonText>
                                </S.SubmitButton>
                            </S.InputContainer>
                        </S.DataContainer>
                        <S.LinksContainer>
                            <S.SingupContainer>
                                <S.QuestionText>Não tem uma conta?</S.QuestionText>
                                <S.SingupButton>
                                    <S.SingupButtonText>
                                        Cadastre-se
                                    </S.SingupButtonText>
                                </S.SingupButton>
                            </S.SingupContainer>
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
