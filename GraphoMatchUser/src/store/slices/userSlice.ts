import { UserType } from "@/types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const GetUser = createAsyncThunk('data/get',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/User/${userId}`)
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const Update = createAsyncThunk('data/put',
    async ({ data, userId }: { data: UserType; userId: number }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/api/User/${userId}`, {
                Name: data.name,
                Email: data.email,
                Password: data.password,
                Profession: data.profession
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

export const userSlice = createSlice({
    name: 'data',
    initialState: { list: [] as UserType[], loading: true, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUser.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(GetUser.rejected,
                (state, action) => {
                    console.log('Get user by id failed');
                    state.error = action.payload as string;
                }
            ).addCase(GetUser.pending, (state) => {
                state.error = null;
            }).addCase(Update.fulfilled,
                (state, action) => {
                    console.log('User update succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(Update.rejected,
                (state, action) => {
                    console.log('Update user failed');
                    state.error = action.payload as string;
                }
            ).addCase(Update.pending, (state) => {
                console.log('Update user...');
                state.error = null;
            })
    }
})