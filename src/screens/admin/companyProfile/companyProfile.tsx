/**
 * @file Profile.tsx
 * @description Company profile screen showing tenant details, contact info,
 *              and an information callout card.
 */
import React, {useState} from 'react';
import {View, ScrollView, Modal, Pressable} from 'react-native';

// import { useTheme } from '@/context/ThemeContext';

import TextComp from '@/src/components/TextComp';
import {useUserList} from '@/src/storage/store';
import useProfileStyles from './styles';
import {useRoute} from '@react-navigation/native';
import {Colors} from '@/src/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '@expo/vector-icons/MaterialIcons';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '@/src/constants/screenname';
import WarningModal from '@/src/components/warningModal';
import CustomImage from '@/src/components/customImage';
import ButtonComp from '@/src/components/ButtonComp';
import ScreenHeader from '@/src/components/ScreenHeader';
import {makeCall} from '@/src/util/makeCall';
import {capitalizeWords} from '@/src/util/formatTimeDifference';
import {moderateScale} from '@/src/util/responsiveDimension';
import LoaderModal from '@/src/components/loaderModal';
import {useTechnicianList} from '@/src/storage/useTechnicianList';

/**
 * Profile screen displaying company / tenant information.
 * Bottom tabs, header and RTL implementation are intentionally omitted
 * as per design specification.
 *
 * @component
 * @example
 * <Profile />
 */

const CompanyProfile = () => {
  const styles = useProfileStyles();
  const {removeByid, isDeleting} = useUserList();
  const {removeByid: deleteTechnician, isDeleting: technicianDeleting} =
    useTechnicianList();
  const {params} = useRoute();

  const {
    image,
    role,
    email,
    tenantProfile,
    mobileNumber,
    _id,
    name,
    technicianProfile,
  } = params?.user;
  const {designation} = technicianProfile ?? {};
  const {companyName, floor} = tenantProfile ?? {};
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: 120}}>
        <ScreenHeader
          heading={
            role != 'Technician' ? 'Tenant Details' : 'Technician Details'
          }
          subHeading={`${
            role != 'Technician'
              ? 'Complete tenant overview'
              : 'Complete technician overview'
          }`}
        />
        <View style={styles.profileCard}>
          <View style={styles.decorativeBlob} />
          <View style={styles.companyRow}>
            <View style={styles.logoWrap}>
              <CustomImage uri={image} />
            </View>

            <View style={{width: '75%'}}>
              {
                <TextComp
                  text={companyName ?? name}
                  style={styles.companyName}
                />
              }
              <View style={styles.tenantBadge}>
                <TextComp
                  text={capitalizeWords(role == 'user' ? 'Tenant' : role)}
                  style={styles.detailSub}
                />
              </View>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            {companyName?.length > 0 ? (
              <>
                <View style={styles.detailItem}>
                  <TextComp text={'Name'} style={styles.detailLabel} />
                  <TextComp text={name.toString()} style={styles.detailValue} />
                </View>
                <View style={styles.divider} />
              </>
            ) : null}

            {/* Tower */}
            {role == 'Technician' ? (
              <View style={styles.detailItem}>
                <TextComp
                  text={role == 'Technician' ? 'Skill' : 'Tower'}
                  style={styles.detailLabel}
                />
                <TextComp
                  text={
                    role == 'Technician'
                      ? capitalizeWords(designation ?? '')
                      : ''
                  }
                  style={styles.detailValue}
                />
              </View>
            ) : null}
            {/* Floor number */}
            {role == 'Technician' ? null : (
              <View style={styles.detailItem}>
                <TextComp text="Floor" style={styles.detailLabel} />
                <TextComp text={floor} style={styles.detailValue} />
              </View>
            )}
            <View style={styles.divider} />

            {/* Phone + Email side by side */}
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <TextComp text="Phone number" style={styles.detailLabel} />
                <View style={styles.alignComponentCenter}>
                  <TextComp text={mobileNumber} style={styles.detailValue} />
                  <Pressable
                    onPress={() => {
                      makeCall(mobileNumber);
                    }}
                    style={styles.callBtn}>
                    <Ionicons name="call" size={20} color={Colors.red} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.detailItem}>
                <TextComp text={'Email Address'} style={styles.detailLabel} />
                <TextComp text={email} style={styles.detailValue} />
              </View>
            </View>
          </View>
        </View>
        <ButtonComp
          onPress={() => {
            navigationRef.navigate(
              role == 'Technician'
                ? SCREEN_NAME.TECHNICIAN_EDIT
                : SCREEN_NAME.TENANT_EDIT,
              {
                user: params?.user,
              },
            );
          }}
          leftIcon={
            <Icon name="edit" size={moderateScale(25)} color={Colors.white} />
          }
          title={'Edit Profile'}
          textStyle={{color: Colors?.white}}
          style={styles.editBtn}
        />
        <ButtonComp
          onPress={() => {
            setVisible(true);
          }}
          title={role == 'Technician' ? 'Delete Technician' : 'Delete Tenant'}
          textStyle={styles.deleteBtnTxt}
          leftIcon={
            <Icon name="delete" size={moderateScale(25)} color={Colors.red} />
          }
          style={styles.deleteBtn}
        />
      </ScrollView>
      <Modal visible={visible} animationType="fade" transparent>
        <WarningModal
          message={''}
          onCancel={() => setVisible(false)}
          onOk={() => {
            setVisible(false);
            role == 'Technician' ? deleteTechnician(_id) : removeByid(_id);
          }}
        />
      </Modal>
      <LoaderModal isVisible={isDeleting || technicianDeleting} />
    </View>
  );
};

export default CompanyProfile;
