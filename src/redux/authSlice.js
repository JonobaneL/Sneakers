import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAsync } from "../hooks/useAsync";
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
    uid:null,
    email:null,
    token:null,
}
export const signUp2 = createAsyncThunk(
    'auth/signUp',
    async(userInfo,{dispatch,rejectWithValue,getState}) => {
        try{
            const response = await createUserWithEmailAndPassword(auth,userInfo.email,userInfo.password)
            console.log(response)
            dispatch(signUp1(response))

        }catch(err){
            console.log(err)
        }
}
)
// const login = (email,password) => {
//     return signInWithEmailAndPassword(auth,email,password)
// }
// const logout = () => {
//     return signOut(auth);
// }
// const resetPassword = email =>{
//     return sendPasswordResetEmail(auth,email);
// }
// const updateUserEmail = email =>{
//     return updateEmail(currentUser,email);
// }
// const updateUserPassword = password =>{
//     return updatePassword(currentUser,password);
// }

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signUp1(state,action){
            state.uid = action.payload.user.uid;
            state.email = action.payload.user.email;
            state.token = action.payload.user.accessToken;
        },
        logIn1(state,action){
            const user = {...action.payload}
            console.log(user)
            
        }
    },

})
export const {signUp1,logIn1} = authSlice.actions;
export default authSlice.reducer