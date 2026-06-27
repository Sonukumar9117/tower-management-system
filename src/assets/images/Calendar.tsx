import Svg, {Path, Rect} from 'react-native-svg';

export default function Calendar({width = 12, height = 13, color = ''}) {
  return (
    <Svg width="12" height="13" viewBox="0 0 12 13" fill="none">
      <Rect
        x="1"
        y="2"
        width={height}
        height={width}
        rx="2"
        stroke={color}
        strokeWidth="1.2"
      />
      <Path
        d="M3 1V3M9 1V3M1 5H11"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
