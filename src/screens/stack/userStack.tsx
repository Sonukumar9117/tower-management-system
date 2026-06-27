import {SCREEN_NAME} from '@/src/constants/screenname';
import {myLocalStorage} from '@/src/storage/mylocalStorage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useEffect} from 'react';
import {useUser} from '../../storage/store';
import CustomHeader from '../../components/CustomHeader';
import Login from '../auth/Login/Login';
import RaiseComplaint from '../tenant/RaiseComplaint/RaiseComplaint';
import TicketDetails from '../tenant/TicketDetails/TicketDetails';
import CreatePost from '../admin/addPost/addPost';
import NewTenant from '../admin/NewTenant/NewTenant';
import CompanyProfile from '../admin/companyProfile/companyProfile';
import EditPost from '../admin/editPost/editPost';
import EditTenant from '../admin/editTenant/editTenant';
import NotificationScreen from '../notification/NotificationScreen';
import NewTechnicians from '../admin/NewTechnicians/newTechnicians';
import EditTechnician from '../admin/editTechnician/editTechnician';
import UserBottomTabs from './userBottomTab';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  const [isLogin, setIsLogin] = React.useState<boolean | null>(null);
  const [userType, setUserType] = React.useState<string | null>(null);
  const {setUser} = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await myLocalStorage.get('authToken');
      const role = await myLocalStorage.get('role');
      const user = await myLocalStorage.get('user');

      setUser(user, role, token);
      setIsLogin(!!token);
      setUserType(role);
    };
    checkAuth();
  }, []);

  // ⏳ While loading
  if (isLogin === null) {
    return null; // or splash screen
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        !isLogin ? SCREEN_NAME.USER_LOGIN : SCREEN_NAME.USER_BOTTOM_TAB
      }>
      <Stack.Screen name={SCREEN_NAME.USER_LOGIN} component={Login} />

      <Stack.Screen
        name={SCREEN_NAME.USER_BOTTOM_TAB}
        component={UserBottomTabs}
      />
      <Stack.Screen
        name={SCREEN_NAME.RAISE_NEW_COMPLAINT}
        component={RaiseComplaint}
        options={{
          headerShown: true,
          header: () => <CustomHeader title={'Vista Business Tower'} />,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.ADD_POST}
        component={CreatePost}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader title="Ticket#TKT-1042" showBackBtn={true} />
          ),
        }}
        name={SCREEN_NAME.TICKET_DETAILS}
        component={TicketDetails}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        name={SCREEN_NAME.NEW_TENANT}
        component={NewTenant}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        name={SCREEN_NAME.TENANT_PROFILE}
        component={CompanyProfile}
      />
      <Stack.Screen
        name={SCREEN_NAME.POST_EDIT}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        component={EditPost}
      />
      <Stack.Screen
        name={SCREEN_NAME.TENANT_EDIT}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        component={EditTenant}
      />
      <Stack.Screen
        name={SCREEN_NAME.TECHNICIAN_EDIT}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        component={EditTechnician}
      />
      <Stack.Screen
        name={SCREEN_NAME.NOTIFICATION}
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn title={'Vista Business Tower'} />
          ),
        }}
        name={SCREEN_NAME.NEW_TECHNICIAN}
        component={NewTechnicians}
      />
    </Stack.Navigator>
  );
}
