import OneSignal from 'react-native-onesignal';

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email);
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: 'Marcos',
    user_email: 'teste@email.com'
  });
}

export function tagUserEmailDelete(email: string) {
  OneSignal.deleteTag('user_email');
}
