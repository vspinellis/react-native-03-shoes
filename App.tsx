import { StatusBar } from 'react-native';

import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import OneSignal from 'react-native-onesignal';
import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import {
  tagUserEmailCreate,
  tagUserEmailDelete,
  tagUserInfoCreate
} from './src/notifications/notificationsTags';
import { useEffect } from 'react';

OneSignal.promptForPushNotificationsWithUserResponse(() => {});

const oneSignalAppId = '8b726eaa-e0ff-47c6-bcc1-a36cd21a3f91';
OneSignal.setAppId(oneSignalAppId);

OneSignal.setEmail('teste@email.com');

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  // tagUserEmailCreate('teste@email.com');
  // tagUserEmailDelete();
  tagUserInfoCreate();
  // One signal Enviamos no {{ user_email | default:'seu email' }} uma super promoção.

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler(() => {
      console.log('Abriu');
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      <CartContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</CartContextProvider>
    </NativeBaseProvider>
  );
}
