import {CommonActions} from '@react-navigation/native';
import {getData} from "../storage";
import {keys} from "../storage/Keys";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const resetNavigation = ({navigation}) => navigation.dispatch(
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
        getData(keys.registration.step),
    ]);
    return {
        name: registration[0],
        cnpj: registration[1],
        phone: registration[2],
        step: registration[3],
    };
};