import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {moderateScale, verticalScale} from '../util/responsiveDimension';
import Skeleton from './skeleton';

const UserCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Skeleton
            width={moderateScale(45)}
            height={moderateScale(45)}
            borderRadius={moderateScale(5)}
          />
        </View>
        <View style={styles.headerInfo}>
          <Skeleton
            height={moderateScale(15)}
            borderRadius={moderateScale(0)}
          />
          <Skeleton
            height={moderateScale(15)}
            borderRadius={moderateScale(0)}
          />

          <Skeleton
            width={moderateScale(35)}
            height={moderateScale(15)}
            borderRadius={moderateScale(0)}
          />
        </View>

        <Skeleton
          width={moderateScale(25)}
          height={moderateScale(25)}
          borderRadius={moderateScale(3)}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details */}
      {/* <View style={styles.details}>
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
      </View> */}

      {/* Footer */}
      {/* <View style={styles.footer}>
        <Skeleton height={moderateScale(15)} borderRadius={moderateScale(2)} />
      </View> */}
    </View>
  );
};

export default UserCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginTop: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
    backgroundColor: '#f9fafb',
  },
  avatarWrapper: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 4,
    backgroundColor: '#eff6ff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1d4ed8',
    textTransform: 'capitalize',
  },

  // Divider
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
  },

  // Details
  details: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: verticalScale(15),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '400',
  },
  value: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 16,
  },

  // Footer
  footer: {
    backgroundColor: '#f9fafb',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footerId: {
    fontSize: 11,
    color: '#9ca3af',
    fontFamily: 'monospace',
  },
});
