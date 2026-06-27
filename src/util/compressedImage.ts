    import * as ImageManipulator from 'expo-image-manipulator';
import { File } from 'expo-file-system';

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export const compressImageUnder2MB = async (uri: string) => {
  
  try {
    let compress = 1;
    let result = null;

    while (compress >= 0.1) {
      result = await ImageManipulator.manipulateAsync(
        uri,
        [],
        {
          compress,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const file = new File(result.uri);
      const size = file.size ?? 0;

      if (size <= MAX_SIZE) {
        return result;
      }

      compress -= 0.1;
    }

    return result;
  } catch (error) {
    return null;
  }
};