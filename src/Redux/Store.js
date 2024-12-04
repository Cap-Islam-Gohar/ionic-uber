import { configureStore } from "@reduxjs/toolkit";
import { mapboxApi } from "./Api/mapboxApi";
// import AuthSlice from "./Features/AuthSlice";
// import { api } from "./Api/Service";
// import RootSlice from "./Features/RootSlice";
import directionsReducer from './Features/directionsSlice'

const Store = configureStore({
    reducer: {
        directions: directionsReducer,
        [mapboxApi.reducerPath]: mapboxApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(mapboxApi.middleware)
    },
});

export default Store;