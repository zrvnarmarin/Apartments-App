import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    facilities: []
}

const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState,
    reducers: {
        setFacilities: (state, action) => {state.facilities.push(action.payload)}
    }
})

export const { setFacilities } = facilitiesSlice.actions
export default facilitiesSlice.reducer