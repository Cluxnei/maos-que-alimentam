import {CommonActions} from '@react-navigation/native';
import {getData, storeData} from "../storage";
import {keys} from "../storage/Keys";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const resetNavigation = (navigation) => navigation.dispatch(
    (state) => {
        const routes = state.routes.filter(({name}) => name !== 'Login');
        return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1
        })
    }
);
export const getRegistration = async () => {
    const registration = await Promise.all([
        getData(keys.registration.name),
        getData(keys.registration.cnpj),
        getData(keys.registration.phone),
        getData(keys.registration.zipcode),
        getData(keys.registration.street),
        getData(keys.registration.city),
        getData(keys.registration.email),
        getData(keys.registration.password),
    ]);
    return {
        name: registration[0],
        cnpj: registration[1],
        phone: registration[2],
        zipcode: registration[3],
        street: registration[4],
        city: registration[5],
        email: registration[6],
        password: registration[7],
    };
};

export const clearRegistrationData = async () => {
    await Promise.all([
        storeData(keys.registration.name, null),
        storeData(keys.registration.cnpj, null),
        storeData(keys.registration.phone, null),
        storeData(keys.registration.zipcode, null),
        storeData(keys.registration.street, null),
        storeData(keys.registration.city, null),
        storeData(keys.registration.email, null),
        storeData(keys.registration.password, null),
    ]);
};