import { Appointment } from '@/types/appointment';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { AppointmentDTO } from '@/dtos/appointmentDTO';
import { getAccessToken } from './auth';

export const getAppointmentByOrderID = async (
  orderId: string
): Promise<Appointment | null> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }
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
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updatePlace = async (
  address: string,
  city: string,
  province: string,
  zip: string,
  aid: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const res = await apiClient.put(
      `/appointment/${aid}/place`,
      {
        address: address,
        city: city,
        province: province,
        zip: zip,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.message) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTime = async (
  date: string,
  timeslot: string,
  aid: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const res = await apiClient.put(
      `/appointment/${aid}/date`,
      {
        date: date,
        timeslot: timeslot,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.message) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
