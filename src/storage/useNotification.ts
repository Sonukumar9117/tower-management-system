import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {useUser} from './store';

type NotificationProp = {
  notificationList: any[];
  loading: boolean;
  refreshing: boolean;
  currentPage: number;
  totalPage: number;
  loadingMore: boolean;
  deleting: boolean;
  deleteNotification: (id: string) => Promise<void>;
  markedAllNotificationRead: () => Promise<void>;
  loadMoreNotificationList: () => Promise<void>;
  fetchNotificationList: () => Promise<void>;
  refreshNotificationList: () => Promise<void>;
};
export const useNotification = create<NotificationProp>((set, get) => ({
  deleting: false,
  loadingMore: false,
  currentPage: 1,
  totalPage: 1,
  notificationList: [],
  refreshing: false,
  loading: false,
  fetchNotificationList: async () => {
    const {loading} = get();
    if (loading) return;
    try {
      set({loading: true});
      const response = await httpClient.get(
        `${apiEndPoints.FETCH_NOTIFICATION}?page=${0}&limit=${20}`,
      );

      console.log(response,"This is response after fetching notification");
      
      const {totalPage, currentPage} = response?.data?.pagination;
      set({
        notificationList: response?.data?.notifications ?? [],
        totalPage: totalPage,
        currentPage: currentPage,
      });
      const unreadNotificationCount = response?.data?.unreadNotificationCount;
      useUser.setState(state => ({
        ...state,
        unreadNotificationCount,
      }));
    } catch (error) {
      const err = error as AxiosError;

      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Some thing went wrong.',
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
  markedAllNotificationRead: async () => {
    try {
      const response = httpClient.patch(
        `${apiEndPoints.MARKED_ALL_NOTIFICATION_READ}`,
      );
      useUser.setState(state => ({
        ...state,
        unreadNotificationCount: 0,
      }));
    } catch (error) {
    } finally {
    }
  },
  refreshNotificationList: async () => {
    const {refreshing} = get();
    if (refreshing) return;
    set({refreshing: true});
    try {
      const response = await httpClient.get(
        `${apiEndPoints.FETCH_NOTIFICATION}?page=${0}&limit=${20}`,
      );
      Toast.show({
        type: 'success',
        text1: response?.data?.message ?? 'Notification fetched successfully',
      });
      console.log(response,"Notification fetch");
      
      const {totalPage, currentPage} = response?.data?.pagination;
      set({
        notificationList: response?.data?.notifications ?? [],
        totalPage: totalPage,
        currentPage: currentPage,
      });
      const unreadNotificationCount = response?.data?.unreadNotificationCount;
      useUser.setState(state => ({
        ...state,
        unreadNotificationCount,
      }));
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Some thing went wrong.',
      });
    } finally {
      set({
        refreshing: false,
      });
    }
  },
  loadMoreNotificationList: async () => {
    return;
    const {loadingMore, totalPage, currentPage, notificationList} = get();
    if (loadingMore || currentPage >= totalPage) return;
    try {
      set({loadingMore: true});
      const response = await httpClient.get(
        `${apiEndPoints.FETCH_NOTIFICATION}?page=${
          currentPage + 1
        }&limit=${10}`,
      );

      const {totalPages, page} = response?.data?.data?.pagination;
      set({
        notificationList: [
          ...notificationList,
          ...(response?.data?.data?.notifications ?? []),
        ],
        totalPage: totalPages,
        currentPage: page,
      });
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Some thing went wrong.',
      });
    } finally {
      set({
        loadingMore: false,
      });
    }
  },
  deleteNotification: async (id: string) => {
    const {deleting, fetchNotificationList, notificationList} = get();
    if (deleting) return;
    try {
      set({deleting: true});
      const data = {
        notificationIds: [id],
      };
      const res = await httpClient.delete(
        `${apiEndPoints.FETCH_NOTIFICATION}`,
        {data},
      );
      const newNotificationList = notificationList.filter(
        noti => noti?._id != id,
      );
      set({notificationList: newNotificationList});
      Toast.show({
        type: 'success',
        text1: res?.data?.message,
      });
      // fetchNotificationList();
    } catch (error) {
    } finally {
      set({deleting: false});
    }
  },
}));
