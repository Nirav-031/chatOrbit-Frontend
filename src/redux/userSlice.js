import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    selectedUser: null,
    login: null,
  
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state,action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setSelectedUser: (state,action) => {
            state.selectedUser = action.payload;
        },
        setIsLogin:(state, action)=> {
            state.login = action.payload;
        },
       
    }
        
    
})


export const {setIsLogin, setAuthUser,setSelectedUser } = userSlice.actions;
export default userSlice.reducer;