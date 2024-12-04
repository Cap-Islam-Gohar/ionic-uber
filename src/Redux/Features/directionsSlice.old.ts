// src/slices/directionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
    id: string;
    name: string;
    coordinates: [number, number];
}

interface DirectionData {
    distance: number | null;
    duration: number | null;
    geometry: any | null;
}

interface DirectionsState {
    origin: [number, number] | null;
    destination: [number, number] | null;
    directions: DirectionData;
    places: Location[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DirectionsState = {
    origin: null,
    destination: null,
    directions: {
        distance: null,
        duration: null,
        geometry: null,
    },
    places: [],
    status: 'idle',
    error: null,
};

const directionsSlice = createSlice({
    name: 'directions',
    initialState,
    reducers: {
        setOrigin(state, action: PayloadAction<[number, number]>) {
            state.origin = action.payload;
        },
        setDestination(state, action: PayloadAction<[number, number]>) {
            state.destination = action.payload;
        },
        setDirections(state, action: PayloadAction<DirectionData>) {
            state.directions = action.payload;
            state.status = 'succeeded';
        },
        setPlaces(state, action: PayloadAction<Location[]>) {
            state.places = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.status = 'failed';
        },
        resetDirections(state) {
            state.origin = null;
            state.destination = null;
            state.directions = {
                distance: null,
                duration: null,
                geometry: null,
            };
            state.places = [];
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const {
    setOrigin,
    setDestination,
    setDirections,
    setPlaces,
    setError,
    resetDirections,
} = directionsSlice.actions;

export const selectOrigin = (state: any) => state.directions.origin;
export const selectDestination = (state: any) => state.directions.destination;
export const selectDirections = (state: any) => state.directions.directions;
export const selectPlaces = (state: any) => state.directions.places;

export default directionsSlice.reducer;

export type { DirectionsState, DirectionData, Location }
