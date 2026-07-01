import {StyleSheet, View} from 'react-native';
import TextComp from '@/src/components/TextComp';
import {Dropdown} from 'react-native-element-dropdown';
import CustomImage from '@/src/components/customImage';
import fontFamily from '@/src/styles/fontFamily';
import {horizontalScale, moderateScale} from '@/src/util/responsiveDimension';
import {Text} from 'react-native';
import {Colors} from '@/src/constants/Colors';
import React from 'react';

type AssignTechniCianProp = {
  userList: any[];
  setSelected: React.Dispatch<any>;
  selectedValue: any;
};

const AssignTechnicianDropDown: React.FC<AssignTechniCianProp> = ({
  userList,
  setSelected,
  selectedValue,
}) => {
  return (
    <View style={styles.dropDown}>
      <TextComp isDynamic text="Assignee:" style={styles.statusLabel} />
      <Dropdown
        style={styles.drpDown}
        value={selectedValue}
        placeholder="Unassigned"
        selectedTextStyle={styles.selectedTxtStyle}
        data={userList}
        renderItem={item => {
          return (
            <View style={styles.dropCard}>
              <CustomImage
                uri={item?.image ?? ''}
                height={moderateScale(50)}
                width={moderateScale(50)}
                borderRadius={moderateScale(25)}
              />
              <View>
                <Text style={styles.statusOptionText}>{item?.name}</Text>
                <Text
                  style={[
                    styles.statusOptionText,
                    {fontSize: moderateScale(14)},
                  ]}>
                  {item?.skill}
                </Text>
              </View>
            </View>
          );
        }}
        onChange={item => {
          setSelected(item);
        }}
        labelField={'name'}
        valueField={'id'}></Dropdown>
    </View>
  );
};

export default React.memo(AssignTechnicianDropDown);

const styles = StyleSheet.create({
  dropDown: {
    paddingHorizontal: horizontalScale(40),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  statusLabel: {
    fontFamily: fontFamily.bold,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: '#5B403E',
    letterSpacing: moderateScale(1),
  },
  drpDown: {
    width: '100%',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: 6,
    borderColor: Colors.lightGray,
  },
  dropCard: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    padding: 5,
  },
  statusOptionText: {
    fontFamily: fontFamily.medium,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(20),
    color: '#1A1C1C',
  },
  selectedTxtStyle: {
    fontFamily: fontFamily.medium,
    color: Colors.black,
  },
});
