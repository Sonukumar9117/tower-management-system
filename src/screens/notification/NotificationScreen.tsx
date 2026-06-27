import ScreenHeader from '@/src/components/ScreenHeader';
import Skeleton from '@/src/components/skeleton';
import {Colors} from '@/src/constants/Colors';
import {verticalScale} from '@/src/util/responsiveDimension';
import {useNotification} from '@/src/storage/useNotification';
import React from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import LoaderModal from '@/src/components/loaderModal';
import {styles} from './styles';
import NotificationCard from './partial/notificationCard';
import TextComp from '@/src/components/TextComp';

export default function NotificationScreen() {
  const {
    deleting,
    loading,
    refreshing,
    fetchNotificationList,
    notificationList,
    refreshNotificationList,
    loadMoreNotificationList,
    markedAllNotificationRead,
    currentPage,
    totalPage,
    loadingMore,
  } = useNotification();

  useEffect(() => {
    fetchNotificationList();
    // setTimeout(() => {
    //   markedAllNotificationRead();
    // }, 3000);
  }, []);

  if (loading || refreshing)
    return (
      <View style={[styles.primaryContainer, {paddingTop: 10}]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
          <Skeleton key={index} width="100%" height={80} />
        ))}
      </View>
    );

  return (
    <View style={styles.primaryContainer}>
      <View>
        <ScreenHeader heading="Notification" subHeading="All updates" />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: verticalScale(160)}}
        data={notificationList}
        renderItem={item => (
          <NotificationCard
            item={item?.item}
            key={item?.item?._id}
            markReadAll={markedAllNotificationRead}
          />
        )}
        ListEmptyComponent={() => <TextComp style={styles.footerTxt} text="No notification found" />}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (totalPage > currentPage) loadMoreNotificationList();
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshNotificationList}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => (
          <>
            {loadingMore ? (
              <ActivityIndicator size={'large'} color={Colors.red} />
            ) : (
              <View style={styles.footerTxtContainer}>
                {notificationList?.length > 0 ? (
                  <Text style={styles.footerTxt}>End of List</Text>
                ) : null}
              </View>
            )}
          </>
        )}
      />
      <LoaderModal isVisible={deleting} />
    </View>
  );
}
