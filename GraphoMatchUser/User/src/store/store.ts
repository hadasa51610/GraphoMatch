import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { feedbackSlice } from "./slices/feedbackSlice";
import { fileSlice } from "./slices/fileSlice";
import { analysisSlice } from "./slices/analysisSlice";
import { jobSlice } from "./slices/jobSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        feedback: feedbackSlice.reducer,
        file: fileSlice.reducer,
        analysis: analysisSlice.reducer,
        job: jobSlice.reducer,
    },
});

export type StoreType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;