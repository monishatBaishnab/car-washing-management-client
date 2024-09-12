import { createSlice } from "@reduxjs/toolkit";
import { baseApi, tagTypes } from "../../baseApi";
export type TUser = {
    email: string;
    role: string;
    userId: string;
    iat: number;
    exp: number;
};

type TInitialState = {
    user: TUser | null;
    token: string | null;
};

const initialState: TInitialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, () => {
            console.log('logout');
            baseApi.util.invalidateTags(tagTypes); 
        });
    },
});

// Action creators are generated for each case reducer function
export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
