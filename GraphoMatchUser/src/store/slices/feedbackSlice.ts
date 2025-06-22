import { FeedbackType } from "@/types/FeedbackType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const Get = createAsyncThunk('feedback/get',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/Feedback`)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const Add = createAsyncThunk('feedback/add',
    async (data: FeedbackType, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/api/Feedback`, {
                UserId: data.userId,
                Content: data.content
            })
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: { list: [] as FeedbackType[], loading: true, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Get.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(Get.rejected,
                (state, action) => {
                    console.log('Get feedbacks failed');
                    state.error = action.payload as string;
                }
            ).addCase(Get.pending, (state) => {
                state.error = null;
            })
            .addCase(Add.fulfilled,
                (state, action) => {
                    console.log('Feedback add succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(Add.rejected,
                (state, action) => {
                    console.log('Add feedback failed');
                    state.error = action.payload as string;
                }
            ).addCase(Add.pending, (state) => {
                console.log('Add feedback...');
                state.error = null;
            })
    }
})