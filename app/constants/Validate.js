/**
 * Password rules translated string
 * @type {string}
 */
export const passwordRules = `
    A senha deve conter no mínimo 8 caracteres contendo:
    - Um digito
    - Uma letra minúscula
    - Uma letra maiúscula
`;

export const validateErrorsMessages = {
    email: 'Ops... esse email não parece correto.',
    password: {
        rules: passwordRules,
        empty: 'Ops... sua senha está vazia.'
    },

    login: {
        fail: 'Ops... erro ao efetuar login, verifique sua conexão.',
    },
    userAndToken: 'Ops... faça login novamente por favor.',
};

/**
 * Check if an var is type of undefined
 * @param {*} _
 * @returns {boolean}
 */
export const isUndefined = (_) => typeof _ === 'undefined';

/**
 * Check if an var is not type of undefined
 * @param {*} _
 * @returns {boolean}
 */
export const isNotUndefined = (_) => !isUndefined(_);

/**
 * Check if an string or object is empty
 * @param {*} _
 * @returns {boolean}
 */
export const isEmpty = (_) => {
    if (_ === null || isUndefined(_)) {
        return true;
    }
    const validationByType = {
        string: (_) => {
            const string = _.trim();
            return string.length === 0 || string === '';
        },
        object: (_) => Object.keys(_).length === 0 || Object.values(_).length === 0,
    }
    return validationByType[(typeof _)](_);
};

/**
 * Check if an string or object is not empty
 * @param {*} _
 * @returns {boolean}
 */
export const isNotEmpty = (_) => !isEmpty(_);

/**
 * Check if user and token is filled
 * @param user
 * @param token
 * @returns {bool}
 */
export const validUserToken = (user, token) => (
    isNotUndefined(user) && isNotUndefined(token) &&
    isNotEmpty(user) && isNotEmpty(token)
);

/**
 * Check is email match with email pattern
 * @param email
 * @returns {boolean}
 */
export const validEmail = (email) => isNotEmpty(email) && (
    new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
).test(email.trim());

/**
 * Check if password is valid
 * Rules:
 * - should contain at least one digit
 * - should contain at least one lower case
 * - should contain at least one upper case
 * - should contain at least 8 from the mentioned characters
 * @param {string} pass
 * @returns {boolean}
 */
export const validPassword = (pass) => {
    const password = pass.trim();
    return password.length > 7 && (
        (
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        ).test(password)
    );
};
/**
 * Check if phone is valid
 * @param {string} phone
 * @returns {boolean}
 */
export const validPhone = (phone) => {
    return phone.trim().length > 9;
};
/**
 * Check if zip code is valid
 * @param {string} zipcode
 * @returns {boolean}
 */
export const validCep = (zipcode) => zipcode.trim().length > 7;
