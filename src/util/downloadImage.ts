import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';
import {Platform} from 'react-native';

export const downloadImage = async (
  url: string,
  setImageDownloading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required');
      return;
    }

    const imageUrl = url;
    const fileUri =
      FileSystem.documentDirectory + `${Date.now()}downloadedImage.jpg`;
    setImageDownloading(true);

    const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);

    await MediaLibrary.saveToLibraryAsync(downloadedFile.uri);
    //  await Sharing.shareAsync(downloadedFile.uri);
    if (Platform.OS === 'android') {
      const contentUri = await FileSystem.getContentUriAsync(
        downloadedFile.uri,
      );

      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'image/*',
      });
    }
  } catch (error) {
    
  } finally {
    setImageDownloading(false);
  }
};
