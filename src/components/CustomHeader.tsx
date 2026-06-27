import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {Colors} from '../constants/Colors';
import fontFamily from '../styles/fontFamily';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {horizontalScale, moderateScale} from '../util/responsiveDimension';
import {BellIcon} from '../assets/icons';
import LeftBack from '../assets/images/LeftBack';
import TextComp from './TextComp';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '../constants/screenname';
import {useRoute} from '@react-navigation/native';
import {useUser} from '../storage/store';
import {useNotification} from '../storage/useNotification';
type CustomHeaderTitles = {
  title: string;
  showBackBtn?: boolean;
};
const CustomHeader = ({title, showBackBtn}: CustomHeaderTitles) => {
  const insets = useSafeAreaInsets();
  const currentRoute = navigationRef?.current?.getCurrentRoute();
  const {params} = useRoute();
  const screenName = currentRoute?.name;
  const {unreadNotificationCount} = useUser();
  const {fetchNotificationList} = useNotification();
  const state = navigationRef?.getState();
  const handleBack = () => {
    if (screenName == SCREEN_NAME.TICKET_DETAILS) fetchNotificationList();
    if (state?.index > 0) {
      navigationRef?.goBack();
      return;
    }
    navigationRef?.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_NAME.USER_BOTTOM_TAB,
        },
      ],
    });

  };
  return (
    <View style={[styles.primary, {paddingTop: insets.top, paddingBottom: 5}]}>
      {screenName != SCREEN_NAME.RAISE_NEW_COMPLAINT ? (
        <>
          {showBackBtn ? (
            <Pressable style={styles.headerSideButton} onPress={handleBack}>
              <LeftBack width={moderateScale(20)} height={moderateScale(30)} />
            </Pressable>
          ) : (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{width: 36, height: 36}}
            />
          )}
          <Text style={styles.text}>
            {screenName == SCREEN_NAME.TICKET_DETAILS
              ? params?.ticketDetails?.complaintId
              : title}
          </Text>
          <Pressable
            style={[
              styles.bellButton,
              {opacity: screenName == SCREEN_NAME.NOTIFICATION ? 0 : 1},
            ]}
            disabled={screenName == SCREEN_NAME.NOTIFICATION}
            onPress={() => {
              const isScreenPresent = state?.routes?.some(
                route => route?.name == SCREEN_NAME.NOTIFICATION,
              );
              if (isScreenPresent) {
                navigationRef?.goBack();
              } else navigationRef?.navigate(SCREEN_NAME.NOTIFICATION);
              // updateUnreadNotificationCount(0);
            }}>
            <BellIcon width={16} height={20} color="#1A1C1C" />
            {unreadNotificationCount ? (
              <View style={styles.textContainer}>
                <Text style={styles.txt}>{unreadNotificationCount}+</Text>
              </View>
            ) : null}
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={styles.headerSideButton}
            onPress={() => navigationRef.goBack()}>
            <LeftBack width={moderateScale(20)} height={moderateScale(30)} />
          </Pressable>

          <TextComp text="Raise a Complaint" style={styles.headerTitle} />

          <View style={styles.avatarWrap}></View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    paddingHorizontal: horizontalScale(12),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  text: {
    color: Colors.red,
    fontSize: moderateScale(20),
    fontFamily: fontFamily.gaglin,
    fontWeight: '700',
  },
  bellButton: {
    width: moderateScale(28),
    height: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(20),
    lineHeight: moderateScale(28),
    color: '#1A1C1C',
    textAlign: 'center',
  },
  avatarWrap: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
  },
  avatar: {
    flex: 1,
    borderRadius: moderateScale(10),
    backgroundColor: '#D7E4EF',
  },
  headerSideButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: 20,
    height: 20,
    backgroundColor: Colors.red,
    borderRadius: 10,
    position: 'absolute',
    top: -4,
    right: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: fontFamily.gaglin,
    color: Colors.white,
    fontSize: 9,
    textAlign: 'center',
  },
});

export default CustomHeader;
