import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {navigationRef} from '@/App';
import {useUser} from './store';

interface ComplaintState {
  complaints: any[];
  isAssiningTechnician: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isRefreshing: boolean;
  loadingNextPage: boolean;
  error: {success: boolean; message: string} | null;
  currentPage: number;
  totalPages: number;
  totalComplaints: number;
  numberOfProgressComplaint: number;
  numberOfPendingComplaint: number;
  numberOfResolvedComplaint: number;
  isUpdating: boolean;
  deleting: {isDeleting: boolean; id: string};
  assignTechnician: ({
    complaintId,
    technicianId,
  }: {
    complaintId: string;
    technicianId: string;
  }) => Promise<void>;
  fetchComplaints: (page?: number, status?: string) => Promise<void>;
  deleteComplaints: (id: string) => Promise<void>;
  refreshComplaints: (status?: string) => Promise<void>;
  updateComplaintStatusByAdmin: (
    complaintId: string,
    status?: string,
    saverity?: string,
    adminComment?: string,
  ) => Promise<void>;
  createComplaint: (data: {
    title: string;
    floor: string;
    concernedDepartment?: string;
    daysFacingIssue?: string;
    description?: string;
    oadingNextPage: boolean;
    building?: string;
    companyName?: string;
    photo?: {uri: string; type: string; name: string}[];
  }) => Promise<void>;
  findById: (id: string) => Promise<void>;
  nextPage: (status?: string) => void;
}
export const useComplainStore = create<ComplaintState>((set, get) => ({
  isAssiningTechnician: false,
  loadingNextPage: false,
  numberOfResolvedComplaint: 0,
  complaints: [],
  currentPage: 1,
  totalPages: 1,
  totalComplaints: 0,
  isLoading: false,
  isRefreshing: false,
  isCreating: false,
  isUpdating: false,
  numberOfPendingComplaint: 0,
  numberOfProgressComplaint: 0,
  deleting: {isDeleting: false, id: ''},

  assignTechnician: async ({complaintId, technicianId}) => {
    const {isAssiningTechnician, fetchComplaints} = get();
    if (isAssiningTechnician) return;
    try {
      set({isAssiningTechnician: true});
      const res = await httpClient.patch(`${apiEndPoints.ASSIGN_TECHNICIAN}`, {
        complaintId,
        technicianId,
      });
      fetchComplaints();
    } catch (error) {
      const err = error as AxiosError;

      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ??
          err?.response?.message ??
          'Failed to assign technician',
      });
    } finally {
      set({
        isAssiningTechnician: false,
      });
    }
  },

  fetchComplaints: async (page = 0, status = '') => {
    const {isLoading} = get();
    if (isLoading) return;

    try {
      set({isLoading: true});
      const api = status
        ? `${apiEndPoints.COPLAINT_LIST_STATUS}/${status.toUpperCase()}`
        : apiEndPoints.GET_COMPLAINT_LIST;
      const res = await httpClient.get(`${api}?page=${page}&limit=5`);
   
      const {complaints:currentComplaints,counts,pagination}=res?.data;
    

      set({
        numberOfPendingComplaint: counts?.pending ?? 0,
        numberOfProgressComplaint:counts?.inProgress,
        numberOfResolvedComplaint: counts?.resolved,
      });
      if (!Array.isArray(currentComplaints)) {
        throw new Error('Unexpected response format');
      }

      const {currentPage: currPage, totalPage} = pagination ?? {}; 
      set(prev => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        loadingNextPage: false,
        complaints:
          page === 0
            ? [...currentComplaints]
            : [...prev.complaints, ...currentComplaints],
        currentPage: currPage,
        totalPages: totalPage,
      }));
    } catch (err) {
      const error = err as AxiosError<{message: string}>;
      const message =
        error.response?.data?.message ??
        error.message ??
        'Something went wrong';

      Toast.show({type: 'error', text1: message});

      set({
        error: {success: false, message},
        isLoading: false,
        isRefreshing: false,
        loadingNextPage: false,
      });
    }
  },

  deleteComplaints: async (id: string) => {
    const {deleting, fetchComplaints} = get();
    if (deleting.isDeleting) return;
    try {
      set({deleting: {isDeleting: true, id: id}});
      const res = await httpClient.delete(
        `${apiEndPoints.DELETE_COMPLAINTS_BY_ID}/${id}`,
      );
      Toast.show({
        type: 'success',
        text1: res?.data?.message ?? 'Complaint deleted',
      });
      fetchComplaints();
      navigationRef.goBack();
    } catch (error) {
      const err = error as AxiosError;
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Failed',
      });
    } finally {
      set({deleting: {isDeleting: false, id: ''}});
    }
  },

  refreshComplaints: async (status = '') => {
    const {fetchComplaints, isRefreshing} = get();
    if (isRefreshing) return;
    set({isRefreshing: true});
    await fetchComplaints(0, status);
    set({isRefreshing: false});
  },

  nextPage: async (status = '') => {
    
    const {currentPage, totalPages, fetchComplaints, loadingNextPage} = get();
    if (loadingNextPage) return;
       
    if (currentPage < totalPages) {
      set({loadingNextPage: true});
       console.log("Next Page is called");
      await fetchComplaints(currentPage + 1, status);
      set({loadingNextPage: false, isLoading: false});
    }
  },

  createComplaint: async ({
    title = '',
    floor = '',
    concernedDepartment = '',
    daysFacingIssue = '',
    description = '',
    building = '',
    companyName = '',
    photo = [{uri: '', type: '', name: ''}],
  }) => {
    set({isCreating: true});
    const {fetchComplaints} = get();
    try {
      const formData = new FormData();
      formData.append('title', title?.trim());
      // formData.append('floor', floor?.trim());
      formData.append('concernedDepartment', concernedDepartment?.trim().toUpperCase());
      formData.append('daysFacingIssue', daysFacingIssue?.trim());
      formData.append('description', description?.trim());
      formData.append('building', building?.trim());
      // formData.append('companyName', companyName?.trim());
      photo.forEach((img, index) => {
        formData.append('photo', {
          uri: img.uri,
          type: img.type || 'image/jpeg',
          name: img.name || `photo_${index}.jpg`,
        } as any);
      });

      const res = await httpClient.post(
        `${apiEndPoints.CREATE_COMPLAINT}`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      Toast.show({
        type: 'success',
        text1: res?.data?.message,
      });
      navigationRef.current?.goBack();
      fetchComplaints(0);
    } catch (error) {
      const err = error as AxiosError<{message: string}>;
      console.log(err?.response);
      
      const message =
        err.response?.data?.message ??
        err.message ??
        'Failed to create complaint';

      Toast.show({
        type: 'error',
        text1: message,
        text2: err.response?.data?.errors?.[0]?.message,
      });
    } finally {
      set({isCreating: false});
    }
  },

  updateComplaintStatusByAdmin: async (
    complaintId: string,
    status?: string,
    saverity?: string,
    adminComment?: string,
  ) => {
    const {isUpdating, complaints} = get();
    if ((!status && !saverity && !adminComment) || isUpdating) return;
    type DataType = {
      complaintStatus?: string;
      severity?: string;
      adminComment?: string;
    };
    try {
      set({isUpdating: true});
      const data: DataType = {};
      if (status) data.complaintStatus = status?.trim();
      if (saverity) data.severity = saverity?.trim();
      if (adminComment) data.adminComment = adminComment?.trim();

      const response = await httpClient.put(
        `${apiEndPoints.UPDATE_COMPLAINT_BY_ADMIN}/${complaintId}`,
        data,
      );
      
      const updatedComplaints = complaints.map(complaint => {
        if (complaint?._id == complaintId) {
          return {...complaint, ...response?.data?.data};
        } else return complaint;
      });

      set({complaints: updatedComplaints});
      Toast.show({
        type: 'success',
        text1: response?.data?.message,
      });
    } catch (err) {
      const error = err as AxiosError;
    
      Toast.show({
        type: 'error',
        text1:
          error?.response?.data?.errors?.[0]?.message ??
          error?.response?.data?.message ??
          'Something went wrong',
      });
    } finally {
      set({isUpdating: false});
    }
  },

  findById: async (id: string) => {
    const {isLoading, complaints} = get();
    try {
      if (isLoading) return;
      const removeComplaint = complaints.filter(
        complaint => complaint?._id != id,
      );

      set({isLoading: true});
      const res = await httpClient.get(
        `${apiEndPoints.FIND_COMPLAINT_BY_ID}/${id}`,
      );
      useUser.setState({unreadNotificationCount: res?.data?.data?.unreadCount});
      set({complaints: [...removeComplaint, res?.data?.data?.complaint]});
    } catch (err) {
    } finally {
      set({isLoading: false});
    }
  },
  error: null,
}));
