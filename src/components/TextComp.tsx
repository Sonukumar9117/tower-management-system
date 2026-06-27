import React from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Colors } from '../constants/Colors';



interface TextCompProps extends TextProps {
  text?: string;
  values?: Record<string, any>;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  isDynamic?: boolean;
}

const TextComp: React.FC<TextCompProps> = ({
  text,
  style,
  children,
  values,
  isDynamic = false,
  ...props
}) => {

  if (text && !isDynamic) {
    return (
      <Text style={[{color: Colors.lightGray}, style]} {...props}>
        {text}
      </Text>
    );
  }

  // If no text, just render the children directly
  return (
    <Text style={[{color: Colors.lightGray}, style]} {...props}>
      {text}
    </Text>
  );
};


export default React.memo(TextComp);
