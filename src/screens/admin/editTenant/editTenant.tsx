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
import {
  ChangePasswordProp,
  UpdateUserProp,
  useUserList,
} from '@/src/storage/store';
import useNewTenantStyles from '../NewTenant/styles';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigationRef} from '@/App';
import Skeleton from '@/src/components/skeleton';
import Toast from 'react-native-toast-message';
import {compressImageUnder2MB} from '@/src/util/compressedImage';
import {moderateScale} from '@/src/util/responsiveDimension';
import {
  requestCameraPermission,
  requestMediaPermission,
} from '@/src/util/permission';
/**
 * NewTenant screen for creating a new tenant profile.
 * Bottom tabs and header are intentionally omitted as per design spec.
 * Icon/image areas use dummy views as per requirement.
 *
 * @component
 * @example
 * <EditTenant />
 */
const EditTenant = () => {
  const styles = useNewTenantStyles();
  const {params} = useRoute();

  const {
    companyName:companyName1,
    image: image1,
    building,
    floor,
    role,
    phone:mobileNumber,
    id,
    name,
  } = params?.user;
  
  const [companyName, setCompanyName] = useState(companyName1);
  const [liaisonName, setLiaisonName] = useState(name);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
  const [imageCompressing, setImageCompressing] = useState(false);

  const {updateUser, isCreating, isUserPasswordUpdating, changeUserPassword} =
    useUserList();

  const [userData, setUserData] = useState<UpdateUserProp>({
    userId: id,
    name: '',
    role: role,
    floor: '',
    companyName: '',
    mobileNumber: '',
    building: '',
    image: null,
  });

  useEffect(() => {
    setUserData(prev => ({
      ...prev,
      name: liaisonName,
      image: image?.uri === image1?.url ? null : image ? image : userData.image,
      floor: floorLevel,
      building: selectedTower,
      companyName: companyName,
      mobileNumber: phone,
    }));
  }, [
    companyName,
    image,
    liaisonName,
    phone,
    image,
    floorLevel,
    selectedTower,
    phone,
  ]);
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

        const images = await result.assets.map((asset, index) => ({
          uri: compressedImage?.uri ?? asset.uri,
          type: asset.mimeType || 'image/jpeg',
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
        }));
        setImageCompressing(false);
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
              heading="Edit Tenant"
              subHeading="Update an existing tenant profile for Vista Tower."
            />

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
                    text="Upload Company Logo"
                    style={styles.logoTitle}
                  />
                  <TextComp text="PNG,JPG up to 8MB" style={styles.logoHint} />
                </View>
              </>
            </Pressable>

            {/* ── Company Information Card ──────────────── */}
            <View style={styles.card}>
              <TextComp text="Company Information" style={styles.cardTitle} />

              {/* Company Name */}
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputField}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder="Company Name"
                  placeholderTextColor="#546069"
                  returnKeyType="next"
                />
              </View>

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
            </View>

            {/* ── Location Assignment Card ──────────────── */}
            <View style={styles.card}>
              <TextComp text="Loaction Assignment" style={styles.cardTitle} />

              {/* Floor Level */}
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.inputField}
                  value={floorLevel}
                  onChangeText={setFloorLevel}
                  placeholder="Floor Level"
                  placeholderTextColor="#546069"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={styles.card}>
              <TextComp text="User Credentials" style={styles.cardTitle} />

              {/*Credentials */}
              <View style={styles.inputWrap}>
                <TextInput
                  maxLength={15}
                  style={styles.inputField}
                  value={updatePasswordPayload?.password ?? ''}
                  onChangeText={e =>
                    setUpdatePasswordPayload(prev => ({
                      password: e,
                      confirmPassword: prev?.confirmPassword ?? '',
                      userId: id ?? '',
                    }))
                  }
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
                  onChangeText={e =>
                    setUpdatePasswordPayload(prev => ({
                      password: prev?.password ?? '',
                      confirmPassword: e.trim(),
                      userId: id ?? '',
                    }))
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
                  text="Update Tenant Profile"
                  style={styles.submitBtnText}
                />
              </Pressable>

              <View style={styles.cancelWrap}>
                <Pressable onPress={() => navigationRef?.goBack()}>
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

export default EditTenant;
