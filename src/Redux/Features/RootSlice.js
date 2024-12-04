import { createSlice } from "@reduxjs/toolkit"

const RootSlice = createSlice({
    name: 'root',
    initialState: {
        notify : {
            show: false,
            time: 3000,
            data: {},
        },
    },
    reducers: {
        notify: (state, { payload }) => {
            state.notify.data = payload;
            state.notify.show = true;
        },
        destroyNotify: (state, actions) => {
            state.notify.show = false;
            state.notify.data = {};
        }
    }
});

export default RootSlice.reducer;

export const { notify, destroyNotify } = RootSlice.actions;
