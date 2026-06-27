import {usePostStore} from '../../../storage/usePostStore';
import {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../util/responsiveDimension';
import {Colors} from '../../../constants/Colors';
import ScreenHeader from '../../../components/ScreenHeader';
import TextComp from '../../../components/TextComp';
import Camera from '../../../assets/Camera';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import {Image} from 'expo-image';
import {navigationRef} from '@/App';
import Toast from 'react-native-toast-message';
import {compressImageUnder2MB} from '@/src/util/compressedImage';
import Skeleton from '@/src/components/skeleton';
import {styles} from './styles';
import UploadImageModal from './partials/uploadImageModal';
import { requestCameraPermission, requestMediaPermission } from '@/src/util/permission';
const CreatePost = () => {
  const {createPost, isCreatingPost, error} = usePostStore();
  const [complaint, setComplaint] = useState<{
    title: string;
    description: string;
    image: {uri: string; type: string; name: string}[];
  }>({title: '', description: '', image: []});
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  }>({uri: '', type: '', name: ''});
  const [imageCompressing, setImageCompressing] = useState(false);
  const remainingSlots = 3 - photos.length;

  const openGallery = async () => {
    setIsUploadModalVisible(false);
 
    if (remainingSlots <= 0) {
      Alert.alert('Photo limit reached', 'You can upload up to 3 photos.');
      return;
    }

    const hasPermission = await requestMediaPermission();
    if (!hasPermission) {
      return;
    }
    let result: ImagePicker.ImagePickerResult;
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: remainingSlots,
      });

      if (!result.canceled) {
        setImageCompressing(true);
        const promise = await Promise.allSettled(
          result.assets.map(asset => compressImageUnder2MB(asset?.uri)),
        );
        setImageCompressing(false);
        const images = result.assets.map((asset, index) => ({
          uri: promise[index]?.value?.uri ?? asset.uri,
          type: asset.mimeType || 'image/jpeg',
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
        }));
        setImage(image);
        setComplaint(prev => ({...prev, image: [...prev.image, ...images]}));
      }
    } catch (error) {

      return;
    } finally {
      setImageCompressing(false);
    }
   
    if (!result.canceled) {
      const selectedUris = result.assets
        .map(asset => asset.uri)
        .slice(0, remainingSlots);
     
      setPhotos(prev => {
        const next = [...prev, ...selectedUris].slice(0, 3);
        return next;
      });
    }
  };

  const openCamera = async () => {
    setIsUploadModalVisible(false);

    if (remainingSlots <= 0) {
      Alert.alert('Photo limit reached', 'You can upload up to 3 photos.');
      return;
    }

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    let result: ImagePicker.ImagePickerResult;
    try {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
    } catch (error) {
      return;
    }

    if (!result.canceled && result.assets[0]?.uri) {
      setImageCompressing(true);
      const compImage = await compressImageUnder2MB(result.assets[0]?.uri);
      setImageCompressing(false);
      const images = result.assets.map((asset, index) => ({
        uri: compImage?.uri ?? asset.uri,
        type: asset.mimeType || 'image/jpeg',
        name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
      }));

      setImage(image);
      setComplaint(prev => ({...prev, image: [...prev.image, ...images]}));
      setPhotos(prev => {
        const next = [...prev, result.assets[0].uri].slice(0, 3);

        const imageDate = {
          name: result?.assets[0]?.fileName,
          type: 'image/jpeg',
          uri: next,
        };
        setImage(image);
        // #endregion
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    if (!complaint?.title.trim() || !complaint.description.trim() || !image) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }
    await createPost(complaint.title, complaint.description, complaint.image);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          styles.keyBoardAvoidingCont,
          {
            paddingBottom:
              Platform.OS == 'android' && isKeyboardVisible
                ? verticalScale(60)
                : 0,
          },
        ]}>
        <View style={styles.primary}>
          <ScreenHeader
            heading="New Broadcast"
            subHeading="Compose a new annoucement for all Vista Business Tower residents."
          />
          <ScrollView
          keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{width: '100%', paddingBottom: verticalScale(50)}}>
            <View style={styles.secondary}>
              <View style={styles.secondaryContainer}></View>
              <View style={{width: '100%'}}>
                <View style={styles.inputContainer}>
                  <View style={styles.section}>
                    <TextComp
                      text="Announcement Title"
                      style={styles.sectionTitle}
                    />
                    <View style={styles.inputBackground}>
                      <View
                        style={[
                          styles.inputBase,
                          styles.descInput,
                          {
                            paddingHorizontal: horizontalScale(6),
                            minHeight: verticalScale(10),
                          },
                        ]}>
                        <TextInput
                          value={complaint.title}
                          onChangeText={e => {
                            setComplaint(prev => ({...prev, title: e}));
                          }}
                          placeholder="e.g., Scheduled Maintenance No"
                          placeholderTextColor="#BBC8D3"
                          multiline
                          textAlignVertical="top"
                          style={styles.inputText}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={[styles.section, {padding: horizontalScale(10)}]}>
                  <TextComp text="Hero Image" style={styles.sectionTitle} />
                  <Pressable
                    style={styles.uploadBox}
                    onPress={() => setIsUploadModalVisible(true)}>
                    <Camera
                      width={moderateScale(24)}
                      height={moderateScale(24)}
                    />
                    <TextComp
                      text="Tap To Upload Photos"
                      style={styles.uploadTitle}
                    />
                    <TextComp
                      text={
                        photos.length > 0
                          ? `${photos.length}/3 photo(s) selected`
                          : 'JPEG_PNG_UPTO_5MB'
                      }
                      isDynamic={photos.length > 0}
                      style={styles.uploadSubtitle}
                    />
                  </Pressable>
                  {imageCompressing ? (
                    <View style={styles.imagePlaceHolder}>
                      {[1, 2, 3].map(num => (
                        <Skeleton
                          width={moderateScale(72)}
                          height={moderateScale(72)}
                          borderRadius={moderateScale(8)}
                        />
                      ))}
                    </View>
                  ) : null}
                  {photos.length > 0 && !imageCompressing && (
                    <View style={styles.photoList}>
                      {photos.map((uri, currenIndex) => (
                        <View>
                          <Image
                            key={uri}
                            source={{uri}}
                            style={styles.photoPreview}
                            contentFit="cover"
                          />
                          <Pressable
                            style={styles.updateImageBtn}
                            onPress={() => {
                              setPhotos(prev => {
                                const updatedImage = complaint?.image?.filter(
                                  (img, index) => index != currenIndex,
                                );
                                setComplaint(prev => ({
                                  ...prev,
                                  image: updatedImage,
                                }));
                                const tempImage = prev.filter(
                                  (image, index) => index != currenIndex,
                                );
                                return tempImage;
                              });
                            }}>
                            <Text style={styles.crossText}>X</Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.section}>
                    <TextComp text="Message Body" style={styles.sectionTitle} />
                    <View style={styles.inputBackground}>
                      <View style={[styles.inputBase, styles.descInput]}>
                        <TextInput
                          value={complaint.description}
                          onChangeText={e => {
                            setComplaint(prev => ({...prev, description: e}));
                          }}
                          placeholder="Enter the details of your announcement here..."
                          placeholderTextColor="#BBC8D3"
                          multiline
                          textAlignVertical="top"
                          style={styles.inputText}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.btnContainer}>
                  <Pressable
                    style={[styles.raiseButton, {shadowColor: Colors.black}]}
                    onPress={() => {
                      navigationRef.goBack();
                    }}>
                    <LinearGradient
                      colors={['#fff', '#fff']}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      style={styles.raiseButtonGradient}>
                      <TextComp
                        text="Cancel"
                        style={[styles.raiseButtonText, {color: Colors.black}]}
                      />
                    </LinearGradient>
                  </Pressable>
                  <Pressable style={styles.raiseButton} onPress={handleSubmit}>
                    <LinearGradient
                      colors={['#AA001D', '#CF2431']}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      style={styles.raiseButtonGradient}>
                      {isCreatingPost ? (
                        <ActivityIndicator color={Colors.red} />
                      ) : (
                        <TextComp
                          text="Publish"
                          style={styles.raiseButtonText}
                        />
                      )}
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
          <UploadImageModal
            isUploadModalVisible={isUploadModalVisible}
            isCreatingPost={isCreatingPost}
            setIsUploadModalVisible={setIsUploadModalVisible}
            openCamera={openCamera}
            openGallery={openGallery}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePost;
