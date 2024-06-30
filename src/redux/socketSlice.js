import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket1: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket1 = action.payload;
        },
    },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
