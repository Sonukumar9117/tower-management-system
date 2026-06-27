import { verticalScale } from "@/src/util/responsiveDimension";
import { moderateScale } from "@/src/styles/scaling";
import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ExpandingInput = ({setText,text}:{setText:any,text:string}) => {

  // Height animation value
  const inputHeight = useSharedValue(50);

  React.useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      inputHeight.value = withTiming(120, { duration: 300 });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      inputHeight.value = withTiming(50, { duration: 300 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: inputHeight.value,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedTextInput
        multiline
        placeholder="Type something..."
        value={text}
        onChangeText={setText}
        style={[styles.input, animatedStyle]}
        textAlignVertical="top"
      />
    </View>
  );
};

export default ExpandingInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    marginBottom:verticalScale(20),
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: moderateScale(16),
    backgroundColor: "#fff",
  },
});