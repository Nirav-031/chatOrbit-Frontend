import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userMessage: [],
    loading: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessageSlice: (state,action) => {
            state.userMessage = action.payload;
        },
        setsLoadingIndicator: (state,action) => {
            state.loading = action.payload;
        }  
    }
})


export const { setMessageSlice,setsLoadingIndicator } = messageSlice.actions;
export default messageSlice.reducer;
