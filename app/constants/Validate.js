export const validUserToken = (user, token) => {
    return user && token;
};
export const validEmail = (email) => {
    return (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)).test(email.trim());
};
export const validPassword = (password) => {
    return password.trim().length > 0;
};
export const validPhone = (phone) => {
    return phone.trim().length > 9;
};
export const validNotEmpty = (text) => text.trim().length > 0;
export const validCep = (cep) => cep.trim().length > 7;
