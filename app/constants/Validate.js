export const validUserToken = (user, token) => {
    return user && token;
};
export const validEmail = (email) => {
    return email.trim().length > 0;
};
export const validPassword = (password) => {
    return password.trim().length > 0;
};
