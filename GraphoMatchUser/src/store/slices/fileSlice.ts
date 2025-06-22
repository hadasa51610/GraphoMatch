import { FileType } from "@/types/FileType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
// import axios from "axios";
// import { baseUrl } from "./authSlice";


export const AddFile = createAsyncThunk('file/addFile',
    async ({ data, userId }: { data: File, userId: number }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('fileName', data.name);
            formData.append('userId', userId.toString());
            formData.append('type', data.type.includes('image') ? 'image' : 'raw');
            formData.append('imageFile', data);

            const response = await axiosInstance.post(`/api/HandWriting`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: sessionStorage.getItem('auth_token') ? `Bearer ${sessionStorage.getItem('auth_token')}` : ''
                },
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const DeleteFile = createAsyncThunk('file/deleteFile',
    async (fileId: number, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/api/HandWriting/${fileId}`
                // {
                //     headers: {
                //         Authorization: sessionStorage.getItem('auth_token') ? `Bearer ${sessionStorage.getItem('auth_token')}` : ''
                //     }
                // }
            );
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)

export const GetFiles = createAsyncThunk('file/getFiles',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/HandWriting/ByUser/${userId}`
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


export const fileSlice = createSlice({
    name: 'file',
    initialState: { list: [] as FileType[], loading: true, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetFiles.fulfilled,
                (state, action) => {
                    console.log('Get files succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(GetFiles.rejected,
                (state, action) => {
                    console.log('Get files failed');
                    state.error = action.payload as string;
                }
            ).addCase(GetFiles.pending, (state) => {
                console.log('Get files...');
                state.error = null;
            })
            .addCase(AddFile.fulfilled,
                (state, action) => {
                    console.log('Upload file succeessfully');
                    state.list = [...state.list, { ...action.payload }];
                }
            ).addCase(AddFile.rejected,
                (state, action) => {
                    console.log('Upload file failed');
                    state.error = action.payload as string;
                }
            ).addCase(AddFile.pending, (state) => {
                console.log('Upload file...');
                state.error = null;
            }).addCase(DeleteFile.fulfilled,
                (state, action) => {
                    console.log('Delete file succeessfully');
                    state.list = state.list.filter(file => file.id !== action.payload.id);
                }
            ).addCase(DeleteFile.rejected,
                (state, action) => {
                    console.log('Delete file failed');
                    state.error = action.payload as string;
                }
            ).addCase(DeleteFile.pending, (state) => {
                console.log('Delete file...');
                state.error = null;
            })
    }
})