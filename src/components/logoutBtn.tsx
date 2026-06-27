import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../constants/Colors';
import {horizontalScale, moderateScale, verticalScale} from '../util/responsiveDimension';
const LogoutBtn = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <MaterialCommunityIcons name="logout" color={Colors.theme} size={40} />
        <Text style={styles.btnTxt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    // width: '28%',
    width:horizontalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(60),
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 1,
  },
  btn: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: moderateScale(18),
    color: Colors.theme,
    fontWeight: 'bold',
  },
});
export const handleLogout = () => {
  AsyncStorage.clear();

};
