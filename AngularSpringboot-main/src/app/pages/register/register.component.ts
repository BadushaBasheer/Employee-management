import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {User} from 'src/app/model/user';
import {beginRegister} from 'src/app/state/user.actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerform!: FormGroup;

    constructor(private builder: FormBuilder, private _snack: MatSnackBar, private store: Store) {
    }


    ngOnInit(): void {

        this.registerform = this.builder.group({
            username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
            password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
            confirmPassword: this.builder.control('', [Validators.required]),
            firstName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
            lastName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
            email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
            phoneNumber: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
            gender: this.builder.control('', Validators.required)
        })
    }

    onSubmit() {
        if (this.registerform.valid) {
            if (this.registerform.value.password === this.registerform.value.confirmPassword) {
                const _userobj: User = {
                    username: this.registerform.value.username as string,
                    password: this.registerform.value.password as string,
                    firstName: this.registerform.value.firstName as string,
                    lastName: this.registerform.value.lastName as string,
                    email: this.registerform.value.email as string,
                    phoneNumber: this.registerform.value.phoneNumber as string,
                    gender: this.registerform.value.gender as string,
                }
                this.store.dispatch(beginRegister({userdata: _userobj}));


            } else {
                this._snack.open("Password dont Match", 'Ok', {
                    duration: 3000
                })

            }
        } else {
            this._snack.open("Fill All Fields", 'Ok', {
                duration: 3000,
            })
        }
    }

}

