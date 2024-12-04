import { createSlice } from "@reduxjs/toolkit"
import { api } from "../Api/Service";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
    },
    reducers: {
        doLogout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        
    },
    extraReducers: (builder) => {
        builder.addMatcher( api.endpoints.login.matchFulfilled, (state, { payload }) => {
            localStorage.setItem('token', payload.token)
            localStorage.setItem('user', JSON.stringify(payload.user))
            state.token = payload.token
            state.user = payload.user
        })
    }
});

export default AuthSlice.reducer;

export const { attempts, doLogout } = AuthSlice.actions;
