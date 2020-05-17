import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();

const Options = {
    LoginScreen: {
        header: () => null
    },
    HomeScreen: {
        header: () => null
    },
};

export default () => (
    <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={Options.LoginScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} options={Options.HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    </>
);

