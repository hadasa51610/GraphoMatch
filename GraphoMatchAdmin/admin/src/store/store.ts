import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    },
});

export type StoreType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;