import { combineSlices, configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: combineSlices(
        
    ),
});

export type StoreType = ReturnType<typeof store.getState>

export default store