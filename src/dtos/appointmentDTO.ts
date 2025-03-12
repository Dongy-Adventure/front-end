import { Appointment } from '@/types/appointment';

export type AppointmentDTO = {
    data: {
        address: string;
        appointmentID: string;
        buyerID: string;
        city: string;
        createdAt: string;
        date: string;
        orderID: string;
        province: string;
        sellerID: string;
        timeSlot: string;
        zip: string
    };
    message: string;
    status: number;
    success: boolean;
};
