export type TService = {
    _id?: string;
    name: string;
    description: string;
    price: number;
    rating?: number;
    featured?: true;
    image: string;
    duration: number;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};