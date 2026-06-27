import {Colors} from '@/src/constants/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import styles from '../Complaints/styles';

const useProfileStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F9F9F9',
        },
        scrollContent: {
          paddingHorizontal: moderateScale(24),
          paddingTop: verticalScale(16),
          paddingBottom: verticalScale(32),
          gap: verticalScale(24),
        },

        // ─── Header Section ───────────────────────────────
        sectionHeading: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(30),
          lineHeight: moderateScale(36),
          color: '#1A1C1C',
          letterSpacing: -0.5,
        },
        sectionSubtitle: {
          marginTop: verticalScale(6),
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
          color: '#546069',
        },

        // ─── Primary Profile Card ─────────────────────────
        profileCard: {
          backgroundColor: Colors.white,
          borderRadius: moderateScale(8),
          padding: moderateScale(24),
          overflow: 'hidden',
          shadowColor: '#1A1C1C',
          shadowOffset: {width: 0, height: 24},
          shadowOpacity: 0.06,
          shadowRadius: 48,
          elevation: 4,
        },
        decorativeBlob: {
          position: 'absolute',
          width: moderateScale(128),
          height: moderateScale(128),
          borderRadius: moderateScale(64),
          top: -moderateScale(64),
          right: -moderateScale(20),
          backgroundColor: 'rgba(170, 0, 29, 0.05)',
        },
        companyRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(20),
        },
        logoWrap: {
          width: moderateScale(64),
          height: moderateScale(64),
          borderRadius: moderateScale(4),
          backgroundColor: Colors.lightGrayishWhite,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        },
        logoPlaceholder: {
          width: '100%',
          height: '100%',
          backgroundColor: '#D7E4EF',
          opacity: 0.9,
        },
        companyName: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(16),
          lineHeight: moderateScale(28),
          color: '#1A1C1C',
        },
        tenantBadge: {
          marginTop: verticalScale(4),
          alignSelf: 'flex-start',
          // backgroundColor: '#E8E8E8',
          borderRadius: moderateScale(2),
          paddingHorizontal: moderateScale(10),
          paddingVertical: verticalScale(2),
        },
        tenantBadgeText: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(10),
          lineHeight: moderateScale(16),
          color: '#546069',
          letterSpacing: moderateScale(1.2),
        },

        // ─── Details Grid ──────────────────────────────────
        detailsGrid: {
          marginTop: verticalScale(10),
          gap: verticalScale(16),
        },
        detailRow: {
          flexDirection: 'row',
          gap: moderateScale(16),
        },
        detailItem: {
          flex: 1,
          gap: verticalScale(4),
        },
        detailLabel: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#546069',
          letterSpacing: moderateScale(1.2),
        },
        detailValue: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(16),
          lineHeight: moderateScale(24),
          color: '#1A1C1C',
        },
        detailSub: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#546069',
        },
        divider: {
          height: 1,
          backgroundColor: '#E8E8E8',
        },

        // ─── Info / Callout Card ───────────────────────────
        calloutCard: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: moderateScale(16),
          backgroundColor: Colors.lightGrayishWhite,
          borderRadius: moderateScale(8),
          padding: moderateScale(20),
        },
        calloutIconWrap: {
          marginTop: verticalScale(2),
          width: moderateScale(20),
          height: moderateScale(20),
          borderRadius: moderateScale(10),
          backgroundColor: 'rgba(170, 0, 29, 0.15)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        calloutIconDot: {
          width: moderateScale(8),
          height: moderateScale(8),
          borderRadius: moderateScale(4),
          backgroundColor: Colors.red,
        },
        calloutTitle: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: Colors.brownishBlack,
        },
        calloutBody: {
          marginTop: verticalScale(6),
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(22),
          color: '#546069',
        },
        calloutButton: {
          marginTop: verticalScale(12),
          alignSelf: 'flex-start',
        },
        calloutButtonText: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: Colors.red,
          letterSpacing: moderateScale(1.2),
        },
        logoutBtn: {
          backgroundColor: Colors.red,
          alignItems: 'center',
          justifyContent: 'center',
          padding: moderateScale(14),
          borderRadius: moderateScale(8),
        },
        linkingBtnContainer: {
          backgroundColor: Colors.white,
          gap: 30,
          padding: 20,
          borderRadius: moderateScale(10),
          elevation: 2,
        },
        badge: {
          backgroundColor: '#FFDAD8',
          padding: moderateScale(5),
          paddingHorizontal: horizontalScale(15),
          marginTop: verticalScale(8),
          borderRadius: moderateScale(20),
        },
        companyNameTxt: {
          fontSize: moderateScale(17),
          fontWeight: 'bold',
          color: Colors.black,
          marginTop: verticalScale(0),
        },
        imageContainer: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        linkingBtn: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        badgeTxt: {
          fontSize: moderateScale(12),
          fontWeight: 'bold',
          color: Colors.red,
        },
        logoutBtnTxt: {
          fontFamily: fontFamily.gaglin,
          color: Colors.white,
          fontWeight: 'bold',
          fontSize: moderateScale(16),
        },
        linkingBtnBody: {
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        },
        linkingBtnIconContainer: {
          backgroundColor: '#D6E4EE',
          padding: 5,
          borderRadius: 8,
        },
        adminEmailContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(30),
        },
        adminEmailLabel: {
          fontSize: moderateScale(16),
          fontFamily: fontFamily.medium,
          fontWeight: 'bold',
          color: Colors.black,
        },
        adminEmailTxt: {
          fontSize: moderateScale(14),
          fontFamily: fontFamily.medium,
          color: Colors.black,
        },
        adminMobileContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(10),
        },
        adminMobileLabel: {
          fontSize: moderateScale(16),
          fontFamily: fontFamily.medium,
          fontWeight: 'bold',
          color: Colors.black,
        },
        adminMobileTxt: {
          fontSize: moderateScale(14),
          fontFamily: fontFamily.medium,
          color: Colors.black,
        },
      }),
    [],
  );
};

export default useProfileStyles;
