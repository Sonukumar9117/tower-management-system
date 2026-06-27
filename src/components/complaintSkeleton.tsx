import {View, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../util/responsiveDimension';
import Skeleton from './skeleton';
import {Colors} from '../constants/Colors';

export default function ComplaintSkeleton() {
  return (
    <View style={styles.card}>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Skeleton width="30%" height={25} borderRadius={5} />
        <Skeleton width="30%" height={25} borderRadius={15} />
      </View>
      <Skeleton width="100%" height={25} borderRadius={5} />
      <Skeleton width="100%" height={25} borderRadius={5} />
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: Colors.lightGray,
        }}></View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Skeleton width="30%" height={25} borderRadius={5} />
        <Skeleton width="30%" height={25} borderRadius={5} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(20),
    shadowColor: '#1A1C1C',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    borderLeftWidth: moderateScale(4),
    gap: verticalScale(10),
  },
});
