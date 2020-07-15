import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DonateScreen from './screens/DonateScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import AddInterestScreen from './screens/AddInterestScreen';
import SelectItemScreen from './screens/SelectItemScreen';
import SelectUnitScreen from './screens/SelectUnitScreen';
import AddItemScreen from './screens/AddItemScreen';
import {StatusBar} from 'react-native';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Colors from './constants/Colors';
import BasicInformationScreen from './screens/Registration/BasicInformationScreen';
import LocationInformationScreen from './screens/Registration/LocationInformationScreen';
import AuthInformationScreen from './screens/Registration/AuthInformationScreen';


const Stack = createStackNavigator();

const Options = {
    LoginScreen: {
        header: () => null,
        title: 'ENTRAR'
    },
    HomeScreen: {
        title: '',
        headerStyle: {
            height: 70,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
    },
    ForgotPassword: {
        title: 'RECUPERAR SENHA',
        headerStyle: {
            height: 100,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTintColor: Colors.secondColor
    },
    Registration: {
        BasicInformation: {
            title: 'DADOS BÁSICOS',
            headerTintColor: Colors.secondColor
        },
        LocationInformation: {
            title: 'DADOS DE LOCALIZAÇÃO',
            headerTintColor: Colors.secondColor
        },
        AuthInformation: {
            title: 'DADOS DE AUTENTICAÇÃO',
            headerTintColor: Colors.secondColor
        }
    },
    Donate: {},
    Receive: {},
    AddInterest: {},
    SelectItem: {},
    SelectUnit: {},
    AddItem: {},
};

export default () => (
    <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={Options.LoginScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={Options.ForgotPassword}/>
                <Stack.Screen name="BasicInformation" component={BasicInformationScreen} options={Options.Registration.BasicInformation}/>
                <Stack.Screen name="LocationInformation" component={LocationInformationScreen} options={Options.Registration.LocationInformation}/>
                <Stack.Screen name="AuthInformation" component={AuthInformationScreen} options={Options.Registration.AuthInformation}/>
                <Stack.Screen name="Home" component={HomeScreen} options={Options.HomeScreen}/>
                <Stack.Screen name="Donate" component={DonateScreen} options={Options.Donate}/>
                <Stack.Screen name="Receive" component={ReceiveScreen} options={Options.Receive}/>
                <Stack.Screen name="AddInterest" component={AddInterestScreen} options={Options.AddInterest}/>
                <Stack.Screen name="SelectItem" component={SelectItemScreen} options={Options.SelectItem}/>
                <Stack.Screen name="SelectUnit" component={SelectUnitScreen} options={Options.SelectUnit}/>
                <Stack.Screen name="AddItem" component={AddItemScreen} options={Options.AddItem}/>
            </Stack.Navigator>
        </NavigationContainer>
    </>
);

