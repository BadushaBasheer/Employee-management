import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';
import {UserService} from "../../services/userservices.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  user!:User | null;

  constructor(private storage:StorageService,private router:Router,private userService:UserService){}

  ngOnInit(): void {
    console.log("on it")
    this.updateUserLoggedStatus();

    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.updateUserLoggedStatus();
      }
    })

  }

  private updateUserLoggedStatus():void{
    this.isLoggedIn =this.storage.isLoggedIn();
    console.log(this.isLoggedIn);

  }

  onLogout(){
    this.userService.logout();
    this.storage.logout();
  }



}
