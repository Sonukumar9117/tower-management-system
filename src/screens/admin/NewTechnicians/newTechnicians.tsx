/**
 * @file NewTenant.tsx
 * @description Form screen for creating a new tenant profile with logo upload,
 *              company information, location assignment, and action buttons.
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
  Image,
  Text,
} from 'react-native';
import TextComp from '@/src/components/TextComp';
import ScreenHeader from '@/src/components/ScreenHeader';
import Camera from '@/src/assets/Camera';
import LoaderModal from '@/src/components/loaderModal';
import * as ImagePicker from 'expo-image-picker';
import fontFamily from '@/src/styles/fontFamily';
import {Colors} from '@/src/constants/Colors';
import {CreateUserProp} from '@/src/storage/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useNewTenantStyles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import Skeleton from '@/src/components/skeleton';
import {compressImageUnder2MB} from '@/src/util/compressedImage';
import Toast from 'react-native-toast-message';
import {moderateScale} from '@/src/util/responsiveDimension';
import { requestCameraPermission, requestMediaPermission } from '@/src/util/permission';
import { useTechnicianList } from '@/src/storage/useTechnicianList';

/**
 * NewTenant screen for creating a new tenant profile.
 * Bottom tabs and header are intentionally omitted as per design spec.
 * Icon/image areas use dummy views as per requirement.
 *
 * @component
 * @example
 * <NewTenant />
 */

