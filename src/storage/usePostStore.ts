import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {navigationRef} from '@/App';
import {useUser} from './store';

const PAGE_LIMIT = 5;

interface PostState {
  posts: any[];
  isCreatingPost: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: {success: boolean; message: string} | null;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  deleting: {isDeleting: boolean; id: string};
  createPost: (
    title: string,
    description: string,
    image: {uri: string; type: string; name: string}[],
  ) => void;
  editPost: (
    id: string,
    title: string,
    description: string,
    image: {uri: string; type: string; name: string}[],
  ) => Promise<void>;
  fetchPosts: (page?: number) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  clearError: () => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  currentPage: 0,
  totalPages:0,
  totalPosts: 0,
  isCreatingPost: false,
  isLoading: false,
  isRefreshing: false,
  deleting: {isDeleting: false, id: ''},
  error: null,

  fetchPosts: async (page = 0) => {
    const {isLoading, posts: prevPost} = get();
    if (isLoading) return;

    set({isLoading: true, error: null});

    try {
      const res = await httpClient.get(
        `${apiEndPoints.GET_POST}?page=${page}&limit=${PAGE_LIMIT}`,
      );


       const data = res?.data;
      const {posts:post, pagination}=data
      // const {unreadCount, pagination, posts: post} = data?.data;
      const posts: any[] =page>0?[...prevPost,...post]: [...post];
      // const {total, page: currentPage, totalPages} = pagination;
      set({
        posts,
        currentPage: pagination?.currentPage??0,
        totalPages:pagination.totalPage-1,
        isLoading: false,
      });
      // useUser.setState({unreadNotificationCount: unreadCount});
    } catch (err) {
      const error = err as AxiosError<{message: string}>;
      const message =
        error.response?.data?.message ??
        error.message ??
        'Something went wrong';
      set({error: {success: false, message}, isLoading: false});
    }
    finally{     
      set({isLoading:false})
    }
  },

  refreshPosts: async () => {
    const {isRefreshing} = get();
    if (isRefreshing) return;
    try {
      set({isRefreshing: true, error: null});
      const res = await httpClient.get(
        `${apiEndPoints.GET_POST}?page=${0}&limit=${PAGE_LIMIT}`,
      );
     console.log(res);
     
      const data = res?.data;
      const {posts:post, pagination}=data
      // const {unreadCount, pagination, posts: post} = data?.data;
      const posts: any[] = [...post];
      // const {total, page: currentPage, totalPages} = pagination;
      set({
        posts,
        currentPage:pagination?.currentPage??0,
        totalPages:pagination.totalPage-1,
        totalPosts: 0,
        isRefreshing: false,
      });
      // useUser.setState({unreadNotificationCount: unreadCount});
    } catch (err: any) {
      console.log(err);
      
      const error = err as AxiosError;

      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
      const message =
        err?.response?.data?.message ?? err?.message ?? 'Something went wrong';
      set({error: message, isRefreshing: false});
    }
    finally{
      set({
        isRefreshing:false
      })
    }
  },
  goToPage: page => {
    const {totalPages, fetchPosts} = get();
    if (page < 1 || page > totalPages) return;
    fetchPosts(page);
  },
  nextPage: () => {
    const {currentPage, totalPages, fetchPosts} = get();
    if (currentPage < totalPages) fetchPosts(currentPage + 1);
  },
  prevPage: () => {
    const {currentPage, fetchPosts} = get();
    if (currentPage > 1) fetchPosts(currentPage - 1);
  },
  createPost: async (
    title: string,
    description: string,
    image: {uri: string; type: string; name: string}[],
  ) => {
    set(prev => ({...prev, isCreatingPost: true, error: null}));

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      image.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          type: img.type || 'image/jpeg',
          name: img.name || `photo_${index}.jpg`,
        } as any);
      });

      const res = await httpClient.post(apiEndPoints.CREATE_POST, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      Toast.show({
        type: 'success',
        text1: res?.data?.message ?? 'Post created',
      });
      set(prev => ({
        ...prev,
        // posts: [res?.data?.data, ...prev.posts],
        isCreatingPost: false,
      }));
      navigationRef.goBack();
    } catch (err) {
      const error = err as AxiosError<{message: string}>;

      const message =
        error?.response?.data?.message?.toString() ?? 'Failed to create post';
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message ?? 'Invalid data',
        text2: error?.response?.data?.errors?.[0]?.message ?? 'Failed',
      });
      set(prev => ({...prev, error: message, isCreatingPost: false}));
    } finally {
      set({isCreatingPost: false});
    }
  },
  editPost: async (
    id: string,
    title: string,
    description: string,
    image: {uri: string; type: string; name: string}[],
  ) => {
    const {posts} = get();
    set(prev => ({...prev, isCreatingPost: true, error: null}));
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      image.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          type: img.type || 'image/jpeg',
          name: img.name || `photo_${index}.jpg`,
        } as any);
      });
      const res = await httpClient.put(
        `${apiEndPoints.EDIT_POST}/${id}`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      Toast.show({
        type: 'success',
        text1: res?.data?.message ?? 'Post Edited Successfully.',
      });
      const removedPost = posts.filter(post => post?.id != id);
      set(prev => ({
        ...prev,
        posts: [...removedPost],
        isCreatingPost: false,
      }));
      navigationRef.goBack();
    } catch (err) {
      const error = err as AxiosError<{message: string}>;
      console.log(error?.response);
      
      const message =
        error?.response?.data?.message?.toString() ?? 'Failed to Edit post';
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message ?? 'Invalid data',
        text2: error?.response?.data?.errors?.[0]?.message ?? 'Failed',
      });
      set(prev => ({...prev, error: message, isCreatingPost: false}));
    } finally {
      set({isCreatingPost: false});
    }
  },
  deletePost: async (id: string) => {
    try {
      const {posts} = get();
      set({deleting: {isDeleting: true, id: id}, error: null});
      const res = await httpClient.delete(`${apiEndPoints.DELETE_POST}/${id}`);
      Toast.show({
        type: 'success',
        text1: res?.data?.message,
      });
      const newPost = posts.filter(post => post?.id != id);
      set({deleting: {isDeleting: false, id: ''}, posts: newPost, error: null});
    } catch (err) {
      const error = err as AxiosError;
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
      set({
        deleting: {isDeleting: false, id: ''},
      });
    }
  },
  clearError: () => set({error: null}),
}));
