import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Linking,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import TextComp from '@/src/components/TextComp';
import {EmailIcon, LockIcon} from '@/src/assets/icons';
import {User, useUser} from '@/src/storage/store';
import httpClient from '@/src/config/interceptor';
import {myLocalStorage} from '@/src/storage/mylocalStorage';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {navigationRef} from '@/App';
import {AxiosError} from 'axios';
import throttle from 'lodash.throttle';
import {Colors} from '@/src/constants/Colors';
import Toast from 'react-native-toast-message';
import {apiEndPoints} from '@/src/constants/apiEndPoints';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {makeCall} from '@/src/util/makeCall';
import {styles} from './styles';
import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import {getFcmToken, requestNotificationPermission} from '@/src/util/permission';

/**
 * Login screen component based on Figma layout.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const contentTranslateY = useSharedValue(0);
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState({
    emailErr: '',
    passErr: '',
    commonErr: '',
  });
  const {setUser, updateUnreadNotificationCount} = useUser();

  const clearErrorMsg = () => {
    setTimeout(() => {
      setErrMsg(prev => ({emailErr: '', passErr: '', commonErr: ''}));
    }, 5000);
  };
  const startsWithSpecialChar = /^[\W_]/;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const handleLogin = async () => {
    if (!email && !password) {
      setErrMsg(prev => ({
        ...prev,
        emailErr: 'Field is required',
        passErr: 'Field is required',
      }));
      clearErrorMsg();
      return;
    }
    if (!email) {
      setErrMsg(prev => ({...prev, emailErr: 'E-mail is required'}));
      clearErrorMsg();

      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg(prev => ({...prev, emailErr: 'Enter a valid email address'}));
      clearErrorMsg();

      return;
    }
    if (!password) {
      setErrMsg(prev => ({...prev, passErr: 'Password is required'}));
      clearErrorMsg();

      return;
    }
    setLoader(true);    

    try {
      const fcmToken = await getFcmToken();      
      const response = await httpClient.post(apiEndPoints.LOGIN, {
        email,
        password,
        fcmToken: fcmToken,
      });
      console.log('Login Response', response);

      // return;
      if (response?.data?.success) {
        Toast.show({
          type: 'success',
          text1: 'Welcome to Vista Business Tower',
          text2: response?.data?.message ?? 'Logged in successfully',
          visibilityTime: 3000,
        });
      } else return;
      const {
        user: responseUser,
        unreadNotificationCount,
        token,
      } = response?.data;

      const {profileCompleted, role} = responseUser;

      myLocalStorage.set('role', role ?? '');
      myLocalStorage.set('authToken', token ?? '');
      myLocalStorage.set('profile', profileCompleted ?? '');
      myLocalStorage.set('name', responseUser?.name ?? '');
      myLocalStorage.set('userid', responseUser?.id ?? '');
      myLocalStorage.set('company', responseUser?.id?.companyName ?? '');
      const {companyName, floor} = responseUser?.tenantProfile ?? {};
      const {designation} = responseUser?.technicianProfile ?? {};

      const user: User = {
        id: responseUser?.id,
        email: responseUser?.email,
        image: responseUser?.image,
        building: responseUser?.building,
        fcmToken: responseUser?.fcmToken,
        company: companyName,
        mobileNumber: responseUser?.phone,
        name: responseUser?.name,
        floor: floor,
        role: role,
        skill: designation,
      };

      myLocalStorage.set('user', user);

      setUser(user, role, token);
      updateUnreadNotificationCount(unreadNotificationCount ?? 0);

      navigationRef.reset({
        index: 0,
        routes: [
          {
            name: SCREEN_NAME.USER_BOTTOM_TAB,
          },
        ],
      });
      requestNotificationPermission();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      
      console.log(axiosError?.message);
      
      setLoader(false);

      setErrMsg(prev => ({
        ...prev,
        commonErr:
          axiosError?.response?.data?.message ??
          'Login failed, Something went wrong.',
      }));

      clearErrorMsg();
      return;
    } finally {
      setLoader(false);
    }
  };

  const debouncedLogin = throttle(handleLogin, 3000);

  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B06}\u{2934}\u{2935}\u{200D}]/gu;

  const handleOnChange = e => {
    if (!startsWithSpecialChar.test(e)) {
      let txt = e.replace(emojiRegex, '');
      setEmail(txt);
    }
  };
  const signInDisabled = useMemo(
    () => email.trim().length === 0 || password.trim().length === 0,
    [email, password],
  );

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(keyboardShowEvent, event => {
      const offset = Math.min(
        verticalScale(90),
        event.endCoordinates.height * 0.35,
      );
      contentTranslateY.value = withTiming(-offset, {duration: 240});
    });

    const hideSub = Keyboard.addListener(keyboardHideEvent, () => {
      contentTranslateY.value = withTiming(0, {duration: 220});
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [contentTranslateY]);

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{translateY: contentTranslateY.value}],
  }));

  useEffect(() => {
    if (errMsg?.emailErr) {
      Toast.show({
        type: 'error',
        text2: errMsg?.emailErr,
        text1: 'Error occured',
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.black,
        },
        text2Style: {
          fontSize: 14,
          color: '#555',
        },
      });
    } else if (errMsg?.passErr) {
      Toast.show({
        type: 'error',
        text2: errMsg?.passErr,
        text1: 'Error occured',
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.black,
        },
        text2Style: {
          fontSize: 14,
          color: '#555',
        },
      });
    } else if (errMsg?.commonErr) {
      Toast.show({
        type: 'error',
        text2: errMsg?.commonErr,
        text1: 'Error occured',
        text1Style: {
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.black,
        },
        text2Style: {
          fontSize: 14,
          color: '#555',
        },
      });
    }
  }, [errMsg]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? undefined : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(0) : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.backgroundGlowTop} />
          <View style={styles.backgroundGlowBottom} />

          <Animated.View style={[styles.content, animatedContentStyle]}>
            <View style={styles.header}>
              <TextComp text="Tower Sphere" style={styles.title} />
              <TextComp
                text="Property Management Portal"
                style={styles.subtitle}
              />
            </View>

            <View style={styles.card}>
              <View style={styles.fieldWrap}>
                <TextComp text="EMAIL ADDRESS" style={styles.fieldLabel} />
                <View style={styles.inputWrap}>
                  <View style={{position: 'absolute'}}>
                    <EmailIcon
                      width={moderateScale(16)}
                      height={moderateScale(16)}
                    />
                  </View>

                  <TextInput
                    value={email}
                    onChangeText={handleOnChange}
                    placeholder={'name@domain.com'}
                    placeholderTextColor="rgba(84, 96, 105, 0.5)"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textAlign={false ? 'right' : 'left'}
                  />
                </View>
              </View>

              <View style={styles.fieldWrap}>
                <View style={styles.passwordTopRow}>
                  <TextComp text="PASSWORD" style={styles.fieldLabel} />
                </View>

                <View style={styles.inputWrap}>
                  <View style={{position: 'absolute'}}>
                    <LockIcon
                      width={moderateScale(16)}
                      height={moderateScale(16)}
                    />
                  </View>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'********'}
                    placeholderTextColor="rgba(84, 96, 105, 0.5)"
                    style={styles.input}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textAlign={false ? 'right' : 'left'}
                  />
                  <Pressable
                    style={styles.passwordIconButton}
                    onPress={() => setIsPasswordVisible(prev => !prev)}>
                    {isPasswordVisible ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={moderateScale(20)}
                        color={Colors.lighRed}
                      />
                    ) : (
                      <Ionicons
                        name="eye-outline"
                        size={moderateScale(20)}
                        color={Colors.lighRed}
                      />
                    )}
                  </Pressable>
                </View>
              </View>

              <TouchableOpacity
                style={styles.signInButton}
                disabled={signInDisabled}
                onPress={debouncedLogin}>
                <LinearGradient
                  colors={
                    signInDisabled
                      ? ['#C7C7C7', '#B0B0B0']
                      : ['#AA001D', '#CF2431']
                  }
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.signInGradient}>
                  {loader ? (
                    <ActivityIndicator size={'small'} color={Colors.white} />
                  ) : (
                    <TextComp text="Sign In" style={styles.signInText} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.footer,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              <Text style={[styles.footerNote, {paddingHorizontal: 20}]}>
                By signing in, you agree to our{' '}
                <Text
                  style={{color: Colors.deepBlue}}
                  onPress={() => {
                    Linking.openURL(
                      'https://docs.google.com/document/d/e/2PACX-1vQgBoO3WAfGr-rRvUNDEMRCouU72ael2NtfajA6gIAy9qi0S6p0VYpC-LAaqK2WPXdViA6ElZiU-oDi/pub',
                    );
                  }}>
                  Terms & Condition{' '}
                </Text>
                and{' '}
                <Text
                  style={{color: Colors.deepBlue}}
                  onPress={() => {
                    Linking.openURL(
                      'https://docs.google.com/document/d/e/2PACX-1vREydj2kOc1SeUAyls2iwsma8MTlu_f7VY7MFCTEr06iNbg4XmYFfc-sE661OqYUvgQzPDyeG9_ajUl/pub',
                    );
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
            <View style={styles.footer}>
              <TextComp
                text="Need access or experiencing issues?"
                style={styles.footerNote}
              />
              <Pressable>
                <TextComp
                  onPress={() => {
                    makeCall('9087564323');
                  }}
                  text="Contact Administration "
                  style={styles.footerLink}
                />
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

