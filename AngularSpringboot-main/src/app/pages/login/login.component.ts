import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {UserCred} from 'src/app/model/user';
import {beginLogin} from 'src/app/state/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;


    constructor(private builder: FormBuilder, private store: Store) {

    }

    ngOnInit(): void {
        this.loginForm = this.builder.group({
            userName: this.builder.control('', [Validators.required]),
            password: this.builder.control('', [Validators.required])
        });

    }


    onLogin(): void {
        if (this.loginForm.valid) {

            const _obj: UserCred = {
                username: this.loginForm.value.userName as string,
                password: this.loginForm.value.password as string
            }
            console.log(_obj);
            this.store.dispatch(beginLogin({usercred: _obj}))
        }

    }

}
