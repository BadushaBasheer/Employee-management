import {Actions, act, createEffect, ofType} from '@ngrx/effects';
import {
    addUser,
    addUserSuccess,
    beginLogin,
    beginRegister,
    deleteUser,
    deleteUserSuccess,
    getUser,
    getUserSuccess,
    loadUser,
    loadUserFailure,
    loadUserSuccess,
    loginSuccess,
    updateUser,
    updateUserSuccess
} from './user.actions';
import {
    catchError,
    filter,
    map,
    mergeMap,
    switchMap,
} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {showalert} from '../common/common.action';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AdminserviceService} from '../pages/AdminDashboard/adminservice.service';
import {Update} from '@ngrx/entity';
import {User} from '../model/user';
import {UserService} from "../services/userservices.service";

@Injectable()
export class userEffects {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private storage: StorageService,
        private route: Router,
        private adminService: AdminserviceService
    ) {
    }


    _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            mergeMap((action) => {
                return this.userService.registerUser(action.userdata).pipe(
                    map((response) => {
                        console.log(response);


                        this.route.navigate(['login'])
                        return showalert({message: 'Registered successfully.', resultType: 'pass'})

                    }),
                    catchError((_error) => of(showalert({
                        message: 'Registerion Failed due to :.' + _error.error,
                        resultType: 'fail'
                    })))
                )
            })
        )
    )


    _userlogin = createEffect(() => {
        return this.action$.pipe(
            ofType(beginLogin),
            mergeMap((action) => {
                return this.userService.login(action.usercred).pipe(
                    switchMap((data) => {
                        if (data.user !== null) {
                            if (data.user.enabled === true) {
                                this.storage.saveToken(data.token);
                                this.storage.saveUser(data.user);
                                for (let item of data.user.authorities ?? []) {

                                    if (item.authority === 'ADMIN') {
                                        this.route.navigate(['adminDashboard']);
                                    } else {
                                        this.route.navigate(['userDashboard']);

                                    }
                                }
                                return of(showalert({message: 'Login success.', resultType: 'pass'}));
                            } else {

                                return of(showalert({message: 'InActive User.', resultType: 'fail'}));

                            }
                        } else {
                            return of(showalert({message: 'Login Failed: Invalid credentials.', resultType: 'fail'}));

                        }
                    })
                    ,
                    catchError((_error) => of(showalert({
                        message: 'Login failed due to:' + _error.error,
                        resultType: "fail"
                    })))
                );
            })
        );
    });

    _loadUser = createEffect(() => {
        return this.action$.pipe(
            ofType(loadUser),
            mergeMap(() => {
                return this.adminService.getAllUsers().pipe(
                    map((data) => {
                        console.log(data);
                        return loadUserSuccess({list: data})

                    }), catchError((_error) => of(loadUserFailure({errorMessage: _error.message})))
                )
            })
        )
    });


    _addUser = createEffect(() => {
        return this.action$.pipe(
            ofType(addUser),
            switchMap((action) => {
                return this.adminService.createUser(action.inputData).pipe(
                    switchMap((data) => {
                        console.log(data);
                        return of(addUserSuccess({inputData: action.inputData}),
                            showalert({message: 'Created Successfully', resultType: 'pass'}))

                    }), catchError((_error) => of(showalert(
                        {message: 'Failed to create User:-' + _error.error, resultType: 'fail'})))
                )
            })
        )
    });


    _getUser = createEffect(() => {
        return this.action$.pipe(
            ofType(getUser),
            mergeMap((action) => {
                return this.adminService.getUser(action.userName).pipe(
                    map((data) => {

                        return getUserSuccess({obj: data})

                    }), catchError((_error) => of(showalert({
                        message: 'Failed to fetch data :' + _error.error,
                        resultType: 'fail'
                    })))
                )
            })
        )
    });


    _updateUser = createEffect(() => {
        return this.action$.pipe(
            ofType(updateUser),
            switchMap((action) => {
                console.log("effects" + action.inputData);
                return this.adminService.updateUser(action.inputData).pipe(
                    switchMap((data) => {
                        const updateRecord: Update<User> = {
                            id: action.inputData.username,
                            changes: action.inputData
                        }

                        return of(updateUserSuccess({inputData: updateRecord}),
                            showalert({message: 'Updated Successfully', resultType: 'pass'}))

                    }), catchError((_error) => of(showalert({message: 'Failed to update User', resultType: 'fail'})))
                )
            })
        )
    });


    _deleteUser = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteUser),
            switchMap((action) => {

                return this.adminService.deleteUser(action.userName).pipe(
                    switchMap((data) => {

                        return of(deleteUserSuccess({userName: action.userName}),
                            showalert({message: 'Deleted Successfully', resultType: 'pass'}))

                    }), catchError((_error) => of(showalert({message: 'Failed to delete User', resultType: 'fail'})))
                )
            })
        )
    });


}
