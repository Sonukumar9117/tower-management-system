import {navigationRef} from '@/App';
import ScreenHeader from '@/src/components/ScreenHeader';
import TenantCard from '@/src/components/tenantCard';
import UserCardSkeleton from '@/src/components/userCardSkeleton';
import {Colors} from '@/src/constants/Colors';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {moderateScale, verticalScale} from '@/src/util/responsiveDimension';
import fontFamily from '@/src/styles/fontFamily';
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTechnicianList } from '@/src/storage/useTechnicianList';

export default function TechnicianDirectoryScreen() {
  const {
    fetchUserList,
    loading,
    userList,
    isRefreshing,
    loadNextPage,
    loadingNextPage,
    refressUserList,
  } = useTechnicianList();
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <View style={styles.primary}>
      <ScreenHeader
        heading="Technicians Directory"
        subHeading="Manage and view companies operating with in the tower."
      />

      {loading || isRefreshing ? (
        <>
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </>
      ) : (
        <FlatList
          data={userList}
          style={{marginTop: verticalScale(20)}}
          contentContainerStyle={{gap: 10}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refressUserList}
            />
          }
          renderItem={info => (
            <TenantCard key={info?.item?.id} user={info.item} />
          )}
          onEndReachedThreshold={0.3}
          onEndReached={loadingNextPage ? () => {} : loadNextPage}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            loadingNextPage ? (
              <ActivityIndicator size={'large'} color={Colors.red} />
            ) : (
              <Text
                style={{
                  color: Colors.gray,
                  fontFamily: fontFamily.gaglin,
                  textAlign: 'center',
                  fontSize: moderateScale(16),
                  paddingBottom: 10,
                }}>
                End of List
              </Text>
            )
          }
        />
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigationRef.navigate(SCREEN_NAME.NEW_TECHNICIAN);
        }}>
        <LinearGradient
          colors={['#AA001D', '#CF2431']}
          start={{x: 0.5, y: 0}}
          end={{x: 1, y: 0.5}}
          style={styles.floatingBtn}>
          <AntDesign name="plus-circle" size={30} color={Colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  floatingBtn: {
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
