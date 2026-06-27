import {Colors} from '@/src/constants/Colors';
import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useRaiseComplaintStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F9F9F9',
          paddingBottom: verticalScale(20),
        },

        dummyIcon: {
          width: moderateScale(16),
          height: moderateScale(16),
          borderRadius: moderateScale(4),
          backgroundColor: '#71717A',
        },
        scrollContent: {
          paddingHorizontal: moderateScale(24),
          paddingTop: verticalScale(32),
          paddingBottom: verticalScale(28),
          gap: verticalScale(40),
        },
        section: {
          gap: verticalScale(16),
        },
        sectionTitle: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(18),
          lineHeight: moderateScale(28),
          color:Colors.brownishBlack,
          textAlign:  'left',
        },
        categoryGrid: {
          flexDirection:  'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: moderateScale(12),
        },
        categoryButton: {
          width: '48%',
          flexDirection:  'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: moderateScale(8),
          paddingVertical: verticalScale(16),
          borderRadius: moderateScale(6),
          backgroundColor: Colors.white,
          shadowColor: Colors.black,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.08,
          shadowRadius: 2,
          elevation: 1,
        },
        categoryText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(15),
          lineHeight: moderateScale(24),
          color: Colors.brownishBlack,
        },
        inputBackground: {
          backgroundColor: '#F3F3F3',
          borderRadius: moderateScale(6),
          padding: moderateScale(4),
        },
        inputBase: {
          borderBottomWidth: 2,
          borderBottomColor: 'rgba(228, 189, 187, 0.2)',
          paddingHorizontal: moderateScale(16),
          justifyContent: 'center',
        },
        titleInput: {
          minHeight: verticalScale(56),
        },
        descInput: {
          minHeight: verticalScale(120),
          paddingVertical: verticalScale(8),
        },
        inputText: {
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(16),
          color: Colors.black,
          textAlign: false ? 'right' : 'left',
          writingDirection: false ? 'rtl' : 'ltr',
        },
        uploadBox: {
          borderRadius: moderateScale(6),
          borderWidth: 2,
          borderColor: 'rgba(228, 189, 187, 0.3)',
          borderStyle: 'dashed',
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: verticalScale(28),
          paddingHorizontal: moderateScale(20),
        },
        uploadIcon: {
          width: moderateScale(33),
          height: moderateScale(30),
          borderRadius: moderateScale(6),
          backgroundColor:Colors.red,
          opacity: 0.2,
        },
        uploadTitle: {
          marginTop: verticalScale(12),
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(20),
          color: '#546069',
          textAlign: 'center',
        },
        uploadSubtitle: {
          marginTop: verticalScale(4),
          fontFamily: fontFamily.regular,
          fontSize: moderateScale(12),
          lineHeight: moderateScale(16),
          color: '#BBC8D3',
          textAlign: 'center',
        },
        photoList: {
          flexDirection:  'row',
          gap: moderateScale(8),
        },
        photoPreview: {
          width: moderateScale(72),
          height: moderateScale(72),
          borderRadius: moderateScale(8),
          backgroundColor: '#E5E7EB',
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
          color: Colors.brownishBlack,
          textAlign: 'center',
          marginBottom: moderateScale(8),
        },
        modalActionButton: {
          minHeight: verticalScale(46),
          borderRadius: moderateScale(8),
          backgroundColor: Colors.lightGrayishWhite,
          alignItems: 'center',
          justifyContent: 'center',
        },
        modalActionText: {
          fontFamily: fontFamily.medium,
          fontSize: moderateScale(14),
          color: Colors.brownishBlack,
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
        submitButton: {
          alignSelf: 'stretch',
          borderRadius: moderateScale(6),
          backgroundColor: Colors.red,
          shadowColor: Colors.red,
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.2,
          shadowRadius: 24,
          elevation: 3,
          paddingVertical: verticalScale(10),
        },
        submitText: {
          fontFamily: fontFamily.bold,
          fontSize: moderateScale(18),
          lineHeight: moderateScale(28),
          color: Colors.white,
          textAlign: 'center',
        },
        activiyIndicatorContainer: {
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        crossTxt: {
          fontSize: moderateScale(20),
          fontFamily: fontFamily.gaglin,
          fontWeight: 'bold',
          color: Colors.red,
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
      }),
    [],
  );
};

export default useRaiseComplaintStyles;
