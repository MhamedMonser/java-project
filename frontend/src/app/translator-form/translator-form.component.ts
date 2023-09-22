import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatorService } from '../services/translator-service.service';
import { UserService } from '../services/user.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-translator-form',
  templateUrl: './translator-form.component.html',
  styleUrls: ['./translator-form.component.css']
})
export class TranslatorFormComponent implements OnInit {
  translatorForm: FormGroup;
  formSubmitted = false;
  user: any; 


  constructor(    private router: Router ,

    private formBuilder: FormBuilder,
    private translatorService: TranslatorService,
    private userService: UserService // 
  ) {
    this.translatorForm = this.formBuilder.group({
      age: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      gender: ['male', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      
      image: [''], 
      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(300)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      street: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    });
    
  }

  ngOnInit(): void {
        // Retrieve the user ID from session
        const userId = sessionStorage.getItem('user_id');
        // Check if a user ID is available in session
        if (userId) {
          // Convert the user ID to a number if needed (use parseInt or +)
          const userIdNumber = +userId;
    
    
          // Fetch user data by their ID (you need to provide the user ID)
          this.getUserById(userIdNumber);
    
        }
  }

  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
        console.log('Fetched user by ID:', user);
      },
      (error) => {
        console.error('Error fetching user by ID:', error);
        // Handle errors if needed
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.translatorForm.valid) {
      const formData = this.translatorForm.value;

      // Create a new object with Translator and Address properties
      const requestData = {
        
          age: formData.age,
          gender: formData.gender,
          phone: formData.phone,
          cin: formData.cin,
          image: formData.image,
          description: formData.description,
          price: formData.price,
      
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        }
      };
      console.log('Translator :', requestData);
      this.translatorService.createTranslator(requestData).subscribe(
        
        (response) => {
          const translator_id = response.id;
          // console.log('User ID from response:', user_id); // Add this line
          sessionStorage.setItem('translator_id', translator_id);
          // console.log(translator_id);
           // Redirect to the login page

          console.log('Translator created successfully:', response);
          this.router.navigate(['/home']);

          // Additional actions after successful submission
        },
        (error) => {
          console.error('Error creating translator:', error);
          // Handle errors if needed
        }
      );
    }
  }
}
