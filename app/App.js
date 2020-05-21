import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {StatusBar} from "react-native";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import Colors from "./constants/Colors";
import BasicInformationScreen from "./screens/Registration/BasicInformationScreen";
import LocationInformationScreen from "./screens/Registration/LocationInformationScreen";

const Stack = createStackNavigator();

const Options = {
    LoginScreen: {
        header: () => null
    },
    HomeScreen: {
        header: () => null
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
            title: 'DADOS BÁSICOS'
        },
        LocationInformation: {
            title: 'DADOS DE LOCALIZAÇÃO'
        }
    }
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
                <Stack.Screen name="Home" component={HomeScreen} options={Options.HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    </>
);

