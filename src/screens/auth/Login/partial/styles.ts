import fontFamily from '@/src/styles/fontFamily';
import {moderateScale, verticalScale} from '@/src/styles/scaling';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  brandWrap: {
    marginHorizontal: moderateScale(34),
    position: 'absolute',
    bottom: verticalScale(100),
  },
  verticalAccentWrap: {
    alignItems: 'flex-start',
    marginBottom: verticalScale(32),
  },
  verticalAccent: {
    width: moderateScale(4),
    height: verticalScale(120),
    borderRadius: moderateScale(2),
    backgroundColor: '#A30020',
  },
  verticalAccentFade: {
    width: moderateScale(4),
    height: verticalScale(26),
    marginTop: verticalScale(2),
    borderRadius: moderateScale(2),
    backgroundColor: '#A30020',
    opacity: 0.2,
  },
  titleBlock: {
    alignItems:  'flex-start',
  },
  titlePrimary: {
    fontSize: moderateScale(60),
    lineHeight: moderateScale(75),
    fontFamily: fontFamily.bold,
    color: '#11161B',
    letterSpacing: moderateScale(0.5),
  },
  titleSecondary: {
    fontSize: moderateScale(60),
    lineHeight: moderateScale(75),
    fontFamily: fontFamily.bold,
    color: '#4A5964',
    letterSpacing: moderateScale(0.5),
  },
  subtitleRow: {
    marginTop: verticalScale(25),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  subtitleAccent: {
    width: moderateScale(60),
    height: 1,
    backgroundColor: '#D7BFC5',
  },
  subtitleText: {
    fontSize: moderateScale(22),
    lineHeight: moderateScale(30),
    fontFamily: fontFamily.medium,
    color: '#55646F',
    letterSpacing: moderateScale(3),
  },
});
