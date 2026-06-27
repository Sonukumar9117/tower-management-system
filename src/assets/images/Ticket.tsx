import Svg, {Path} from 'react-native-svg';

export default function Ticket({
  width = 12,
  height = 11,
  color = 'currentColor',
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 11" fill="none">
      <Path
        d="M1 2C1.55228 2 2 1.55228 2 1H11C11 1.55228 11.4477 2 12 2V4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6V8C11.4477 8 11 8.44772 11 9H2C2 8.44772 1.55228 8 1 8V6C1.55228 6 2 5.55228 2 5C2 4.44772 1.55228 4 1 4V2Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 2.5V7.5"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-dasharray="1.2 1.2"
      />
    </Svg>
  );
}
