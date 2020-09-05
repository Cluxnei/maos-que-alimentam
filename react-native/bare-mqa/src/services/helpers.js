import {showMessage as sm} from 'react-native-flash-message';

export const isUndefined = _ => typeof _ === 'undefined';
export const isNotUndefined = _ => !isUndefined(_);
export const isEmptyOrFalse = _ => ({
    undefined: () => true,
    number: number => isNaN(number) || number === 0,
    boolean: boolean => !boolean,
    string: string => String(string).trim().length === 0,
    object: object => {
        if (object === null) {
            return true;
        }
        if (Array.isArray(object)) {
            return object.length === 0;
        }
        return Object.keys(object).length === 0;
    },
})[typeof _](_);
export const isNotEmptyAndTrue = _ => !isEmptyOrFalse(_);
export const delay = ms => new Promise(res => setTimeout(res, ms));
export const showMessage = (message, type = 'danger', options = {}) => sm({
    ...options,
    message,
    type,
});

export const clearCnpj = cnpj => cnpj.trim().replace(/(\.)|(-)|(\/)/g, '');
export const clearPhone = phone => phone.trim().replace(/(-)|(\()|(\))|(\s)/g, '');
export const clearZipCode = zipCode => zipCode.trim().replace(/(-)/g, '');
