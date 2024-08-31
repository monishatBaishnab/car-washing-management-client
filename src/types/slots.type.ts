import { TService } from "./services.types";

export type TSlot = {
    _id: string;
    service: string | TService;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
};
export type TTimeSlot = {
    _id: string;
    startTime: string;
    endTime: string;
    isBooked: string;
};

export type TDateSlot = {
    date: string;
    slots: TTimeSlot[];
};
