import { createSlice } from "@reduxjs/toolkit";
import { TBooking, TService } from "../../../types";

type TInitialState = {
    bookingData: null | TBooking;
    serviceData: null | (TService & { slot: string });
};

const initialState: TInitialState = {
    bookingData: null,
    serviceData: null,
};

export const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookingData: (state, action) => {
            state.bookingData = action.payload.bookingData;
            state.serviceData = action.payload.serviceData;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setBookingData } = bookingsSlice.actions;

export default bookingsSlice.reducer;
