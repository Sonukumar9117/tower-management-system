import {View, Image, Text, Pressable, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import fontFamily from '../styles/fontFamily';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '../constants/screenname';
import CustomImage from './customImage';
import {capitalizeWords} from '../util/formatTimeDifference';
import React from 'react';
import {moderateScale} from '../util/responsiveDimension';
type TenantCardProps = {
  user: any;
};
function TenantCard({user}: TenantCardProps) {
  
  
  const {
    image,
    skill:designation,
    name,
    role,
    phone,
    companyName,
    floor,
  } = user;
  return (
    <Pressable
      onPress={() =>
        navigationRef.navigate(SCREEN_NAME.TENANT_PROFILE, {user: user})
      }
      style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage
          uri={image}
          width={moderateScale(45)}
          height={moderateScale(45)}
          borderRadius={moderateScale(5)}
        />
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <View>
          <Text
            style={{
              fontFamily: fontFamily.gaglin,
              fontSize: moderateScale(17),
              fontWeight: 'bold',
            }}>
            {role == 'TECHNICIAN' ? name : companyName}
          </Text>
        </View>
        {
          <>
            {true ? (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                {<MaterialIcon name={'phone'} size={20} color="#D32F2F" />}
                <Text style={styles.txt}>{phone}</Text>
              </View>
            ) : null}
            <View style={styles.iconTxtContainer}>
              <MaterialIcon
                name={role == 'TECHNICIAN' ? 'engineering' : 'layers'}
                size={20}
                color="#C62828"
              />
              <Text style={styles.txt}>
                {role == 'TECHNICIAN'
                  ? capitalizeWords(designation ?? '')
                  : floor}
              </Text>
            </View>
          </>
        }
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevron-right" size={20} color="#000" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: moderateScale(10),
  },
  imageContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: fontFamily.gaglin,
    fontSize: moderateScale(15),
    color: Colors.darkGray,
  },
  iconTxtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 4,
  },
});

export default React.memo(TenantCard);
