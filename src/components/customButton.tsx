import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  Alert,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

type ButtonProps = {
  styling: StyleProp<ViewStyle>;
  title: string;
  btnTxtStyle: StyleProp<TextStyle>;
  onPress: () => void;
  loader: boolean;
  icon?: boolean;
  disabled?: boolean;
};
const CustomButton = ({
  styling,
  title,
  btnTxtStyle,
  onPress,
  loader,
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttonContainer, styling]}
        onPress={() => {
          onPress();
        }}>
        {icon && icon}
        {loader ? (
          <ActivityIndicator color={Colors.white} size={'small'} />
        ) : (
          <Text style={[styles.btnTitle, btnTxtStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFBF16',
    borderRadius: 30,
    padding: 5,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
