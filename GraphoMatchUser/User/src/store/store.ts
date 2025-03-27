import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { feedbackSlice } from "./slices/feedbackSlice";
import { fileSlice } from "./slices/fileSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        feedback: feedbackSlice.reducer,
        file: fileSlice.reducer
    },
});

export type StoreType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;