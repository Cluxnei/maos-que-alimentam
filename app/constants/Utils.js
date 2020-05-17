import {CommonActions} from '@react-navigation/native';

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const resetNavigation = ({navigation}) => navigation.dispatch(
    (state) => {
        console.log(state);
        const routes = state.routes.filter(({name}) => name !== 'Login');
        return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1
        })
    }
);