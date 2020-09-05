/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
// Redux
import {Provider} from 'react-redux';
import {storage, persistor} from './src/storage';
import {PersistGate} from 'redux-persist/lib/integration/react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Screens
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
// Registration screens
import BasicInformationScreen from './src/screens/Registration/BasicInformationScreen';
import LocationInformationScreen from './src/screens/Registration/LocationInformationScreen';
import AuthInformationScreen from './src/screens/Registration/AuthInformationScreen';
import HomeScreen from "./src/screens/HomeScreen";
// Custom Components
import SplashScreen from './src/components/SplashScreen';
// Messages
import FlashMessage from 'react-native-flash-message';

// Dev
if (__DEV__) {
  import('./reactotron.config');
}

const Stack = createStackNavigator();

const Options = {
  Splash: {
    header: () => null,
  },
  Login: {
    header: () => null,
  },
  ForgotPassword: {},
  Registration: {
    Basic: {},
    Location: {},
    Auth: {},
  },
  Home: {},
};

export default () => (
  <>
    <StatusBar barStyle="light-content" />
    <Provider store={storage}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={Options.Splash}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={Options.Login}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={Options.ForgotPassword}
            />
            <Stack.Screen
              name="BasicInformation"
              component={BasicInformationScreen}
              options={Options.Registration.Basic}
            />
            <Stack.Screen
              name="LocationInformation"
              component={LocationInformationScreen}
              options={Options.Registration.Location}
            />
            <Stack.Screen
              name="AuthInformation"
              component={AuthInformationScreen}
              options={Options.Registration.Auth}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={Options.Home}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    <FlashMessage position="top" animated={true} />
  </>
);
