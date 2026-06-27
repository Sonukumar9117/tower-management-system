import Svg, { Path } from "react-native-svg";

export default function Newstab() {
  return (
    <Svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      >
      <Path
        d="M2 2.25C2 1.55964 2.55964 1 3.25 1H16.75C17.4404 1 18 1.55964 18 2.25V15.75C18 16.4404 17.4404 17 16.75 17H3.25C2.55964 17 2 16.4404 2 15.75V2.25Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <Path
        d="M5 5H15M5 8.5H15M5 12H11.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
