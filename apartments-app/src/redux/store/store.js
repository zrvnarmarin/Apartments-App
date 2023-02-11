import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from './features/facilitiesSlice'

export const store = configureStore({
    reducer: {
        facilities: facilitiesReducer
    }
})