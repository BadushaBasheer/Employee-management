import { createAction, props } from "@ngrx/store";
import { User, UserCred } from "../model/user";
import { Update } from "@ngrx/entity";

export const BEGIN_REGISTER='[auth] begin register'

export const BEGIN_LOGIN='[auth] begin login';
export const LOGIN_SUCCESS='[auth] login success';

export const LOAD_USER='[admin page] load user';
export const LOAD_USER_SUCCESS='[admin page] load user success';
export const LOAD_USER_FAILURE='[admin page] load user failure';

export const ADD_USER='[admin page] add user';
export const ADD_USER_SUCCESS='[admin page] add user success';

export const UPDATE_USER='[admin page] update user';
export const UPDATE_USER_SUCCESS='[admin page] update user success';

export const GET_USER='[admin page] get user';
export const GET_USER_SUCCESS='[admin page] get user success';

export const OPEN_POPUP='[admin page] open popup';

export const DELETE_USER='[admin page] delete user';
export const DELETE_USER_SUCCESS='[admin page] delete user success';





export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:User}>())

export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:UserCred}>());
export const loginSuccess=createAction(LOGIN_SUCCESS);

export const loadUser=createAction(LOAD_USER);
export const loadUserSuccess=createAction(LOAD_USER_SUCCESS,props<{list:User[]}>());
export const loadUserFailure=createAction(LOAD_USER_FAILURE,props<{errorMessage:string}>());

export const addUser=createAction(ADD_USER,props<{inputData:User}>());
export const addUserSuccess=createAction(ADD_USER_SUCCESS,props<{inputData:User}>());

export const getUser=createAction(GET_USER,props<{userName:string}>());
export const getUserSuccess=createAction(GET_USER_SUCCESS,props<{obj:User}>());

export const openPopup=createAction(OPEN_POPUP);

export const updateUser=createAction(UPDATE_USER,props<{inputData:User}>());
export const updateUserSuccess=createAction(UPDATE_USER_SUCCESS,props<{inputData:Update<User>}>());

export const deleteUser=createAction(DELETE_USER,props<{userName:string}>());
export const deleteUserSuccess=createAction(DELETE_USER_SUCCESS,props<{userName:string}>());