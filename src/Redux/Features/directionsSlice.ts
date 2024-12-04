// src/slices/directionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
    current: null,
    origin: null,
    destination: null,
    directions: null,
    status: 'idle',
    error: null,
};

const directionsSlice = createSlice({
    name: 'directions',
    initialState,
    reducers: {
        setCurrent(state, action){
            state.current = action.payload
        },
        setOrigin(state, action) {
            state.origin = action.payload;
        },
        setDestination(state, action) {
            state.destination = action.payload;
        },
        setDirections(state, action) {
            state.directions = action.payload;
            state.status = 'succeeded';
        },
        setError(state, action) {
            state.error = action.payload;
            state.status = 'failed';
        },
        resetDirections(state) {
            state.current = null,
            state.origin = null;
            state.destination = null;
            state.directions = null,
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const {
    setCurrent,
    setOrigin,
    setDestination,
    setDirections,
    setError,
    resetDirections,
} = directionsSlice.actions;

export const selectCurrent = (state) => state.directions.current;
export const selectOrigin = (state) => state.directions.origin;
export const selectDestination = (state) => state.directions.destination;
export const selectDirections = (state) => state.directions.directions;

export default directionsSlice.reducer;
