import { createEntityAdapter,EntityState } from "@ngrx/entity";
import { User } from "../model/user";

export interface UsersState extends EntityState<User> {
  list:User[];
  errorMessage:string
  userObj:User
    
  }

export const UserAdapter = createEntityAdapter<User>({
  selectId: (user: User) => user.username
});

export const initalState:UsersState=UserAdapter.getInitialState({
  list:[],
  errorMessage:'',
  userObj:{
    
    firstName:'',
    lastName:'',
    username:'',
    phoneNumber:'',
    gender:'',
    email:'',
    password:'',
    authorities:[
      {
        authority:''
      }

    ]
      
  }
  
}); 