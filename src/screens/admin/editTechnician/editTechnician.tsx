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
  Alert,
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
import {ChangePasswordProp, UpdateUserProp} from '@/src/storage/store';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import useEditTechnicianStyles from './style';
import {navigationRef} from '@/App';
import Toast from 'react-native-toast-message';
import {compressImageUnder2MB} from '@/src/util/compressedImage';
import Skeleton from '@/src/components/skeleton';
import {moderateScale} from '@/src/util/responsiveDimension';
import {
  requestCameraPermission,
  requestMediaPermission,
} from '@/src/util/permission';
import {useTechnicianList} from '@/src/storage/useTechnicianList';
/**
 * NewTenant screen for creating a new tenant profile.
 * Bottom tabs and header are intentionally omitted as per design spec.
 * Icon/image areas use dummy views as per requirement.
 *
 * @component
 * @example
 * <EditTenant />
 */
const TECHNICIAN_DESIGNATION = [
  {label: 'Electrician', value: 'Electrician'},
  {label: 'Plumber', value: 'Plumber'},
  {label: 'Carpenter', value: 'Carpenter'},
  {label: 'Ac Technician', value: 'Ac Technician'},
  {label: 'Painter', value: 'Painter'},
  {label: 'Cleaner', value: 'Cleaner'},
];
const EditTechnician = () => {
  // const { theme } = useTheme();
  const styles = useEditTechnicianStyles();
  const {params} = useRoute();
  const {
    image: image1,
    floor,
    building,
    phone:mobileNumber,
    id,
    skill:designation1,
    name,

  } = params?.user;


  const [liaisonName, setLiaisonName] = useState(name);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [imageCompressing, setImageCompressing] = useState(false);
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>({
    uri: image1 ?? '',
    type: 'image/jpeg',
    name: 'Uploaded Image',
  });
  const [phone, setPhone] = useState(mobileNumber);
  const [floorLevel, setFloorLevel] = useState(floor);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedTower, setSelectedTower] = useState<'Vista 1' | 'Vista 2'>(
    building,
  );

  const [updatePasswordPayload, setUpdatePasswordPayload] =
    useState<ChangePasswordProp | null>(null);

  const {updateUser, isCreating, isUserPasswordUpdating, changeUserPassword} =
    useTechnicianList();

  const [userData, setUserData] = useState<UpdateUserProp>({
    userId: id,
    name: '',
    role: 'TECHNICIAN',
    floor: '',
    companyName: '',
    mobileNumber: '',
    building: '',
    designation: designation1,
    image: null,
  });
  const MAX_SIZE = 8 * 1024 * 1024;

  useEffect(() => {
    setUserData(prev => ({
      ...prev,
      name: liaisonName,
      image: image?.uri === image1 ? null : image ? image : userData.image,
      floor: floorLevel,
      building: selectedTower,
      mobileNumber: phone,
    }));
  }, [image, liaisonName, phone, image, floorLevel, selectedTower, phone]);

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
          uri: compressedImage?.uri ?? asset?.uri,
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
    updateUser(userData);
  };

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
              heading="Edit Technician"
              subHeading="Update an existing technician profile for Vista Tower."
            />

            {/* ── Logo Upload ───────────────────────────── */}
            <Pressable
              style={styles.logoUploadArea}
              onPress={() => setIsUploadModalVisible(true)}
              disabled={image != null}>
              {/* White card with dummy icon */}
              <>
                <Pressable
                  style={styles.logoCard}
                  disabled={image != null}
                  onPress={() => setIsUploadModalVisible(true)}>
                  {/* <View style={styles.logoIconDummy} /> */}
                  {image ? (
                    <View>
                      {imageCompressing ? (
                        <Skeleton
                          width={moderateScale(96)}
                          height={moderateScale(96)}
                          borderRadius={moderateScale(12)}
                        />
                      ) : (
                        <Image
                          source={{uri: image.uri}}
                          style={{
                            width: moderateScale(96),
                            height: moderateScale(96),
                            borderRadius: moderateScale(12),
                          }}
                        />
                      )}
                      <Pressable
                        style={styles.crossBtn}
                        onPress={() => setImage(null)}>
                        <Text
                          style={{
                            fontSize: moderateScale(20),
                            fontFamily: fontFamily.gaglin,
                            fontWeight: 'bold',
                            color: Colors.red,
                          }}>
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
              {/* Primary Liaison Name */}
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputField}
                  value={liaisonName}
                  onChangeText={setLiaisonName}
                  placeholder="Primary Liaison Name"
                  placeholderTextColor="#546069"
                  returnKeyType="next"
                />
              </View>

              {/* Email + Phone side by side */}
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <TextInput
                  maxLength={10}
                    style={styles.inputField}
                    value={phone}
                    onChangeText={setPhone}
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
                  style={styles.dropDown}
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

              {/*Credentials */}
              <View style={styles.inputWrap}>
                <TextInput
                  maxLength={15}
                  style={styles.inputField}
                  value={updatePasswordPayload?.password ?? ''}
                  onChangeText={e => {
                    setUpdatePasswordPayload(prev => ({
                      password: e,
                      confirmPassword: prev?.confirmPassword ?? '',
                      userId: id ?? '',
                    }));
                  }}
                  placeholder="Password"
                  placeholderTextColor="#546069"
                  returnKeyType="done"
                  secureTextEntry={!passwordVisible}
                />
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
                  value={updatePasswordPayload?.confirmPassword ?? ''}
                  onChangeText={e => {
                    setUpdatePasswordPayload(prev => ({
                      password: prev?.password ?? '',
                      confirmPassword: e.trim(),
                      userId: id ?? '',
                    }));
                  }}
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
              <Pressable
                disabled={
                  updatePasswordPayload == null ||
                  updatePasswordPayload?.password == '' ||
                  updatePasswordPayload?.confirmPassword == ''
                }
                style={[
                  styles.submitBtn,
                  {
                    opacity:
                      updatePasswordPayload == null ||
                      updatePasswordPayload?.password == '' ||
                      updatePasswordPayload?.confirmPassword == ''
                        ? 0.3
                        : 1,
                  },
                ]}
                onPress={() =>
                  updatePasswordPayload
                    ? changeUserPassword(updatePasswordPayload)
                    : null
                }>
                <TextComp text="Change Password" style={styles.submitBtnText} />
              </Pressable>
            </View>

            {/* ── Actions ───────────────────────────────── */}
            <View style={styles.actionsWrap}>
              <Pressable
                style={styles.submitBtn}
                onPress={() => handleSumbit()}>
                <TextComp
                  text="Update Technician Profile"
                  style={styles.submitBtnText}
                />
              </Pressable>

              <View style={styles.cancelWrap}>
                <Pressable
                  onPress={() => {
                    navigationRef.goBack();
                  }}>
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
        <LoaderModal isVisible={isCreating || isUserPasswordUpdating} />
      </>
    </KeyboardAvoidingView>
  );
};

export default EditTechnician;
