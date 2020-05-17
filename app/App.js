import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {StatusBar} from "react-native";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

const Options = {
    LoginScreen: {
        header: () => null
    },
    HomeScreen: {
        header: () => null
    },
    ForgotPassword: {
        title: 'Esqueci minha senha',
        headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
        },
    }
};

export default () => (
    <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={Options.LoginScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={Options.ForgotPassword}/>
                <Stack.Screen name="Home" component={HomeScreen} options={Options.HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    </>
);

