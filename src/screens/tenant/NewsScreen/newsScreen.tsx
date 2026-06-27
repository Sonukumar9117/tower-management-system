import PostCardSkeleton from '@/src/components/postCardSkeleton';
import ScreenHeader from '@/src/components/ScreenHeader';
import {Colors} from '@/src/constants/Colors';
import {useUser} from '@/src/storage/store';
import {usePostStore} from '@/src/storage/usePostStore';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '@/src/constants/screenname';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import LoaderModal from '@/src/components/loaderModal';
import {styles} from './styles';
import UpdateCard from './partials/updateCard';

const NewsScreen = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    posts,
    isLoading,
    isRefreshing,
    refreshPosts,
    nextPage,
    currentPage,
    totalPages,
    deleting,
  } = usePostStore();

  const {role} = useUser();

  useFocusEffect(
    React.useCallback(() => {
      refreshPosts();
      return () => {};
    }, []),
  );
  const renderItem = ({item}: any) => <UpdateCard item={item} />;
  return (
    <View style={styles.container}>
      <ScreenHeader />

      {(isLoading && posts.length == 0) || isRefreshing ? (
        [...Array(20).keys()].map(el => {
          return <PostCardSkeleton key={el.toString()} />;
        })
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => {
            return item?._id;
          }}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refreshPosts} />
          }
          onEndReached={() => nextPage()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.red}
                style={{padding: 16}}
              />
            ) : currentPage >= totalPages ? (
              <Text style={styles.footerText}>End of List</Text>
            ) : null
          }
          contentContainerStyle={{paddingVertical: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
      {role == 'Admin' ? (
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => {
            navigationRef.navigate(SCREEN_NAME.ADD_POST);
          }}>
          <LinearGradient
            colors={[Colors.red, Colors.bloodRed]}
            start={{x: 0.5, y: 0}}
            end={{x: 1, y: 0.5}}
            style={styles.plusIconContainer}>
            <AntDesign name="plus-circle" size={30} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
      <LoaderModal isVisible={deleting.isDeleting} />
    </View>
  );
};

export default NewsScreen;
