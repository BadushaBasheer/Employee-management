import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAdapter, UsersState } from "./user.state";

const getUsersState= createFeatureSelector<UsersState>('users');

const userSelector=UserAdapter.getSelectors();


export const getUsersList=createSelector(getUsersState,userSelector.selectAll);

export const getUser=createSelector(getUsersState,(state)=>{
    return state.userObj;
})
const selectedentities = createSelector(getUsersState, userSelector.selectEntities)