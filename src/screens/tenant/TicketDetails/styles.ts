import {Colors} from '@/src/constants/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useTicketStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        updateBtnContainer: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: verticalScale(20),
        },
        container: {
          flex: 1,
          backgroundColor: '#F9F9F9',
          
        },
        topHeader: {
          height: verticalScale(64),
          paddingHorizontal: moderateScale(24),
          backgroundColor: 'rgba(255,255,255,0.9)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: Colors.black,
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.02,
          shadowRadius: 30,
          elevation: 2,
        },
        leftButton: {
          width: moderateScale(40),
          height: moderateScale(40),
          borderRadius: moderateScale(12),
          alignItems: 'center',
          justifyContent: 'center',
        },
        leftButtonIcon: {
          width: moderateScale(16),
          height: moderateScale(16),
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderColor: '#5B403E',
          transform: [{rotate: '-45deg'}],
        },
        ticketTitle: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(18),
          lineHeight: moderateScale(28),
          color: '#1A1C1C',
          letterSpacing: moderateScale(-0.2),
        },
        headerSpacer: {
          width: moderateScale(40),
        },
        content: {
          paddingHorizontal: moderateScale(24),
          paddingTop: verticalScale(24),
          paddingBottom: verticalScale(40),
          gap: verticalScale(24),
        },
        heroRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        statusPillStack: {
          position: 'absolute',
          right: -12,
          top: -15,
          alignItems: 'flex-end',
          gap: verticalScale(6),
          marginRight: horizontalScale(10),
        },
        heroTitle: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(30),
          lineHeight: moderateScale(38),
          color: '#1A1C1C',
        },
        heroMeta: {
          marginTop: verticalScale(8),
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#5B403E',
        },
        resolvedPill: {
          alignSelf: 'flex-start',
          borderRadius: moderateScale(12),
          paddingHorizontal: moderateScale(12),
          paddingVertical: verticalScale(4),
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(6),
          shadowColor: Colors.black,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.04,
          shadowRadius: 12,
          elevation: 1,
        },
        resolvedDot: {
          width: moderateScale(8),
          height: moderateScale(8),
          borderRadius: moderateScale(4),
        },
        resolvedText: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#1A1C1C',
          letterSpacing: moderateScale(0.6),
        },
        reopenedPill: {
          borderRadius: moderateScale(10),
          paddingHorizontal: moderateScale(10),
          paddingVertical: verticalScale(4),
        },
        reopenedPillActive: {
          backgroundColor: '#FEE2E2',
        },
        reopenedPillInactive: {
          backgroundColor: '#E5E7EB',
        },
        reopenedText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(11),
          lineHeight: moderateScale(14),
          color: '#374151',
        },
        card: {
          backgroundColor: Colors.white,
          borderRadius: moderateScale(8),
          padding: moderateScale(20),
          shadowColor: Colors.black,
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.03,
          shadowRadius: 30,
          elevation: 2,
        },
        cardAccent: {
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: moderateScale(4),
          backgroundColor: 'rgba(170, 0, 29, 0.2)',
          borderTopLeftRadius: moderateScale(8),
          borderBottomLeftRadius: moderateScale(8),
        },
        sectionLabel: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#5B403E',
          letterSpacing: moderateScale(1),
        },
        reportText: {
          marginTop: verticalScale(10),
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(16),
          lineHeight: moderateScale(26),
          color: '#1A1C1C',
        },
        reportMetaRow: {
          marginTop: verticalScale(14),
          paddingTop: verticalScale(12),
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
          flexDirection: 'row',
          gap: moderateScale(16),
        },
        reportMetaItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(4),
        },
        reportMetaIcon: {
          width: moderateScale(12),
          height: moderateScale(12),
          borderRadius: moderateScale(4),
          backgroundColor: '#5B403E',
          opacity: 0.5,
        },
        reportMetaText: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#5B403E',
        },
        statusLabel: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#5B403E',
          letterSpacing: moderateScale(1),
        },
        statusOptions: {
          marginTop: verticalScale(12),
          gap: verticalScale(10),
        },
        statusOption: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(10),

          zIndex: 1000,
        },
        radioOuter: {
          width: moderateScale(20),
          height: moderateScale(20),
          borderRadius: moderateScale(10),
          borderWidth: 2,
          borderColor: '#BBC8D3',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        },
        radioOuterActive: {
          borderColor: Colors.red,
        },
        radioInner: {
          width: moderateScale(10),
          height: moderateScale(10),
          borderRadius: moderateScale(5),
          backgroundColor: Colors.red,
        },
        statusOptionText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(15),
          lineHeight: moderateScale(20),
          color: '#1A1C1C',
        },
        messageCardWhite: {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E8E8E8',
        },

        avatarTenant: {
          backgroundColor: '#D7E5EB',
        },

        avatarTextTenant: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(12),
          color: '#111D22',
        },

        messageRole: {
          marginLeft: moderateScale(10),
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(10),
          lineHeight: moderateScale(15),
          color: '#5B403E',
        },

        postUpdateBtn: {
          alignSelf: 'flex-end',
          marginTop: verticalScale(8),
          borderRadius: moderateScale(12),
          backgroundColor: Colors.red,
          paddingHorizontal: moderateScale(16),
          paddingVertical: verticalScale(6),
        },
        postUpdateText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: Colors.white,
        },
        workStatusTxt: {
          color: Colors.white,
          backgroundColor: Colors.red,
          paddingVertical: verticalScale(12),
          textAlign: 'center',
          borderRadius: moderateScale(10),
          fontSize: moderateScale(14),
        },
        contactAdmin: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.red,
          flexDirection: 'row',
          paddingVertical: verticalScale(12),
          gap: 5,
          borderRadius: moderateScale(10),
          elevation: 1,
        },
      }),
    [],
  );
};

export default useTicketStyles;
