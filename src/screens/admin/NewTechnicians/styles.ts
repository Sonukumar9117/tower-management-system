import {Colors} from '@/src/constants/Colors';
import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useNewTenantStyles = () => {
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
          paddingBottom: verticalScale(48),
          gap: verticalScale(32),
        },

        // ─── Header ───────────────────────────────────────
        headerSection: {
          gap: verticalScale(8),
        },
        heading: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(30),
          lineHeight: moderateScale(36),
          color: '#1A1C1C',
          letterSpacing: -0.5,
        },
        subheading: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#546069',
        },

        // ─── Logo Upload ──────────────────────────────────
        logoUploadArea: {
          backgroundColor: '#F3F3F3',
          borderRadius: moderateScale(8),
          paddingVertical: verticalScale(32),
          alignItems: 'center',
          justifyContent: 'center',
        },
        logoCard: {
          width: moderateScale(96),
          height: moderateScale(96),
          borderRadius: moderateScale(12),
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.06,
          shadowRadius: 24,
          elevation: 3,
        },
        logoIconDummy: {
          width: moderateScale(27),
          height: moderateScale(27),
          borderRadius: moderateScale(4),
          backgroundColor: 'rgba(228,189,187,0.4)',
        },
        logoLabelWrap: {
          marginTop: verticalScale(16),
          alignItems: 'center',
          gap: verticalScale(4),
        },
        logoTitle: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#1A1C1C',
          textAlign: 'center',
        },
        logoHint: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#546069',
          textAlign: 'center',
        },

        // ─── Card (shared) ────────────────────────────────
        card: {
          borderRadius: moderateScale(8),
          backgroundColor: Colors.white,
          padding: moderateScale(24),
          gap: verticalScale(24),
          // Layered shadow via elevation
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        },
        cardTitle: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(18),
          lineHeight: moderateScale(28),
          color: '#1A1C1C',
        },
        dropDownLabel: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(15),
          lineHeight: moderateScale(28),
          color: '#1A1C1C',
        },

        // ─── Underline Input ──────────────────────────────
        inputWrap: {
          gap: verticalScale(0),
        },
        inputField: {
          height: verticalScale(41),
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(228,189,187,0.5)',
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(16),
          lineHeight: moderateScale(24),
          color: '#1A1C1C',
          paddingBottom: verticalScale(8),
        },
        inputPlaceholderText: {
          color: '#546069',
        },
        inputRow: {
          flexDirection: 'row',
          gap: moderateScale(24),
        },
        inputHalf: {
          flex: 1,
        },

        // ─── Tower Toggle ─────────────────────────────────
        sectionLabel: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#546069',
        },
        towerRow: {
          flexDirection: 'row',
          gap: moderateScale(16),
          marginTop: verticalScale(12),
        },
        towerBtn: {
          flex: 1,
          borderRadius: moderateScale(4),
          paddingVertical: verticalScale(13),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(228,189,187,0.2)',
          backgroundColor: '#F3F3F3',
        },
        towerBtnActive: {
          borderColor: 'rgba(170,0,29,0.3)',
          backgroundColor: 'rgba(170,0,29,0.05)',
        },
        towerBtnText: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#1A1C1C',
          textAlign: 'center',
        },
        towerBtnTextActive: {
          color: Colors.red,
        },

        // ─── Actions ──────────────────────────────────────
        actionsWrap: {
          gap: verticalScale(16),
          paddingTop: verticalScale(24),
        },
        submitBtn: {
          borderRadius: moderateScale(4),
          backgroundColor: Colors.red,
          paddingVertical: verticalScale(16),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Colors.red,
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.2,
          shadowRadius: 24,
          elevation: 6,
        },
        submitBtnText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#FFFFFF',
          textAlign: 'center',
        },
        cancelWrap: {
          alignItems: 'center',
        },
        cancelText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#546069',
          letterSpacing: moderateScale(1.2),
        },
        modalBackdrop: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: moderateScale(24),
        },
        modalCard: {
          width: '100%',
          borderRadius: moderateScale(12),
          backgroundColor: Colors.white,
          padding: moderateScale(16),
          gap: moderateScale(10),
        },
        modalTitle: {
          fontFamily: fontFamily.semiBold,
          fontSize: moderateScale(16),
          color: '#1A1C1C',
          textAlign: 'center',
          marginBottom: moderateScale(8),
        },
        modalActionButton: {
          minHeight: verticalScale(46),
          borderRadius: moderateScale(8),
          backgroundColor: '#F3F3F3',
          alignItems: 'center',
          justifyContent: 'center',
        },
        modalActionText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          color: '#1A1C1C',
          textAlign: 'center',
        },
        modalCancelButton: {
          minHeight: verticalScale(42),
          alignItems: 'center',
          justifyContent: 'center',
        },
        modalCancelText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          color: Colors.red,
          textAlign: 'center',
        },
        crossBtn: {
          position: 'absolute',
          top: -10,
          right: -5,
          width: 30,
          height: 30,
          borderRadius: moderateScale(15),
          backgroundColor: Colors.darkGray,
          alignItems: 'center',
          justifyContent: 'center',
        },
        crosssBtnText: {
          fontSize: moderateScale(20),
          fontFamily: fontFamily.gaglin,
          fontWeight: 'bold',
          color: Colors.red,
        },
      }),
    [],
  );
};

export default useNewTenantStyles;
