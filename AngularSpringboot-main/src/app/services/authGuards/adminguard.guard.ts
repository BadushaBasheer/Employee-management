import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminguardGuard: CanActivateFn = (route, state) => {

  const router= inject(Router);
  const _snack= inject(MatSnackBar);

  if(StorageService.getUser()!==null && StorageService.getTokens()!==null && StorageService.isUserLoggedIn()){
    router.navigateByUrl("/userDashboard");
    _snack.open("You don't have Access to this page", "Close",{duration: 5000});
    
      return false; 
  }
  else if(StorageService.getUser()=== null && StorageService.getTokens() === null){
    router.navigateByUrl("/login");
    _snack.open("You are not logged in", "Close",{duration: 5000});
    
      return false;
  }


  return true;
  
};