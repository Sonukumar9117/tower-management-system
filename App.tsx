import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {RootStackParamList} from './src/util/navigationUtil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, View, Text, Linking} from 'react-native';
import {useNotification} from './src/storage/useNotification';
import {SCREEN_NAME} from './src/constants/screenname';
import {Colors} from './src/constants/Colors';
import {myLocalStorage} from './src/storage/mylocalStorage';
import {usePostStore} from './src/storage/usePostStore';
import UserStack from './src/screens/stack/userStack';
import {getFcmToken} from './src/util/permission';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useComplainStore} from './src/storage/useComplainStore';
// maven {
//      url("$rootDir/../node_modules/@notifee/react-native/android/libs")
//     }
const linking = {
  prefixes: ['myapp://'],

  async getInitialURL() {
    // Handle deep links first
    const url = await Linking.getInitialURL();


    const message = await messaging().getInitialNotification();
    if (message?.data) {
      const stringItem = message?.data?.item;
      const screenName =
        message?.data?.screen == 'Complaint'
          ? `complaintDetails?ticketDetails=${encodeURIComponent(
              stringItem?.toString(),
            )}`
          : 'userBottomTab';
      if (message?.data?.screen == 'Complaint') {
        useComplainStore
          .getState()
          .findById(JSON.parse(stringItem?.toString())?._id);
      }
      return `myapp://${screenName}`;
    }
  },

  // App opened from background by notification
  subscribe(listener) {
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        if (message?.data) {
          const stringItem = message?.data?.item;
          console.log(
            JSON.parse(stringItem?.toString()),
            'This is string item',
          );

          const screenName =
            message?.data?.screen == 'Complaint'
              ? `complaintDetails?ticketDetails=${encodeURIComponent(
                  stringItem?.toString(),
                )}`
              : 'userBottomTab';
          if (message?.data?.screen != 'Complaint')
            usePostStore.getState().refreshPosts();
          else if (message?.data?.screen == 'Complaint') {
            useComplainStore
              .getState()
              .findById(JSON.parse(stringItem?.toString())?._id);
          }
          const url = `myapp://${screenName}`;
          listener(url);
        }
      },
    );


    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });
    // admin@yopmail.com Test@1234
    //liza@yopmail.com
    return () => {
      unsubscribeNotification();
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      [SCREEN_NAME.NOTIFICATION]: 'notification',
      [SCREEN_NAME.USER_BOTTOM_TAB]: 'userBottomTab',
      [SCREEN_NAME.TICKET_DETAILS]: {
        path: 'complaintDetails',
        parse: {
          ticketDetails: ticketDetails =>
            JSON.parse(decodeURIComponent(ticketDetails)),
        },
      },
    },
  },
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

async function createChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}



export default function App() {
  const {fetchNotificationList} = useNotification();
  const {findById} = useComplainStore();
  useEffect(() => {
    createChannel();
  }, []);
  // Major change testing is here
  useEffect(() => {
    // requestNotificationPermission();
    getFcmToken();

    // Foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      fetchNotificationList(); //when ever new mesage come fetch notificaiton list is called in forground

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
      // Toast.show({
      //   type: 'info',
      //   text1:
      //     remoteMessage?.notification?.title?.toString()?.toString() ??
      //     'A new notification come',
      //   text2:
      //     remoteMessage?.notification?.body?.toString()?.toString() ??
      //     'A new notification come',
      // });
    });

    // App opened from background
    // const unsubscribeOnOpen = messaging().onNotificationOpenedApp(
    //   remoteMessage => {

    //   },
    // );

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('Token refreshed:', token);
    });

    (async () => {
      const token = await myLocalStorage.get('token');
      if (token) fetchNotificationList();
    })();

    return () => {
      unsubscribeOnMessage();
      // unsubscribeOnOpen();
      unsubscribeTokenRefresh();
    };
  }, []);

  useEffect(() => {
    const unSubscribe = notifee.onForegroundEvent(async ({type, detail}) => {
      if (type == EventType.PRESS) {
        const data = detail?.notification?.data;
        console.log(
          data,
          'This is data when notification come and press on click',
        );
        if (data?.screen?.toString() === 'Complaint') {
          findById(JSON.parse(data?.item?.toString() ?? '')?._id);
          navigationRef.navigate(SCREEN_NAME.TICKET_DETAILS, {
            ticketDetails: JSON.parse(data?.item?.toString() ?? ''),
          });
        } else if (data?.screen?.toString() === 'Post') {
          navigationRef?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: SCREEN_NAME.USER_BOTTOM_TAB}],
            }),
          );
        } else {
          navigationRef.navigate(SCREEN_NAME.NOTIFICATION);
        }
      }
    });
    return unSubscribe;
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer linking={linking} ref={navigationRef}>
            <UserStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: Colors.black,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 90,
          right: 10,
        }}>
        <Text style={{color: Colors.white}}> 0.1</Text>
      </View>
      <Toast />
    </>
  );
}


