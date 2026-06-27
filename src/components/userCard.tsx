import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { moderateScale } from '../util/responsiveDimension';
import { Colors } from '../constants/Colors';

const user = {
  _id: '69de1ce049f3f355d0cdc21e',
  role: 'user',
  image: 'http://vista-tower-backend.onrender.com/uploads/1776164064300-247494037.png',
  building: '1',
  name: 'dscds',
  email: 's1@yopmail.com',
  floor: '1',
  companyName: 'cdscdsc',
  mobileNumber: 'cdscds',
  createdAt: '2026-04-14T10:54:24.755Z',
  updatedAt: '2026-04-14T10:54:24.755Z',
};

type UserCardProps={
    user:any;
    deletingInfo:{isDeleting:boolean,id:string};
    handleDelete:(id:string)=>void;
}

const InfoRow = ({ label='', value='' }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const UserCard = ({ user,deletingInfo,handleDelete }:UserCardProps) => {
  const initials = user.name
    ? user.name.slice(0, 2).toUpperCase()
    : '??';

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user?.image??"https://img.freepik.com/premium-photo/handsome-man-buttoning-shirt-handsome-young-man-buttoning-his-white-shirt-looking-camera_425904-34391.jpg" }}
            style={styles.avatar}
            // defaultSource={require('./assets/placeholder.png')} // optional
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </View>
        <TouchableOpacity disabled={deletingInfo.isDeleting} onPress={()=>{handleDelete(user?._id)}}>
            {deletingInfo?.id==user?._id?<ActivityIndicator size={'large'} color={Colors.red}/>:<Icon name="delete" size={moderateScale(25)} color={Colors.red} />}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <InfoRow label="Company" value={user.companyName} />
        <InfoRow label="Mobile" value={user.mobileNumber} />
        <InfoRow label="Building" value={`Building ${user.building}`} />
        <InfoRow label="Floor" value={`Floor ${user.floor}`} />
        <InfoRow label="Member since" value={formattedDate} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerId}>ID: {user._id}</Text>
      </View>
    </View>
  );
};

export default UserCard;
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
    width: 64,
    height: 64,
    borderRadius: 32,
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
    paddingVertical: 12,
    gap: 10,
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
