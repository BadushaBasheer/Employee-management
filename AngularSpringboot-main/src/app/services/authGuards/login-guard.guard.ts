import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {

  const router= inject(Router);

  if(StorageService.getUser()!==null && StorageService.getTokens()!==null && StorageService.isAdminLoggedIn()){
    router.navigateByUrl("/adminDashboard")
    
      return false; 
  }
  else if(StorageService.getUser()!==null && StorageService.getTokens()!==null && StorageService.isUserLoggedIn()){
    router.navigateByUrl("/userDashboard")
    
      return false;
  }


  return true;
};