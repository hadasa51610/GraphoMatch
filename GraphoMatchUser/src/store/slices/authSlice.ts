import { UserLoginType } from "@/types/UserLoginType";
import { UserType } from "@/types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

export const Login = createAsyncThunk('data/login',
    async (data: UserLoginType, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/api/Auth/login`, {
                Email: data.email,
                Password: data.password
            });
            sessionStorage.setItem('auth_token', response.data.token);
            sessionStorage.setItem('userId', response.data.user.id)
            return response.data;
        }
        catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const Register = createAsyncThunk('data/register',
    async (data: UserType, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/api/Auth/register`, {
                Name: data.name,
                Email: data.email,
                Password: data.password,
                Profession: data.profession
            });
            sessionStorage.setItem('auth_token', response.data.token);
            sessionStorage.setItem('userId', response.data.user.id)
            return response.data;
        }
        catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
            return thunkAPI.rejectWithValue('error occurred');
        }
    }
)


export const authSlice = createSlice({
    name: 'data',
    initialState: { list: [] as UserLoginType[], loading: true, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Login.fulfilled,
                (state, action) => {
                    console.log('User login succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                })
            .addCase(Login.rejected,
                (state, action) => {
                    console.log('User Login failed');
                    state.error = action.payload as string;
                }
            )
            .addCase(Login.pending, (state) => {
                console.log('Loggin in...');
                state.error = null;
            })
            .addCase(Register.fulfilled,
                (state, action) => {
                    console.log('User Register succeessfully');
                    state.list = [...state.list, { ...action.payload }]
                }
            )
            .addCase(Register.rejected,
                (state, action) => {
                    console.log('User Register falied');
                    state.error = action.payload as string;
                }
            )
            .addCase(Register.pending, (state) => {
                console.log('Register in...');
                state.error = null;
            })
    }
});