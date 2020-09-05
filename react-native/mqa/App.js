import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SplashScreen } from 'expo';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import AlertProvider from 'react-native-alert-utils';
import { NavigationContainer } from '@react-navigation/native';
import { View, Platform } from 'react-native';

import Router from './router';
import { navigationRef } from './services/navigation';
import { colors } from './styles';
import { store } from './store';

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(
    false,
  );

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'space-mono': spaceMono,
        //   roboto,
        //   'roboto-light': robotoLight,
        //   'roboto-bold': robotoBold,
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === 'ios' ? 18 : 0,
      }}
    >
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Router isLoadingComplete={isLoadingComplete} />
          <AlertProvider />
        </NavigationContainer>
      </Provider>
      <FlashMessage position="top" />
    </View>
  );
}
