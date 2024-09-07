export type TUserResponse = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: "admin" | "user";
    address: string;
};
