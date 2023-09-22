import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  formSubmitted: boolean = false; // Initialize as false
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.formSubmitted = true; // Set to true when the form is submitted

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('User submitted:', formData);

      // Simulating a login request
      this.userService.loginUser(formData).subscribe(
        response => {
          const user_id = response.id;
          console.log('User ID from response:', user_id); // Add this line
          sessionStorage.setItem('user_id', user_id);
          

            
            this.userService.getUserById(user_id).subscribe(
            (userdata) => {
              if (userdata.profile === 0) {

                this.router.navigate(['/home']);
      
              } else if (userdata.profile == 1) {
                console.log("user profile = ",userdata.profile);
                this.router.navigate(['/home']);
      
              } else {
                console.log("user profile = ",userdata.profile);
                this.router.navigate(['/admin']);
              }
            },
            (error) => {
              console.error('Error fetching translator data:', error);
            }
          );

          // Save user data in a cookie
          // this.cookieService.set('user_id', JSON.stringify(user_id));
          console.log('Login successful:', response);

        },
        error => {
          console.error('Login failed:', error);
          this.loginError = true; // Display login error message
        }
      );
    }
  }
}
