import {CommonActions} from '@react-navigation/native';

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const resetNavigation = ({navigation}) => navigation.dispatch(
    CommonActions.reset({
        index: 1,
        routes: [
            {name: 'Home'}
        ]
    })
);