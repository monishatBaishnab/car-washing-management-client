import { TUserResponse } from "./user.types";

export type TReview = {
    user: string | TUserResponse;
    rating: number;
    review: string;
};
