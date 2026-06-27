import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import fontFamily from '../styles/fontFamily';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../util/responsiveDimension';
import {Colors} from '../constants/Colors';
import Animated, {FadeIn} from 'react-native-reanimated';
type WarningModalProp = {
  message: string;
  onCancel: () => void;
  onOk: () => void;
};
const WarningModal: React.FC<WarningModalProp> = ({
  message,
  onCancel,
  onOk,
}) => {
  return (
    <Animated.View style={styles.modalCont}>
      <View style={styles.container}>
        <View style={styles.primary}>
          <Text style={styles.messageTxt}>
            Are you sure you want to delete this item?
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.gaglin,
              fontSize: moderateScale(14),
              color: Colors.black,
              fontWeight: 'condensedBold',
            }}>
            This action cannot be undone.
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <View style={styles.btnConatiner}>
            <TouchableOpacity style={styles.btnStyle} onPress={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <View style={{width: 1, backgroundColor: Colors.lightGray}}></View>
            <TouchableOpacity
              style={[
                styles.btnStyle,
                {
                  borderBottomStartRadius: moderateScale(0),
                  borderBottomEndRadius: moderateScale(10),
                },
              ]}
              onPress={onOk}>
              <Text style={[styles.btnText, {color: Colors.red}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
export default WarningModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
  },
  primary: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(20),
    padding: 10,
    borderColor: Colors.lightGray,
    paddingVertical: verticalScale(30),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
  },
  btnConatiner: {
    borderTopWidth: 1,
    // borderWidth:1,
    borderTopColor: Colors.lightGray,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnStyle: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(15),

    // backgroundColor: Colors.red,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomStartRadius: moderateScale(10),
    // borderRadius:moderateScale(10)
  },
  btnText: {
    fontFamily: fontFamily.gaglin,
    fontSize: moderateScale(17),
    color: Colors.black,
    fontWeight: '600',
  },
  messageTxt: {
    paddingHorizontal: 10,
    fontFamily: fontFamily.gaglin,
    fontSize: moderateScale(16),
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCont: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
