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
  LoginScreen: {
    header: () => null,
  },
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
              options={Options.LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    <FlashMessage position="top" animated={true} />
  </>
);
