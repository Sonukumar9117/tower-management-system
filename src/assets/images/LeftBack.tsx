import Svg, { Path } from "react-native-svg";

export default function LeftBack({width=16,height=16}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
     >
      <Path
        d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825V9"
        fill="#71717A"
      />
    </Svg>
  );
}
