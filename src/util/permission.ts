import { Alert, PermissionsAndroid, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import messaging from '@react-native-firebase/messaging';

 export const requestMediaPermission = async () => {
  const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permission required',
      'Please allow gallery access to upload photos.',
    );
    return false;
  }
  return true;
};

export const requestCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please allow camera access to take photos.',
      );
      return false;
    }
    return true;
  };

  export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

export async function getFcmToken(): Promise<string | null> {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    // console.log('Permission denied');
    return null;
  }

  const token = await messaging().getToken();

  return token;
}

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
}