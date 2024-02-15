import { createReducer, on } from "@ngrx/store";
import { UserAdapter, initalState } from "./user.state";
import { addUserSuccess, deleteUserSuccess, getUserSuccess, loadUserFailure, loadUserSuccess, openPopup, updateUserSuccess } from "./user.actions";



const _userReducer= createReducer(initalState,
    on(loadUserSuccess,(state,action)=>{

        return UserAdapter.setAll(action.list,state);
        
    }),
    on(loadUserFailure,(state,action)=>{
        return{
            ...state,
            list:[],
            errorMessage:action.errorMessage
        }
    }),on(addUserSuccess,(state,action)=>{
        
        return UserAdapter.addOne(action.inputData,state);
    }),
    on(getUserSuccess,(state,action)=>{
        
        return{
            ...state,
            userObj:action.obj,
            errorMessage:''
        }
    }),
    on(updateUserSuccess,(state,action)=>{
        return UserAdapter.updateOne(action.inputData,state);
    }),
    on(deleteUserSuccess,(state,action)=>{
       return UserAdapter.removeOne(action.userName,state);
    })
    );


export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}