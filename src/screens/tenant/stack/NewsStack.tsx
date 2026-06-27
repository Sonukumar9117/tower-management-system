import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdatesScreen from '../NewsScreen/newsScreen';
import CustomHeader from '@/src/components/CustomHeader';

const TenantStackScreen = createNativeStackNavigator();
const TenantHomeStack = () => {
  return (
    <TenantStackScreen.Navigator
      initialRouteName={'TenantHome'}
      screenOptions={{
        headerShown: false,
      }}>
      <TenantStackScreen.Screen name="TenantHome" component={UpdatesScreen} />
    </TenantStackScreen.Navigator>
  );
};

export default TenantHomeStack;
