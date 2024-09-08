import { TService } from "./services.types";
import { TSlot } from "./slots.types";

export type TCustomer = {
    name: string;
    email: string;
    mobile: string;
    address: string;
};

export type TBooking = {
    _id: string;
    customer: TCustomer;
    service: TService;
    slot: TSlot;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
    transactionId: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TFormattedBooking = {
    id: string;
    serviceName: string | null;
    date: string | null;
    startTime: string | null;
    paymentStatus: "pending" | "completed" | "failed";
};
