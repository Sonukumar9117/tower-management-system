import {Colors} from '@/src/constants/Colors';
import {moderateScale} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    paddingHorizontal: 16,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    fontWeight: '700',
    color: Colors.bloodRed,
  },
  likes: {
    fontSize: 14,
    color: '#4B5563',
  },
  readMore: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.gray,
    fontFamily: fontFamily.gaglin,
    textAlign: 'center',
    fontSize: moderateScale(16),
    paddingBottom: 10,
  },
  plusIconContainer: {
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
