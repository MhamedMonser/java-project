import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const userId = sessionStorage.getItem('user_id');

    if (userId) {
      const userIdNumber = +userId;

      return this.userService.getUserById(userIdNumber).pipe(
        map((user) => {
          if (user && user.profile === 1) {
            return true; // Allow activation
          } else {
            this.router.navigate(['/home']); // Redirect to home if conditions are not met
            return false; // Prevent activation
          }
        }),
        catchError((error) => {
          console.error('Error fetching user by ID:', error);
          return of(false); // Prevent activation on error
        })
      );
    } else {
      this.router.navigate(['/login']); // Redirect to home if no user ID in session
      return of(false); // Prevent activation
    }
  }
}
