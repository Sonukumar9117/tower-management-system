import Svg, {Path} from 'react-native-svg';

export default function ComplaintTab() {
  return (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <Path
        d="M5.5 2H12.5M6.5 1H11.5C12.0523 1 12.5 1.44772 12.5 2V3H5.5V2C5.5 1.44772 5.94772 1 6.5 1Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M3.5 3H14.5C15.0523 3 15.5 3.44772 15.5 4V18C15.5 18.5523 15.0523 19 14.5 19H3.5C2.94772 19 2.5 18.5523 2.5 18V4C2.5 3.44772 2.94772 3 3.5 3Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <Path
        d="M5.5 7H12.5M5.5 10.5H12.5M5.5 14H10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
