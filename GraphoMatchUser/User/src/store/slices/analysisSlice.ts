import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://localhost:7134/api'

export const GetAnalysis = createAsyncThunk('data/post',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/Analysis/analyze`, JSON.stringify(userId), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const raw = response.data.analysis;

            const jsonMatch = raw.match(/```json\s*([\s\S]*?)\s*```/);

            if (!jsonMatch || jsonMatch.length < 2) {
                throw new Error("Could not extract JSON from the response");
            }

            const parsed = JSON.parse(jsonMatch[1]);

            return parsed;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
)


export const analysisSlice = createSlice({
    name: 'data',
    initialState: {
        list: {
            personalityTraits: [],
            recommendations: [],
        }, loading: true, error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAnalysis.fulfilled,
                (state, action) => {
                    console.log('Get analysis succeessfully');
                    state.list = { ...state.list, ...action.payload };
                }
            ).addCase(GetAnalysis.rejected,
                (state, action) => {
                    console.log('Get analysis failed');
                    state.error = action.payload as string;
                }
            ).addCase(GetAnalysis.pending, (state) => {
                console.log('Get analysis...');
                state.error = null;
            })
    }
})