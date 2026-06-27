import {View, Text, StyleSheet} from 'react-native';
import { verticalScale } from '../util/responsiveDimension';

type ScreenHeaderProps = {
  heading?: string;
  subHeading?: string;
};
export default function ScreenHeader({
  heading = 'Building Updates',
  subHeading = ' Latest announcements and structural progress.',
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text  style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(10),
    width: '100%',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Poppins-Bold',
  },

  subHeading: {
    // textAlign:'center',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    fontFamily: 'Poppins-Regular',
  },
});
