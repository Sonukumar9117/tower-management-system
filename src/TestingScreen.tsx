import {StyleSheet, View, Text, Alert} from 'react-native';
import { useUser } from './storage/store';
export default function TestingScreen() {
 const {role,user,token}=useUser();
 console.log(role,"Role",user,"User",token,"==============Token==============")
  return (
    <View style={styles.primary}>
      <Text>Not implemented yet </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    width: '100%',
  },
});
