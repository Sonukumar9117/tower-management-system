import {Colors} from '@/src/constants/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  primaryContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    gap: 5,
  },
  notiContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    // backgroundColor: Colors.lightGray,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dotContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  titleText: {
    fontFamily: fontFamily.gaglin,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
  },
  descriptionText: {
    fontFamily: fontFamily.gaglin,
    fontSize: moderateScale(14),
    color: Colors.black,
  },
  footerTxt: {
    color: Colors.gray,
    fontFamily: fontFamily.gaglin,
    textAlign: 'center',
    fontSize: moderateScale(16),
    paddingBottom: 10,
  },
  footerTxtContainer: {
    width: '100%',
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSeparator: {
    width: '100%',
    height: 10,
    // backgroundColor: Colors.white,
  },
});
