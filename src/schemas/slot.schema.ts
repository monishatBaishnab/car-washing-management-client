import { z } from "zod";

const createSlotSchema = z
    .object({
        service: z.string({ required_error: "Service is required" }),
        date: z
            .string({ required_error: "Date is required" })
            .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date format, expected dd/mm/yyyy"),
        startTime: z.string().refine(
            (time) => {
                const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
                return timeRegex.test(time);
            },
            { message: `Time format "HH:MM" (24-hour clock).` }
        ),
        endTime: z.string().refine(
            (time) => {
                const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
                return timeRegex.test(time);
            },
            { message: `Time format "HH:MM" (24-hour clock).` }
        ),
    })
    .refine(
        ({ startTime, endTime }) => {
            const startTimeStamp = new Date(`1970-01-01T${startTime}`);
            const endTimeStamp = new Date(`1970-01-01T${endTime}`);

            return startTimeStamp < endTimeStamp;
        },
        { message: "The end time must be after the start time.", path: ["endTime"] }
    );

export default createSlotSchema;
