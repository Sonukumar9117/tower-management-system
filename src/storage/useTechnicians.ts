import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {create} from 'zustand';
import httpClient from '../config/interceptor';
import {apiEndPoints} from '../constants/apiEndPoints';

type TechnicianProp = {
  isLoading: boolean;
  isUpdatingStatus: boolean;
  complaintList: any[];
  updateTechnicianStatus: ({
    complaintId,
    technicianStatus,
  }: {
    complaintId: string;
    technicianStatus: string;
  }) => Promise<void>;
  //   fetchAssignedComplaintList: ({
  //     complaintId,
  //     technicianStatus,
  //   }: {
  //     complaintId: string;
  //     technicianStatus: string;
  //   }) => Promise<void>;
};

export const useTechnician = create<TechnicianProp>((set, get) => ({
  isLoading: false,
  isUpdatingStatus: false,
  complaintList: [],

  updateTechnicianStatus: async ({complaintId, technicianStatus}) => {
    const {isUpdatingStatus} = get();
    if (isUpdatingStatus) return;
    try {
      set({isUpdatingStatus: true});

      const response = await httpClient.patch(
        `${apiEndPoints.UPDATE_TECHNICIAN_STATUS}`,
        {complaintId: complaintId, complaintStatus: technicianStatus},
      );

      if (response?.data?.success) {
        Toast.show({
          type: 'success',
          text1: response?.data?.message,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err?.response);

      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message ?? 'Something went wrong',
      });
    } finally {
      set({isUpdatingStatus: false});
    }
  },
}));
