import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user';
import { getUsersList } from 'src/app/state/user.selectors';
import { deleteUser, getUser, loadUser, openPopup } from 'src/app/state/user.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  datasource:any;
  userList:User[]=[];
  filteredUserList: User[]=[];
  displayedColumns : string[] = ["firstName","lastName","username","phoneNumber","gender","email","action"]
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

constructor(private dialog:MatDialog,private store:Store){}

ngOnInit(): void {
  this.store.dispatch(loadUser());
  this.store.select(getUsersList).subscribe(item =>{
   
    this.userList=item;
    this.datasource=new MatTableDataSource<User>(this.userList);
    this.datasource.paginator=this.paginator;
    this.datasource.sort=this.sort;
   
  })
    
}

onSearch(event:Event){
  const inputElement=event.target as HTMLInputElement;

  const textValue=inputElement.value;
  this.filteredUserList = this.userList.filter(user =>
    user.firstName.toLowerCase().includes(textValue.toLowerCase())
  );
  
  this.datasource = new MatTableDataSource<User>(this.filteredUserList);
  this.datasource.paginator = this.paginator;
  this.datasource.sort = this.sort;


}



onAdd(){
  this.openPopUp(0,'Create User');

}


onEdit(code:string){
  console.log(code);
 
  this.openEditPopup(+code,'Update User');
  this.store.dispatch(getUser({userName:code}));
}

onDelete(userName:string){
  if(confirm('Do you want to delete?')){
    this.store.dispatch(deleteUser({userName:userName}));
  }

}


openEditPopup(code:number,title:string){
  
  this.dialog.open(EditUserComponent,{
    width:'50%',
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
    data:{
      code:code,
      title:title
    }
  })

}


openPopUp(code:number,title:string){
  
  this.dialog.open(AddUserComponent,{
    width:'50%',
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
    data:{
      code:code,
      title:title
    }
  })

}






}