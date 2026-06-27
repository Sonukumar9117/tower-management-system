import * as Linking from 'expo-linking';

 export const makeCall = async (phoneNumber: string) => {
  await Linking.openURL(`tel:${phoneNumber}`);
};
