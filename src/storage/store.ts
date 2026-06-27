import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';
import {navigationRef} from '@/App';
import {SCREEN_NAME} from '../constants/screenname';
import {myLocalStorage} from './mylocalStorage';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {getFcmToken} from '../util/permission';
export type User = {
  id: string;
  name: string;
  role: string;
  email: string;
  image: string;
  building: string;
  company: string;
  floor: string;
  fcmToken: string[];
  mobileNumber: string;
  skill?: string;
};
type UseUserProp = {
  role: string;
  token: string;
  user: User | null;
  unreadNotificationCount: number;
  logOut: () => Promise<void>;
  isLoading: boolean;
  updateUnreadNotificationCount: (count: number) => void;
  setUser: (user: User, role: string, token: string) => void;
};
export const useUser = create<UseUserProp>((set, get) => ({
  unreadNotificationCount: 0,
  isLoading: false,
  role: '',
  token: '',
  user: null,
  skill: '',
  updateUnreadNotificationCount: (count: number) => {
    set({unreadNotificationCount: count});
  },
  logOut: async () => {
    const {isLoading} = get();
    if (isLoading) return;
    try {
      set({isLoading: true});
      const fcmToken = await getFcmToken();
      const response = await httpClient.post(`${apiEndPoints.LOGOUT}`, {
        fcmToken: fcmToken,
      });
      Toast.show({
        type: 'success',
        text1: response?.data?.message ?? 'Logout successful',
      });
      set(initialState => ({...initialState, user: null, role: '', token: ''}));
      myLocalStorage.removeAll();
      navigationRef.reset({
        index: 0,
        routes: [{name: SCREEN_NAME.USER_LOGIN}],
      });
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err?.message ?? 'Some thing got wrong',
      });
    } finally {
      set({isLoading: false});
    }
  },
  setUser: (user: User, role: string, token: string) => {
    return set({user, role, token});
  },
}));

export type UpdateUserProp = {
  userId: string;
  name: string;
  role: string;
  floor: string;
  designation?: string;
  companyName: string;
  mobileNumber: string;
  building: string;
  image: {uri: string; type: string; name: string} | null;
};

export type CreateUserProp = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  floor: string;
  companyName: string;
  mobileNumber: string;
  building: string;
  designation?: string;
  experience?: string;
  image: {uri: string; type: string; name: string};
};

export type ChangePasswordProp = {
  userId: string;
  password: string;
  confirmPassword: string;
};
type UserListStore = {
  currentPage: number;
  totalPages: number;
  isRefreshing: boolean;
  userList: User[];
  loading: boolean;
  isUserPasswordUpdating: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  loadingNextPage: boolean;
  refressUserList: () => Promise<void>;
  createNewUser: (user: CreateUserProp) => Promise<void>;
  updateUser: (user: UpdateUserProp) => Promise<void>;
  setUserList: (users: User[]) => void;
  clearUserList: () => void;
  removeByid: (id: string) => Promise<void>;
  fetchUserList: () => Promise<void>;
  changeUserPassword: (changePasswordProp: ChangePasswordProp) => Promise<void>;
  loadNextPage: () => Promise<void>;
};

