import { FeedbackType } from "@/types/FeedbackType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://localhost:7134/api'

export const Get = createAsyncThunk('data/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/Feedback`)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const Add = createAsyncThunk('data/post',
    async (data: FeedbackType, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/Feedback`, {
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
    name: 'data',
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