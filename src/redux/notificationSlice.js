import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notification:false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        }
    }
})

export const {setNotification}=notificationSlice.actions

export default notificationSlice.reducer;