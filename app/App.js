import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

const Options = {
    LoginScreen: {
        header: () => null
    }
};

export default () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={Options.LoginScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
);

