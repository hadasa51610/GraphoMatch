import { JobType } from "@/types/JobType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./userSlice";


export const GetJobs = createAsyncThunk('job/getJobs',
    async (_, thunkAPI: { rejectWithValue: (value: string) => void }) => {
        try {
            const response = await axios.get(`${baseUrl}/api/Job/`)
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
            const response = await axios.put(`${baseUrl}/api/Job/${id}/seeker/${userId}`)
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