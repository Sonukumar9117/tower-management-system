import Svg, { Circle, Path } from 'react-native-svg';

export default function ProfileTab({width=16,height=16,color=''}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.5" />
      <Path
        d="M2.5 14C2.5 11.7909 4.29086 10 6.5 10H9.5C11.7091 10 13.5 11.7909 13.5 14V15H2.5V14Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
