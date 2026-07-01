import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Image} from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import TextComp from '@/src/components/TextComp';
import Camera from '@/src/assets/Camera';
import Plumbing from '@/src/assets/images/Plumbing';
import ElectricalIcon from '@/src/assets/ElectricalIcon';
import GeneralIcon from '@/src/assets/GeneralIcon';
import {useComplainStore} from '@/src/storage/useComplainStore';
import {Colors} from '@/src/constants/Colors';
import {compressImageUnder2MB} from '@/src/util/compressedImage';
import Skeleton from '@/src/components/skeleton';
import { moderateScale, verticalScale } from '@/src/util/responsiveDimension';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { requestCameraPermission, requestMediaPermission } from '@/src/util/permission';
import useRaiseComplaintStyles from './styles';

const categories = [
  {
    label: 'Electrical',
    icon: (
      <ElectricalIcon width={moderateScale(20)} height={moderateScale(20)} />
    ),
    id: 1,
  },
  {
    label: 'Plumbing',
    icon: <Plumbing width={moderateScale(20)} height={moderateScale(20)} />,
    id: 2,
  },
  {
    label: 'Furniture',
    icon: <MaterialCommunityIcons name="sofa" size={24} color="#AA001D" />,
    id: 3,
  },
  {
    label: 'General',
    icon: <GeneralIcon width={moderateScale(20)} height={moderateScale(20)} />,
    id: 4,
  },
] as const;

const RaiseComplaint = () => {
  const styles =useRaiseComplaintStyles();
  const [imageCompressing, setImageCompressing] = useState(false);
  const [complain, setComplaint] = useState({
    title: '',
    floor: '4',
    concernedDepartment: '',
    daysFacingIssue: '5',
    description: '',
    building: 'Vista Business Tower',
    companyName: 'vt',
    photo: [],
  });
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const {createComplaint, isCreating} = useComplainStore();
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
          uri: promise[index]?.value?.uri,
          type: asset.mimeType || 'image/jpeg',
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
        }));

        setComplaint(prev => ({
          ...prev,
          photo: [...prev.photo, ...images],
        }));
      }
    } catch (error) {
     
      return;
    } finally {
      setImageCompressing(false);
    }
 
    if (!result.canceled) {
      const selectedUris = result.assets
        .map(asset => asset.uri)

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
      setImageCompressing(true)
      const compImage=await compressImageUnder2MB(result.assets[0]?.uri)
      setImageCompressing(false)
      setPhotos(prev => {
        const next = [...prev,compImage?.uri?? result.assets[0].uri].slice(0, 3);
        const imageDate = {
          name: result?.assets[0]?.fileName,
          type: 'image/jpeg',
          uri: next[0],
        };
         setComplaint((prev)=>({...prev,photo:[...prev.photo,imageDate]}))
       
        return next;
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <TextComp text="Issue Category" style={styles.sectionTitle} />
          <View style={styles.categoryGrid}>
            {categories.map(category => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      complain.concernedDepartment == category.label
                        ? 'rgba(255,0,0,0.2)'
                        : Colors.white,
                  },
                ]}
                onPress={() => {
                  setComplaint(prev => ({
                    ...prev,
                    concernedDepartment: category.label,
                  }));
                }}>
                {category.icon}
                <TextComp text={category.label} style={styles.categoryText} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <TextComp text="Brief Title" style={styles.sectionTitle} />
          <View style={styles.inputBackground}>
            <View style={[styles.inputBase, styles.titleInput]}>
              <TextInput
                value={complain.title}
                onChangeText={e => {
                  setComplaint(prev => ({...prev, title: e}));
                }}
                placeholder="e.g. Leaking faucet in bath..."
                placeholderTextColor="#BBC8D3"
                style={styles.inputText}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TextComp text="Detailed Description" style={styles.sectionTitle} />
          <View style={styles.inputBackground}>
            <View
              style={[
                styles.inputBase,
                styles.descInput,
                {justifyContent: 'flex-start'},
              ]}>
              <TextInput
                value={complain.description}
                onChangeText={e =>
                  setComplaint(prev => ({...prev, description: e}))
                }
                placeholder="Describe the issue in detail..."
                placeholderTextColor="#BBC8D3"
                multiline
                textAlignVertical="top"
                style={[styles.inputText, {minHeight: verticalScale(120)}]}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TextComp text="Photo Evidence" style={styles.sectionTitle} />
          <Pressable
            style={styles.uploadBox}
            onPress={() => setIsUploadModalVisible(true)}>
            <Camera width={moderateScale(24)} height={moderateScale(24)} />
            <TextComp text="Tap To Upload Photos" style={styles.uploadTitle} />
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
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: 10,
              }}>
              {[1, 2, 3].map(num => (
                <Skeleton
                  width={moderateScale(72)}
                  height={moderateScale(72)}
                  borderRadius={moderateScale(8)}
                />
              ))}
            </View>
          ) : null}
          {photos.length > 0&&!imageCompressing && (
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
                    style={styles.crossBtn}
                    onPress={() => {
                      const updatedImage = complain?.photo?.filter(
                        (img, index) => index != currenIndex,
                      );
                      setComplaint(prev => ({
                        ...prev,
                        photo: updatedImage,
                      }));
                      setPhotos(prev => {
                        const tempImage = prev.filter(
                          (image, index) => index != currenIndex,
                        );
                        return tempImage;
                      });
                    }}>
                    <Text
                      style={styles.crossTxt}>
                      X
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            createComplaint({
              ...complain,
            })
          }>
          <TextComp text="Submit Complaint" style={styles.submitText} />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isUploadModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsUploadModalVisible(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsUploadModalVisible(false)}>
          <Pressable style={styles.modalCard}>
            <TextComp text="Choose Upload Source" style={styles.modalTitle} />

            <Pressable style={styles.modalActionButton} onPress={openCamera}>
              <TextComp text="Use Camera" style={styles.modalActionText} />
            </Pressable>

            <Pressable style={styles.modalActionButton} onPress={openGallery}>
              <TextComp
                text="Choose From Gallery"
                style={styles.modalActionText}
              />
            </Pressable>

            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setIsUploadModalVisible(false)}>
              <TextComp text="Cancel" style={styles.modalCancelText} />
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal visible={isCreating} transparent animationType="fade">
        <View
          style={styles.activiyIndicatorContainer}>
          <ActivityIndicator size={'large'} color={Colors.red} />
        </View>
      </Modal>
    </View>
  );
};

export default RaiseComplaint;
