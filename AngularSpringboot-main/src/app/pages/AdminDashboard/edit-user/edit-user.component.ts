import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user';
import { loadUser, updateUser } from 'src/app/state/user.actions';
import { getUser } from 'src/app/state/user.selectors';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm!:FormGroup;
  dialogData:any;


  title:String='Update User';


  constructor(private builder : FormBuilder,private ref:MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any,private store:Store){

  }


  ngOnInit(): void {
    this.dialogData=this.data;
    this.title=this.dialogData.title;

    this.editForm = this.builder.group({
     
      username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      confirmPassword: this.builder.control('', [Validators.required]),
      firstName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      lastName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      phoneNumber: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
      gender: this.builder.control('',Validators.required)
    });


    this.store.select(getUser).subscribe((res)=>{
      this.editForm.setValue({
        username:res.username,
        password:res.password,
        confirmPassword:res.password,
        firstName:res.firstName,
        lastName:res.lastName,
        email:res.email,
        phoneNumber:res.phoneNumber,
        gender:res.gender
        

        
      })
    })
      
  }

  closePopup(){
    this.ref.close();
  }

  onSubmit(){
    if(this.editForm.valid){
      const _obj:User={
          
          username: this.editForm.value.username as string,
          password: this.editForm.value.password as string,
          firstName: this.editForm.value.firstName as string,
          lastName: this.editForm.value.lastName as string,
          email: this.editForm.value.email as string,
          phoneNumber: this.editForm.value.phoneNumber as string,
          gender: this.editForm.value.gender as string,
      }
        console.log(_obj)
        this.store.dispatch(updateUser({inputData:_obj}));
      this.closePopup();

    }
  }

}