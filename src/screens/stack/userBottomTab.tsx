import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale, verticalScale} from '../../util/responsiveDimension';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import fontFamily from '@/src/styles/fontFamily';
import TextComp from '@/src/components/TextComp';
import {ComplaintsIcon, NewsIcon, ProfileTabIcon} from '@/src/assets/icons';
import CustomHeader from '@/src/components/CustomHeader';
import NewsScreen from '../tenant/NewsScreen/newsScreen';
import Complaints from '../tenant/Complaints/Complaints';
import Profile from '../tenant/Profile/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TenantDirectoryScreen from '../admin/tenantDirectory/tenantDirectoryScreen';
import TechnicianDirectoryScreen from '../admin/technicianDirectory/technicianDirectory';
import {Colors} from '@/src/constants/Colors';
import {useUser} from '@/src/storage/store';

type MainTabParamList = {
  News: undefined;
  Complaints: undefined;
  Profile: undefined;
  Tenants: undefined;
  Technicians: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const adminScreens: {
  name: keyof MainTabParamList;
  component: React.ComponentType<any>;
}[] = [
  {name: 'News', component: NewsScreen},
  {name: 'Complaints', component: Complaints},
  {name: 'Tenants', component: TenantDirectoryScreen},
  {name: 'Technicians', component: TechnicianDirectoryScreen},
  {name: 'Profile', component: Profile},
];

const tenantScreens: {
  name: keyof MainTabParamList;
  component: React.ComponentType<any>;
}[] = [
  {name: 'News', component: NewsScreen},
  {name: 'Complaints', component: Complaints},
  {name: 'Profile', component: Profile},
];

const technicianScreens: {
  name: keyof MainTabParamList;
  component: React.ComponentType<any>;
}[] = [
  {name: 'Complaints', component: Complaints},
  {name: 'Profile', component: Profile},
];

const UserBottomTabs = () => {
  const {role} = useUser();
  const insets = useSafeAreaInsets();
  const isDark = false;
  const inactiveColor = Colors.inactiveTab;
  const activeColor = Colors.bloodRed;
  const currentScreens =
    role == 'TENANT'
      ? tenantScreens
      : role == 'ADMIN'
      ? adminScreens
      : technicianScreens;
  return (
    <Tab.Navigator
      initialRouteName={role == 'TECHNICIAN' ? 'Complaints' : 'News'}
      screenOptions={{
        headerShown: true,
        header: () => <CustomHeader title={'Vista Business Tower'} />,
      }}
      tabBar={({state, descriptors, navigation}) => (
        <View
          style={[
            styles.container,
            {
              paddingBottom: insets.bottom,
              backgroundColor: isDark
                ? 'rgba(28,28,30,0.9)'
                : 'rgba(255,255,255,0.9)',
              paddingHorizontal: role != 'Admin' ? moderateScale(32) : null, //this is new
            },
          ]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconColor = isFocused ? activeColor : inactiveColor;
            const textStyle = {
              color: iconColor,
              fontFamily: fontFamily.medium,
              fontSize: moderateScale(10),
              lineHeight: moderateScale(15),
              letterSpacing: moderateScale(0),
            };

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconMap = {
              News: (
                <NewsIcon
                  width={moderateScale(16)}
                  height={moderateScale(16)}
                  color={iconColor}
                />
              ),
              Complaints: (
                <ComplaintsIcon
                  width={moderateScale(16)}
                  height={moderateScale(16)}
                  color={iconColor}
                />
              ),
              Tenants: (
                <AntDesign
                  name="team"
                  size={moderateScale(16)}
                  color={iconColor}
                />
              ),
              Technicians: (
                <AntDesign
                  name="tool"
                  size={moderateScale(16)}
                  color={iconColor}
                />
              ),
              Profile: (
                <ProfileTabIcon
                  width={moderateScale(16)}
                  height={moderateScale(16)}
                  color={iconColor}
                />
              ),
            } as const;

            const keyMap = {
              News: 'News',
              Complaints: 'Complaints',
              Profile: 'Profile',
              Technicians: 'Technicians',
              Tenants: 'Tenants',
            } as const;

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor: isFocused
                      ? 'rgba(254,242,242,0.5)'
                      : 'transparent',
                    minWidth:
                      role != 'ADMIN' ? moderateScale(90) : moderateScale(40),
                  },
                ]}>
                {iconMap[route.name as keyof typeof iconMap]}
                <TextComp
                  text={keyMap[route.name as keyof typeof keyMap]}
                  style={textStyle}
                />
              </Pressable>
            );
          })}
        </View>
      )}>
      {currentScreens.map(e => {
        return (
          <Tab.Screen key={e.name} name={e?.name} component={e.component} />
        );
      })}
    </Tab.Navigator>
  );
};

export default UserBottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: verticalScale(10),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  
  btnContainer: {
    minWidth: moderateScale(40),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(12),
    gap: verticalScale(4),
  },
});
