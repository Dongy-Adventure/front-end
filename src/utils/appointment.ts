import { Appointment } from '@/types/appointment';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { AppointmentDTO } from '@/dtos/appointmentDTO';
import { getUserId } from './user';
import { getAccessToken } from './auth';

export const getAppointmentByOrderID = async (
  orderId: string
): Promise<Appointment | null> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }
  console.log(orderId);
  try {
    const res: AxiosResponse<AppointmentDTO> = await apiClient.get(
      `/appointment/order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.data.status) {
      console.error(res.data.message);
      return null;
    }
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
