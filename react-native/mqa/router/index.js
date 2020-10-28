import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../styles';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const headerStyle = {
  backgroundColor: colors.primary,
};

const defaultOptions = {
  headerShown: false,
  headerStyle,
  headerTintColor: colors.white,
};

const options = {
  Login: {
    ...defaultOptions,
  },
  Home: {
    ...defaultOptions,
  },
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={options.Login}/>
      <Stack.Screen name="Home" component={Home} options={options.Home}/>
    </Stack.Navigator>
  );
};

export default Router;
