import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function BackArrow({ size = 48, color = '#454545' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <Path
        d="M10 24H38M10 24L18 32M10 24L18 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
