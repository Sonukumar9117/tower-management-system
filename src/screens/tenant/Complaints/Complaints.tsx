import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {useComplainStore} from '@/src/storage/useComplainStore';
import {RefreshControl} from 'react-native-gesture-handler';
import {Colors} from '@/src/constants/Colors';
import {useUser} from '@/src/storage/store';
import {useFocusEffect} from '@react-navigation/native';
import ScreenHeader from '@/src/components/ScreenHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ComplaintSkeleton from '@/src/components/complaintSkeleton';
import styles from './styles';
import ComplaintCard from './partial/complaintCard';
import ComplaintHeader from './partial/complaintHeader';

// const statusStyleMap = {
//   Pending: {bg: '#FEE2E2', dot: '#CF2431', text: 'Pending'},
//   Closed: {bg: '#f7f0f0', dot: '#CF2431', text: 'Closed'},
//   'In Progress': {bg: '#FEF3C7', dot: '#F59E0B', text: 'In Progress'},
//   Resolved: {bg: '#DCFCE7', dot: '#16A34A', text: 'Resolved'},
//   Reopened: {bg: '#FEF3C7', dot: '#F59E0B', text: 'In Progress'},
// } as const;

const Complaints = () => {
  const {role} = useUser();
  const {
    isLoading,
    isRefreshing,
    loadingNextPage,
    complaints,
    nextPage,
    fetchComplaints,
    refreshComplaints,
    numberOfPendingComplaint,
    numberOfProgressComplaint,
    numberOfResolvedComplaint,
  } = useComplainStore();

  const [activeTab, setActiveTab] = useState<
    'Pending' | 'IN_PROGRESS' | 'RESOLVED' | ''
  >('');

  //when ever scrren come in focus then api will call
  useFocusEffect(
    React.useCallback(() => {
      fetchComplaints(
        1,
        activeTab == 'IN_PROGRESS'
          ? 'In Progress'
          : activeTab == 'RESOLVED'
          ? 'Resolved'
          : activeTab == 'Pending'
          ? 'Pending'
          : '',
      );
      return () => {};
    }, [activeTab]),
  );

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <ScreenHeader
          heading="Complaints"
          subHeading="Manage your active requests"
        />

        {(isLoading && !loadingNextPage) || isRefreshing ? (
          [1, 2, 3, 4, 5, 6].map(number => (
            <ComplaintSkeleton key={number.toString()} />
          ))
        ) : (
          <FlatList
            data={complaints}
            keyExtractor={item => item?._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListHeaderComponent={() => (
              <ComplaintHeader
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                numberOfPendingComplaint={numberOfPendingComplaint}
                numberOfProgressComplaint={numberOfProgressComplaint}
                numberOfResolvedComplaint={numberOfResolvedComplaint}
              />
            )}
            renderItem={({item}) => (
              <ComplaintCard item={item} key={item?._id} />
            )}
            refreshing={isRefreshing}
            onEndReachedThreshold={0.5}
            onEndReached={() =>
              nextPage(
                activeTab == 'IN_PROGRESS'
                  ? 'In Progress'
                  : activeTab == 'RESOLVED'
                  ? 'Resolved'
                  : activeTab == 'Pending'
                  ? 'Pending'
                  : '',
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() =>
                  refreshComplaints(
                    activeTab == 'IN_PROGRESS'
                      ? 'In Progress'
                      : activeTab == 'RESOLVED'
                      ? 'Resolved'
                      : activeTab == 'Pending'
                      ? 'Pending'
                      : '',
                  )
                }
              />
            }
            ListFooterComponent={() =>
              loadingNextPage ? (
                <ActivityIndicator size={'large'} color={Colors.red} />
              ) : !(isRefreshing || isLoading) && complaints.length != 0 ? (
                <Text
                  style={styles.footerTxtEnd}>
                  End of List
                </Text>
              ) : (
                <Text style={styles.footerTxt}>No complaint Found</Text>
              )
            }
          />
        )}
      </View>
      {role == 'Tenant' ? (
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => {
            navigationRef.navigate(SCREEN_NAME.RAISE_NEW_COMPLAINT);
          }}>
          <LinearGradient
            colors={[Colors.red, Colors.bloodRed]}
            start={{x: 0.5, y: 0}}
            end={{x: 1, y: 0.5}}
            style={styles.floatingBtnPrimary}>
            <AntDesign name="plus-circle" size={30} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Complaints;
