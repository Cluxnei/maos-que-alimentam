import {isNotEmptyAndTrue} from '../services/helpers';

export const validEmail = (email) => isNotEmptyAndTrue(email) && (
    new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
).test(email.trim());
export const validPassword = password => password.trim().length > 7;
export const validPhone = phone => phone.trim().length > 9;
export const validCep = zipcode => zipcode.trim().length > 7;
export const passwordRules = 'A senha deve conter no mínimo 8 caracteres';
export const validateErrorsMessages = {
    email: {
        invalid: 'Ops... esse email não parece correto.',
        error: 'Erro ao verificar e-mail. Verifique sua conexão.',
    },
    password: {
        rules: passwordRules,
        empty: 'Ops... sua senha está vazia.',
        notMatch: 'Senhas não correspondem',
    },
    checkConnection: 'Ops... verifique sua conexão',
    login: {
        fail: 'Ops... erro ao efetuar login, verifique sua conexão.',
    },
    userAndToken: 'Ops... faça login novamente por favor.',
    cnpj: {
        invalid: 'CNPJ inválido.',
        error: 'Erro ao verificar CNPJ. Verifique sua conexão.',
    },
    name: 'Preencha o campo nome.',
    phone: {
        invalid: 'Celular inválido',
        error: 'Erro ao verificar número de celular. Verifique sua conexão.',
    },
    zipcode: {
        invalid: 'Cep inválido',
        error: '',
        notFound: 'Cep não encontrado, insira os dados manualmente.'
    },
    street: 'Preencha o logradouro',
    city: 'Preencha a cidade',
    accountRegistration: 'Erro ao criar sua conta, tente novamente mais tarde.',
    item: 'Ops... selecione um item',
    unit: 'Ops... selecione uma unidade',
    quantity: 'Ops... qual quantidade?',
    error: 'Ops... parece que houve um erro, tente novamente',
};
