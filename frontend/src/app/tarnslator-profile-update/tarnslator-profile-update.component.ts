import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatorService } from '../services/translator-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-translator-profile-update',
  templateUrl: './tarnslator-profile-update.component.html',
  styleUrls: ['./tarnslator-profile-update.component.css']
})
export class TranslatorProfileUpdateComponent implements OnInit {
  translatorForm: FormGroup;
  formSubmitted = false;
  isEditMode = false;
  translatorId: number = NaN;

  constructor(
    private formBuilder: FormBuilder,
    private translatorService: TranslatorService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.translatorForm = this.formBuilder.group({
      age: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      gender: ['male', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      image: [''],
      description: [
        '',
        [Validators.required, Validators.minLength(15), Validators.maxLength(300)],
      ],
      price: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      // Address fields
      street: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      postalCode: [
        '',
        [Validators.required, Validators.pattern('[0-9]{4}')],
      ],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!isNaN(id)) {
        this.translatorId = id;
        this.loadTranslatorData(this.translatorId);
      }
    });


  }

  loadTranslatorData(translatorId: number) {
    this.translatorService.getTranslatorById(translatorId).subscribe(
      (translatorData) => {
        this.translatorForm.patchValue(translatorData);
        this.translatorForm.patchValue(translatorData.address);

        // console.log('all translator data:', translatorData);
        // console.log('Fetched translator data for edit:', translatorData.address);
      },
      (error) => {
        console.error('Error fetching translator data:', error);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.translatorForm.valid && this.translatorId !== undefined) {
      const formData = this.translatorForm.value;
      this.updateTranslator(this.translatorId, formData);
      this.router.navigate(['/admin']);  }
  }

  updateTranslator(translatorId: number, formData: any) {
    // Here, you can add the address data to formData as needed
    formData.address = {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode
    };

    this.translatorService.updateTranslator(translatorId, formData).subscribe(
      (response) => {
        console.log('Translator updated successfully:', response);
        // Additional actions after successful submission
      },
      (error) => {
        console.error('Error updating translator:', error);
        // Handle errors if needed
      }
    );
  }
}
