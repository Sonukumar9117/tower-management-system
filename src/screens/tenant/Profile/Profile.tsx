/**
 * @file Profile.tsx
 * @description Company profile screen showing tenant details, contact info,
 *              and an information callout card.
 */
import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

import useProfileStyles from './styles';
import TextComp from '@/src/components/TextComp';
import {useUser} from '@/src/storage/store';
import LoaderModal from '@/src/components/loaderModal';
import CustomImage from '@/src/components/customImage';
import ScreenHeader from '@/src/components/ScreenHeader';
import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {capitalizeWords} from '@/src/util/formatTimeDifference';
import { Colors } from '@/src/constants/Colors';
/**
 * Profile screen displaying company / tenant information.
 * Bottom tabs, header and RTL implementation are intentionally omitted
 * as per design specification.
 *
 * @component
 * @example
 * <Profile />
 */
const Profile = () => {
  const styles = useProfileStyles();
  const {user, role, logOut, isLoading} = useUser();

  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader
          heading={role == 'ADMIN' ? 'Admin Profile' : 'Your Profile'}
          subHeading={
            role == 'ADMIN'
              ? 'Official administrator and property management contact details'
              : 'Manage your accounts'
          }
        />
        <View style={styles.profileCard}>
          <View style={styles.decorativeBlob} />
          <View style={styles.imageContainer}>
            <CustomImage
              uri={user?.image?.toString()}
              height={moderateScale(150)}
              width={moderateScale(130)}
              borderRadius={moderateScale(10)}
            />
            {
              <TextComp
                text={role == 'TENANT' ? user?.company : user?.name}
                style={[
                  styles.companyNameTxt,
                  {paddingTop: role == 'ADMIN' ? 10 : 0},
                ]}
              />
            }
            {
              <>
                <View style={styles.badge}>
                  <TextComp
                    text={role?.toUpperCase()}
                    style={styles.badgeTxt}
                  />
                </View>
                {
                  <>
                    {role == 'ADMIN' ? (
                      <View
                        style={styles.adminEmailContainer}>
                        <TextComp
                          text={'EMAIL ADDRESS'}
                          style={styles.adminEmailLabel}
                        />
                        <TextComp
                          text={user?.email}
                          style={styles.adminEmailTxt}
                        />
                      </View>
                    ) : null}
                    {role == 'ADMIN' ? (
                      <View
                        style={styles.adminMobileContainer}>
                        <TextComp
                          text={'Mobile Number'}
                          style={styles.adminMobileLabel}
                        />
                        <TextComp
                          text={user?.mobileNumber??""}
                          style={styles.adminMobileTxt}
                        />
                      </View>
                    ) : null}
                  </>
                }
              </>
            }
          </View>
          {role == 'TECHNICIAN' ? (
            <View style={[styles.detailItem, {marginTop: 20}]}>
              <TextComp
                text={role == 'TECHNICIAN' ? 'Skill' : 'Tower'}
                style={styles.detailLabel}
              />
              <TextComp
                text={
                  role == 'TECHNICIAN' ? capitalizeWords(user?.skill ?? '') : ''
                }
                style={styles.detailValue}
              />
              <View style={[styles.divider, {marginTop: verticalScale(6)}]} />
            </View>
          ) : null}
          {role != 'ADMIN' ? (
            <>
              <View style={styles.detailsGrid}>
                {role != 'TECHNICIAN' ? (
                  <View style={styles.detailItem}>
                    <TextComp text={'Name'} style={styles.detailLabel} />
                    <TextComp text={user?.name} style={styles.detailValue} />
                  </View>
                ) : null}
                {role != 'TECHNICIAN' ? <View style={styles.divider} /> : null}

                {role != 'TECHNICIAN' ? (
                  <>
                    <View style={styles.detailItem}>
                      <TextComp text={'Floor'} style={styles.detailLabel} />
                      <TextComp text={user?.floor??5} style={styles.detailValue} />
                    </View>
                    <View style={styles.divider} />
                  </>
                ) : null}

                <View
                  style={[
                    styles.detailRow,
                    {flexDirection: role != 'TECHNICIAN' ? 'row' : 'row'},
                  ]}>
                  <View style={styles.detailItem}>
                    <TextComp text="Phone number" style={styles.detailLabel} />
                    <TextComp
                      text={user?.mobileNumber}
                      style={styles.detailValue}
                    />
                  </View>

                  <View style={styles.detailItem}>
                    <TextComp
                      text={'Email Address'}
                      style={styles.detailLabel}
                    />
                    <TextComp text={user?.email} style={styles.detailValue} />
                  </View>
                </View>
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.linkingBtnContainer}>
          <Pressable
            style={styles.linkingBtn}
            onPress={() => {
              Linking.openURL(
                'https://docs.google.com/document/d/e/2PACX-1vREydj2kOc1SeUAyls2iwsma8MTlu_f7VY7MFCTEr06iNbg4XmYFfc-sE661OqYUvgQzPDyeG9_ajUl/pub',
              );
            }}>
            <View style={styles.linkingBtnBody}>
              <View style={styles.linkingBtnIconContainer}>
                <MaterialCommunityIcons name="shield-lock-outline" size={20} />
              </View>
              <TextComp text={'Privacy Policy'} style={styles.detailValue} />
            </View>
            <Icon name="chevron-right" size={20} color="#000" />
          </Pressable>
          <Pressable
            style={styles.linkingBtn}
            onPress={() => {
              Linking.openURL(
                'https://docs.google.com/document/d/e/2PACX-1vQgBoO3WAfGr-rRvUNDEMRCouU72ael2NtfajA6gIAy9qi0S6p0VYpC-LAaqK2WPXdViA6ElZiU-oDi/pub',
              );
            }}>
            <View style={styles.linkingBtnBody}>
              <View style={styles.linkingBtnIconContainer}>
                <MaterialCommunityIcons name="gavel" size={20} />
              </View>
              <TextComp
                text={'Terms & Conditions'}
                style={styles.detailValue}
              />
            </View>
            <Icon name="chevron-right" size={20} color={Colors.black} />
          </Pressable>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logOut}>
          <Text style={styles.logoutBtnTxt}>{'Log Out'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <LoaderModal isVisible={isLoading} />
    </View>
  );
};

export default Profile;
