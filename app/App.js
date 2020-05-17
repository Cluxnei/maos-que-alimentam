import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {StatusBar} from "react-native";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import Colors from "./constants/Colors";

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
            height: 100,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTintColor: Colors.secondColor
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

