import { TUserResponse } from "./user.types";

export type TReview = {
    _id?: string;
    user: string | TUserResponse;
    rating: number;
    review: string;
};
