import { z } from "zod";

export const vehicleSchema = z.object({
    vehicleType: z.string({ required_error: "Vehicle type is required" }), // Adjust the enum as needed if you have specific values
    vehicleBrand: z.string({ required_error: "Vehicle brand is required" }),
    vehicleModel: z.string({ required_error: "Vehicle model is required" }),
    manufacturingYear: z.number({ required_error: "Manufacturing year is required" }),
    registrationPlate: z.string({ required_error: "Registration plate is required" }),
});

export const userInfoSchema = z.object({
    fName: z.string({ required_error: "First name is required" }),
    lName: z.string({ required_error: "Last name is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    mobile: z.string({ required_error: "Mobile number is required" }),
    address: z.string({ required_error: "Write your present address" }),
});
