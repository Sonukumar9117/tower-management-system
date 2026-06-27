import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {baseUrl} from '../constants/constants';
import {myLocalStorage} from '../storage/mylocalStorage';
import Toast from 'react-native-toast-message';
import {navigationRef} from '@/App';
import {CommonActions} from '@react-navigation/native';
import {SCREEN_NAME} from '../constants/screenname';

const httpClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
});

// request interceptor
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await myLocalStorage.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// response interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const {status} = error.response;

      if (status === 401) {
        myLocalStorage.remove('authToken');
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: SCREEN_NAME.USER_LOGIN}],
          }),
        );
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ??
            error?.response?.message ??
            'Authentication failed',
        });
        // e.g. window.location.href = "/login";
      } else if (status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Server error, please try again later.',
        });
      }
    } else if (error.request) {
      
      Toast.show({
        type: 'error',
        text1: 'Network error, please try again later.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Network error, please try again later.',
      });
    }

    return Promise.reject(error);
  },
);

export default httpClient;
