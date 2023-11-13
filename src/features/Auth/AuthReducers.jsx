import {signUpApi} from "./Auth";

const extraReducers=(builder)=>{
    builder.addCase(signUpApi.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.user=action.payload.data;
    })
}

export default extraReducers;