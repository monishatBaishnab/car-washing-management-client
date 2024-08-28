import { createSlice } from "@reduxjs/toolkit";

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
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
