import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ required_error: "User name/email is required" }),
    password: z.string({ required_error: "Password is required." }),
});

export const registerSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required." }),
    phone: z.string({ required_error: "Phone is required" }),
    address: z.string({ required_error: "Address is required" }),
});