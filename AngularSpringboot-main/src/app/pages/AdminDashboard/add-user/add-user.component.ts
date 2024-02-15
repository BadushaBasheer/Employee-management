import { Component,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user';
import { addUser } from 'src/app/state/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit  {

  addForm!:FormGroup
  dialogData:any;


  title:String='Create User';
  
  constructor(private builder : FormBuilder,private ref:MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any,private store:Store,private _snack:MatSnackBar){

  }

 


  ngOnInit(): void {

    this.dialogData=this.data;
    this.title=this.dialogData.title;

    this.addForm = this.builder.group({
      
      username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      confirmPassword: this.builder.control('', [Validators.required]),
      firstName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      lastName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      phoneNumber: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
      gender: this.builder.control('',Validators.required)
    })

  
    
      
  }




  closePopup(){
    this.ref.close();
  }


  onSubmit(){
    if(this.addForm.valid){
      if (this.addForm.value.password === this.addForm.value.confirmPassword) {
      const _obj:User={
          id:this.addForm.value.id as number,
          username: this.addForm.value.username as string,
          password: this.addForm.value.password as string,
          firstName: this.addForm.value.firstName as string,
          lastName: this.addForm.value.lastName as string,
          email: this.addForm.value.email as string,
          phoneNumber: this.addForm.value.phoneNumber as string,
          gender: this.addForm.value.gender as string,
       


      }
      
        this.store.dispatch(addUser({inputData:_obj}));
      
      
      this.closePopup();
    }else{
      this._snack.open("Password dont Match",'Ok',{
        duration:3000
      })
    }
  }else{
    this._snack.open("Fill All Fields",'Ok',{
      duration:3000,
    })
  }
  }

}