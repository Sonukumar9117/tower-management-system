import {navigationRef} from '@/App';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';
import {UpdateUserProp, User} from './store';

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

export const useTechnicianList = create<UserListStore>((set, get) => ({
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
      mobileNumber,
      image,
      designation,
      experience,
    } = userData;
    try {
      set({isCreating: true});
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('role', role);
      formData.append('mobileNumber', mobileNumber);
      formData.append('designation', designation ?? 'Electrician');
      formData.append('experience', '0');
      if (image?.uri) {
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: Date.now().toString(),
        } as any);
      }
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
    const {userId, name, designation, mobileNumber, image} = userData;
    try {
      set({isCreating: true});
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('name', name);
      formData.append('mobileNumber', mobileNumber);
      formData.append('designation', designation ?? '');
      if (image?.uri) {
        formData.append('image', {
          uri: image?.uri,
          type: image?.type,
          name: image?.name || `${Date.now()}.jpg`,
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
        `${
          apiEndPoints.GET_USER_LIST
        }?role=${'Technician'}&page=${1}&limit=${100}`,
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
        `${
          apiEndPoints.GET_USER_LIST
        }?role=${'Technician'}&page=${1}&limit=${10}`,
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
        `${apiEndPoints.GET_USER_LIST}?role=${'Technician'}&page=${
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
