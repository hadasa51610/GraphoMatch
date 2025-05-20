import { FileType } from "@/types/FileType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./userSlice";


export const AddFile = createAsyncThunk('file/addFile',
    async ({ data, userId }: { data: File, userId: number }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('fileName', data.name);
            formData.append('userId', userId.toString());
            formData.append('type', data.type.includes('image') ? 'image' : 'raw');
            formData.append('imageFile', data);

            const response = await axios.post(`${baseUrl}/api/HandWriting`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const GetFiles = createAsyncThunk('file/getFiles',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/api/HandWriting/ByUser/${userId}`)
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
            })
    }
})