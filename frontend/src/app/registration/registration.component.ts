import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  emailExists: boolean = false;
  passwordsMatch: boolean = true; // Initialize as true
  errorMessages = [];
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router // Inject the Router
  ) {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.checkEmail.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      profile: ['',[Validators.required]]
    }, { validator: this.checkPasswordsMatch }); // Add validator for checking passwords
  }

  checkPasswordsMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirm')?.value;

    if (password !== confirm) {
      control.get('confirm')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirm')?.setErrors(null);
    }
  }

  checkEmail(control: AbstractControl): Promise<{ [key: string]: any } | null> {
    const email = control.value;
  
    return new Promise((resolve, reject) => {
      this.userService.checkEmailExists(email).subscribe(
        (exists) => {
          if (exists) {
            resolve({ emailExists: true });
          } else {
            resolve(null);
          }
        },
        (error) => {
          console.error('Error checking email:', error);
          resolve(null); // Resolve with null in case of an error
        }
      );
    });
  }
  

  onSubmit() {
    this.formSubmitted = true;

    if (this.registrationForm.valid && !this.emailExists && this.passwordsMatch) {
      const formData = this.registrationForm.value;
      console.log('User submitted:', formData);
      
      this.userService.registerUser(formData).subscribe(
        response => {
          const user_id = response.id;
          // console.log('User ID from response:', user_id); // Add this line
          sessionStorage.setItem('user_id', user_id);
          console.log('Registration successful:', response);
                // Conditional redirection based on the 'profile' value
        if (formData.profile === '0') {
          this.router.navigate(['/videos/3']); // [routerLink]="['/videos/', translator.id]"
        } else {
          this.router.navigate(['/createTranslator']); // Redirect to the home page
        }
        },
        error => {
          console.error('Registration failed:', error);
          console.log('**************',error.error);
          
          this.errorMessages = error.error;
          // console.error('Error checking email:', this.errorMessages);
          
          
        }
      );
    }
  }
  
}