const TECHNICIAN_DESIGNATION = [
  {label: 'Electrician', value: 'Electrician'},
  {label: 'Plumber', value: 'Plumber'},
  {label: 'Carpenter', value: 'Carpenter'},
  {label: 'Ac Technician', value: 'Ac Technician'},
  {label: 'Painter', value: 'Painter'},
  {label: 'Cleaner', value: 'Cleaner'},
];
const NewTechnicians = () => {
  const [imageCompressing, setImageCompressing] = useState(false);
  const styles = useNewTenantStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const {createNewUser, isCreating} = useTechnicianList();
  const [userData, setUserData] = useState<CreateUserProp>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    designation: '',
    experience: '',
    role: 'Technician',
    floor: '',
    companyName: '',
    mobileNumber: '',
    building: '',
    image: {
      uri: '',
      type: '',
      name: '',
    },
  });

  const MAX_SIZE = 8 * 1024 * 1024;
 
  const openGallery = async () => {
    setIsUploadModalVisible(false);

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
        selectionLimit: 1,
      });

      if (!result.canceled) {
        if ((result?.assets?.[0]?.fileSize ?? 0) > MAX_SIZE) {
          Toast.show({
            type: 'error',
            text1: 'Image size must be less than or equal to 8 MB',
          });
          return;
        }
        setImageCompressing(true);
        const compressedImage = await compressImageUnder2MB(
          result.assets[0]?.uri,
        );
        setImageCompressing(false);
        const images = result.assets.map((asset, index) => ({
          uri: compressedImage?.uri ?? asset.uri,
          type: asset.mimeType || 'image/jpeg',
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
        }));
        setImage({...images[0]});
      }
    } catch (error) {
      return;
    } finally {
      setImageCompressing(false);
    }
  };

  const openCamera = async () => {
    setIsUploadModalVisible(false);
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
      if ((result?.assets?.[0]?.fileSize ?? 0) > MAX_SIZE) {
        Toast.show({
          type: 'error',
          text1: 'Image size must be less than or equal to 8 MB',
        });
        return;
      }
      setImageCompressing(true);
      const compressedImage = await compressImageUnder2MB(
        result.assets[0]?.uri,
      );
      setImageCompressing(false);
      const imageDate = {
        name: result?.assets[0]?.fileName ?? '',
        type: 'image/jpeg',
        uri: compressedImage?.uri ?? result.assets[0]?.uri,
      };

      setImage({...imageDate});
    }
  };
  const handleSumbit = () => {
    createNewUser(userData);
  };
  useEffect(() => {
    setUserData(prev => ({...prev, image: {...image}}));
  }, [image]);
  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <ScreenHeader
              heading="New Technicians"
              subHeading="Create a new technician profile for Vista Tower."
            />

            {/* ── Logo Upload ───────────────────────────── */}
            <Pressable
              style={styles.logoUploadArea}
              onPress={() => setIsUploadModalVisible(true)}
              disabled={image != null}>
            
              <>
                <Pressable
                  style={styles.logoCard}
                  disabled={image != null}
                  onPress={() => setIsUploadModalVisible(true)}>
              
                  {image ? (
                    <View>
                      <Image
                        source={{uri: image.uri}}
                        style={{
                          width: moderateScale(96),
                          height: moderateScale(96),
                          borderRadius: moderateScale(12),
                        }}
                      />
                      <Pressable
                        style={styles.crossBtn}
                        onPress={() => setImage(null)}>
                        <Text
                          style={styles.crossBtnTxt}>
                          X
                        </Text>
                      </Pressable>
                    </View>
                  ) : imageCompressing ? (
                    <Skeleton
                      width={moderateScale(96)}
                      height={moderateScale(96)}
                      borderRadius={moderateScale(12)}
                    />
                  ) : (
                    <Camera
                      width={moderateScale(24)}
                      height={moderateScale(24)}
                    />
                  )}
                </Pressable>

                <View style={styles.logoLabelWrap}>
                  <TextComp
                    text="Upload Profile Picture"
                    style={styles.logoTitle}
                  />
                  <TextComp text="PNG,JPG up to 8MB" style={styles.logoHint} />
                </View>
              </>
            </Pressable>

            {/* ── Company Information Card ──────────────── */}
            <View style={styles.card}>
              <TextComp
                text="Technician Information"
                style={styles.cardTitle}
              />

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputField}
                  value={userData?.name}
                  onChangeText={text => {
                    setUserData(prev => ({
                      ...prev,
                      name: text,
                    }));
                  }}
                  placeholder="Technician Name"
                  placeholderTextColor="#546069"
                  returnKeyType="next"
                />
              </View>

              {/* Email + Phone side by side */}
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <TextInput
                    style={styles.inputField}
                    value={userData?.email}
                    onChangeText={text => {
                      setUserData(prev => ({
                        ...prev,
                        email: text,
                      }));
                    }}
                    placeholder="Email"
                    placeholderTextColor="#546069"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                </View>
                <View style={styles.inputHalf}>
                  <TextInput
                    style={styles.inputField}
                    value={userData?.mobileNumber}
                    onChangeText={t => {
                      const cleaned = t.replace(/\D/g, ''); // remove non-digits
                      if (cleaned.length <= 10) {
                        setUserData(prev => ({...prev, mobileNumber: cleaned}));
                      }
                    }}
                    placeholder="Phone"
                    placeholderTextColor="#546069"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View
                style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                <Text style={styles.cardTitle}>Skill:</Text>
                <Dropdown
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: moderateScale(5),
                    padding: 6,
                    borderColor: Colors.lightGray,
                  }}
                  value={userData?.designation}
                  placeholder="Unassigned"
                  selectedTextStyle={{
                    fontFamily: fontFamily.medium,
                    color: Colors.black,
                  }}
                  data={TECHNICIAN_DESIGNATION}
                  renderItem={item => (
                    <View
                      style={{
                        width: '100%',
                        padding: 5,
                        paddingHorizontal: 10,
                      }}>
                      <TextComp
                        text={item?.label}
                        style={styles.dropDownLabel}></TextComp>
                    </View>
                  )}
                  onChange={item => {
                    setUserData(prev => ({...prev, designation: item?.value}));
                  }}
                  labelField={'label'}
                  valueField={'value'}></Dropdown>
              </View>
            </View>

            <View style={styles.card}>
              <TextComp
                text="Technician Credentials"
                style={styles.cardTitle}
              />

              {/* Floor Level */}
              <View style={styles.inputWrap}>
                <TextInput
                  maxLength={15}
                  style={styles.inputField}
                  value={userData.password}
                  onChangeText={e =>
                    setUserData(prev => ({...prev, password: e?.trim()}))
                  }
                  placeholder="Password"
                  placeholderTextColor="#546069"
                  returnKeyType="done"
                  secureTextEntry={!passwordVisible}></TextInput>
                <Pressable
                  style={{position: 'absolute', right: 0, top: 10}}
                  onPress={() => setPasswordVisible(prev => !prev)}>
                  {!passwordVisible ? (
                    <Ionicons name="eye-outline" size={24} color="gray" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={24} color="gray" />
                  )}
                </Pressable>
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  maxLength={15}
                  style={styles.inputField}
                  value={userData.confirmPassword}
                  onChangeText={e =>
                    setUserData(prev => ({...prev, confirmPassword: e?.trim()}))
                  }
                  placeholder="Confirm Password"
                  placeholderTextColor="#546069"
                  secureTextEntry={!confirmPasswordVisible}
                  returnKeyType="done"
                />
                <Pressable
                  style={{position: 'absolute', right: 0, top: 10}}
                  onPress={() => setConfirmPasswordVisible(prev => !prev)}>
                  {!confirmPasswordVisible ? (
                    <Ionicons name="eye-outline" size={24} color="gray" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={24} color="gray" />
                  )}
                </Pressable>
              </View>
            </View>

            {/* ── Actions ───────────────────────────────── */}
            <View style={styles.actionsWrap}>
              <Pressable
                style={styles.submitBtn}
                onPress={() => handleSumbit()}>
                <TextComp
                  text="Create Technician Profile"
                  style={styles.submitBtnText}
                />
              </Pressable>

              <View style={styles.cancelWrap}>
                <Pressable>
                  <TextComp text="Cancel" style={styles.cancelText} />
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
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
        <LoaderModal isVisible={isCreating} />
      </>
    </KeyboardAvoidingView>
  );
};

export default NewTechnicians;
