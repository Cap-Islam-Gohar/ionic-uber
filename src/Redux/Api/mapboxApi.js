// src/Api/mapboxApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { DirectionData, setDirections } from '../Features/directionsSlice';

const MAPBOX_BASE_URL = 'https://api.mapbox.com/';
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const mapboxApi = createApi({
    reducerPath: 'mapboxApi',
    baseQuery: fetchBaseQuery({
        baseUrl: MAPBOX_BASE_URL,
    }),
    endpoints: (builder) => ({
        searchPlaces: builder.query({
            query: (searchText) => ({
                url: '/search/geocode/v6/forward',
                params: {
                    q: searchText, // The query text for forward geocoding
                    access_token: MAPBOX_ACCESS_TOKEN, // The required Mapbox API token
                    country: 'eg', // Optional: Restrict search to a specific country (e.g., 'eg' for Egypt)
                    proximity: 'ip', // Optional: Bias search results to the user's IP location
                    types: 'region,address,place,postcode,district,locality,neighborhood,street', // Optional: Restrict results to certain feature types
                    language: 'ar,en', // Optional: Return results in Arabic and English
                    autocomplete: true, // Optional: Enable autocomplete for partial queries
                },
            }),
            transformResponse: (response) => response?.features, // Transform to return only features
        }),
        // New `getDirection` endpoint for directions
        getDirection: builder.query({
            query: ({ places, profile = 'driving' }) => ({
                url: `directions/v5/mapbox/${profile}/${places?.map(place => `${place.longitude},${place.latitude}`).join(';')}`,
                params: {
                    access_token: MAPBOX_ACCESS_TOKEN,
                    // steps: true,  // Optional: Include detailed steps for the route
                    geometries: 'geojson',  // Optional: Return the route as GeoJSON
                    overview: 'full',  // Optional: Show the entire route in the overview
                    // alternatives: true,
                    language: 'en,ar',
                },
            }),
            transformResponse: (response) => response?.routes[0], // Transform to return the first route
        }),
        getLocationName: builder.query({
            query: ({ longitude, latitude }) => ({
                url: `/search/geocode/v6/reverse`,
                params: {
                    access_token: MAPBOX_ACCESS_TOKEN,
                    longitude: longitude,
                    latitude: latitude,
                    // country: 'eg', // Optional: Restrict search to a specific country (e.g., 'eg' for Egypt)
                    // types: 'region,address,place,postcode,district,locality,neighborhood,street', // Optional: Restrict results to certain feature types
                    // language: 'ar,en', // Optional: Return results in Arabic and English
                },
            }),
            transformResponse: (response) => response?.features[0], // Transform to return the first route
        }),
    }),
});

// Export hooks for usage in components
export const { useSearchPlacesQuery, useGetDirectionQuery, useGetLocationNameQuery } = mapboxApi;

