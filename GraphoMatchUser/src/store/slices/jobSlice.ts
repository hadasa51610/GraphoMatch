import { JobType } from "@/types/JobType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
// import axios from "axios";
// import { baseUrl } from "./authSlice";


export const GetJobs = createAsyncThunk('job/getJobs',
    async (_, thunkAPI: { rejectWithValue: (value: string) => void }) => {
        try {
            const response = await axiosInstance.get(`api/Job/`
                // {
                //     headers: {
                //         Authorization: sessionStorage.getItem('auth_token') ? `Bearer ${sessionStorage.getItem('auth_token')}` : ''
                //     }
                // }
            )
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const ApplyJob = createAsyncThunk('job/put',
    async ({ id, userId }: { id: number; userId: number }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/api/Job/${id}/seeker/${userId}`
                // {
                //     headers: {
                //         Authorization: sessionStorage.getItem('auth_token') ? `Bearer ${sessionStorage.getItem('auth_token')}` : ''
                //     }
                // }
            )
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const jobSlice = createSlice({
    name: 'job',
    initialState: { list: [] as JobType[], loading: true, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetJobs.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(GetJobs.rejected,
                (state, action) => {
                    console.log('Get jobs failed');
                    state.error = action.payload as string;
                }
            ).addCase(GetJobs.pending, (state) => {
                state.error = null;
            }) .addCase(ApplyJob.fulfilled,
                (state, action) => {
                    console.log('Apply job succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(ApplyJob.rejected,
                (state, action) => {
                    console.log('Apply job failed');
                    state.error = action.payload as string;
                }
            ).addCase(ApplyJob.pending, (state) => {
                console.log('Apply job...');
                state.error = null;
            })
    }
})