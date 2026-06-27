import {View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../util/responsiveDimension';
import {Colors} from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ArrowHeader={
  title:string,
  style:StyleProp<ViewStyle>,
  txtStyle:StyleProp<TextStyle>,
  icon?:boolean,
  onPress:()=>void
}
const ArrowHeader = ({title, style, txtStyle, icon,onPress}:ArrowHeader) => {
  return (
    <View style={[styles.container, style]}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%",paddingHorizontal:20}}>
      <AntDesign name="arrowleft" size={20} color={Colors.black} onPress={onPress}/>
      <Text style={[styles.txt, txtStyle]}>{title}</Text>
      <AntDesign name="arrowleft" size={20} color={Colors.theme} />
        </View>
    </View>
  );
};

export default ArrowHeader;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(100),
    backgroundColor: Colors.theme,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  txt: {
    fontSize: moderateScale(20),
    color: Colors.black,
    fontWeight: '600',
  },
});
