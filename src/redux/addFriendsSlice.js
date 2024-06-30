import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addFriend:false
}

const addFriendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        setAddFriend: (state,action) => {
            state.addFriend = action.payload;
        }
    }
})

export const { setAddFriend} = addFriendSlice.actions;
export default addFriendSlice.reducer;