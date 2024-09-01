export type TCustomer = {
    name: string;
    email: string;
    mobile: string;
    address: string;
};

export type TBooking = {
    customer: TCustomer;
    serviceId: string;
    slotId: string;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
};
