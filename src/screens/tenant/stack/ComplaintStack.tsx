import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complaints from '../Complaints/Complaints';
const StackComplaint = createNativeStackNavigator();

const ComplaintStack = () => {
  return (
    <StackComplaint.Navigator>
      <StackComplaint.Screen name="complaint_lits" component={Complaints} />
    </StackComplaint.Navigator>
  );
};

export default ComplaintStack;