export const useUserList = create<UserListStore>((set, get) => ({
  isUserPasswordUpdating: false,
  currentPage: 1,
  totalPages: 1,
  loadingNextPage: false,
  isRefreshing: false,
  isCreating: false,
  userList: [],
  loading: false,
  isDeleting: false,
  setUserList: users => set({userList: users}),

  createNewUser: async (userData: CreateUserProp) => {
    const {isCreating} = get();
    if (isCreating) return;
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      floor,
      companyName,
      mobileNumber,
      building,
      image,
    } = userData;
    try {
      set({isCreating: true});
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('role', role);
      formData.append('floor', floor);
      formData.append('companyName', companyName);
      formData.append('mobileNumber', mobileNumber);
      formData.append('building', building);

      if (image?.uri) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: Date.now().toString(),
        } as any);
      }
      //call api
      const res = await httpClient.post(
        `${apiEndPoints.CREATE_USER}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const {message, data} = res?.data;
      Toast.show({
        type: 'success',
        text1: message ?? 'User Created Successfully.',
      });
      //add new user in it or just call the
      const {fetchUserList} = get();
      fetchUserList();
      navigationRef.goBack();
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err.response?.data?.message,
        text2: err.response?.data?.errors?.[0]?.message,
      });
    } finally {
      set({isCreating: false});
    }
  },

  updateUser: async (userData: UpdateUserProp) => {
    const {isCreating, fetchUserList} = get();
    if (isCreating) return;
    const {
      userId,
      name,
      role,
      floor,
      companyName,
      mobileNumber,
      building,
      image,
    } = userData;
    try {
      set({isCreating: true});
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('name', name);

      // formData.append('role', role);
      formData.append('floor', floor);
      formData.append('companyName', companyName);
      formData.append('mobileNumber', mobileNumber);
      formData.append('building', building);
      if (image?.uri && image?.uri?.length > 0) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: Date.now().toString(),
        } as any);
      }

      const res = await httpClient.put(
        `${apiEndPoints.UPDATE_USER}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Toast.show({
        type: 'success',
        text1: res?.data?.message,
      });
      navigationRef.goBack();
      navigationRef.goBack();
      fetchUserList();
    } catch (err) {
      const error = err as AxiosError;
      const {message, errors} = error?.response?.data;
      Toast.show({
        type: 'error',
        text1: message ?? 'Something went wrong.',
        text2: errors?.[0]?.message ?? '',
      });
    } finally {
      set({isCreating: false});
    }
    //call api
  },

  changeUserPassword: async (changePassword: ChangePasswordProp) => {
    const {isUserPasswordUpdating} = get();
    if (isUserPasswordUpdating) return;
    try {
      set({isUserPasswordUpdating: true});
      const res = await httpClient.put(
        `${apiEndPoints.UPDATE_PASSWORD}`,
        changePassword,
      );
      Toast.show({
        type: 'success',
        text1: res?.data?.message ?? 'Some thing went wrong',
      });
      navigationRef.goBack();
      navigationRef.goBack();
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Some thing went wrong',
        text2:
          err?.response?.data?.errors?.[0]?.message ?? 'Some thing went wrong',
      });
    } finally {
      set({isUserPasswordUpdating: false});
    }
  },

  clearUserList: () => set({userList: []}),

  fetchUserList: async () => {
    try {
      set(state => ({...state, loading: true}));
      const response = await httpClient.get(
        `${apiEndPoints.GET_USER_LIST}?role=${'Tenant'}&page=${1}&limit=${10}`,
      );
      const {page, totalPages} = response?.data?.data?.pagination;
      set(state => ({
        userList: response?.data?.data?.users,
        currentPage: page,
        totalPages: totalPages,
      }));
    } catch (err) {
    } finally {
      set(state => ({...state, loading: false}));
    }
  },

  refressUserList: async () => {
    const {isRefreshing} = get();
    if (isRefreshing) return;
    try {
      set(state => ({...state, isRefreshing: true}));
      const response = await httpClient.get(
        `${apiEndPoints.GET_USER_LIST}?role=${'Tenant'}&page=${1}&limit=${10}`,
      );
      const {page, totalPages} = response?.data?.data?.pagination;
      set(state => ({
        userList: response?.data?.data?.users,
        currentPage: page,
        totalPages: totalPages,
      }));
    } catch (err) {
    } finally {
      set(state => ({...state, isRefreshing: false}));
    }
  },

  loadNextPage: async () => {
    try {
      const {userList, loadingNextPage, currentPage, totalPages: total} = get();
      if (loadingNextPage || currentPage >= total) return;
      set(state => ({...state, loadingNextPage: true}));
      const response = await httpClient.get(
        `${apiEndPoints.GET_USER_LIST}?role=${'Tenant'}&page=${
          currentPage + 1
        }&limit=${10}`,
      );
    
      const {page, totalPages} = response?.data?.data?.pagination;
      set(state => ({
        userList: [...userList, ...response?.data?.data?.users],
        currentPage: page,
        totalPages: totalPages,
      }));
    } catch (err) {
      const error = err as AxiosError;
      console.log(error?.response ?? err?.message);
    } finally {
      set(state => ({...state, loadingNextPage: false}));
    }
  },

  removeByid: async (id: string) => {
    const {isDeleting, userList} = get();
    if (isDeleting) return;
    try {
      set({isDeleting: true});
      const response = await httpClient.delete(
        `${apiEndPoints.DELETE_USER_BY_ID}/${id}`,
      );
      set({userList: userList.filter(user => user?._id != id)}); //this line is written to remove from list
      Toast.show({
        type: 'success',
        text1: 'Tenant deleted successfully.',
      });
      navigationRef.goBack();
      set(state => ({
        userList: state.userList.filter(user => user?._id != id),
      }));
    } catch (error) {
    } finally {
      set({isDeleting: false});
    }
  },
}));
