import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';



@Injectable()
export class CanAuthService implements CanActivate {
  constructor(private router: Router) {
    console.log('can active auth service');
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigate(['/home/doctor-log-in']);
      return false;
    }
  }

}
