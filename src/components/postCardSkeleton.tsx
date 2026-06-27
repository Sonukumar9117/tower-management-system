import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../util/responsiveDimension';
import {Colors} from '../constants/Colors';
import Skeleton from './skeleton';

const PostCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <Skeleton
        width="100%"
        height={verticalScale(300)}
        borderRadius={moderateScale(12)}
      />
      {/* <View style={styles.content}>
        <Skeleton
          width="100%"
          height={verticalScale(20)}
          borderRadius={moderateScale(2)}
        />
        <Skeleton
          width="100%"
          height={verticalScale(20)}
          borderRadius={moderateScale(2)}
        />
        <View>
          <Skeleton
            width="100%"
            height={verticalScale(20)}
            borderRadius={moderateScale(2)}
          />
        </View>
      </View> */}
    </View>
  );
};

export default PostCardSkeleton;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(8),
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
  },

  content: {
    padding: 0,
  },
});
