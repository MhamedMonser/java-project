import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatorService } from '../../services/translator-service.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class User2Component implements OnInit {

  translators: any[] | undefined; // Define an array to store the list of translators

  constructor(private translatorService: TranslatorService) {}

  ngOnInit() {
    // Call the service method to fetch all translators
    this.translatorService.getAllTranslators().subscribe((data: any) => {
      this.translators = data; // Assign the retrieved data to your component property
    });
  }

  deleteTranslator() {
    const table = document.getElementById("myTable") as HTMLTableElement; // Get the table element
    if (table && table.rows.length > 0) {
      table.deleteRow(1); // Delete the first row
    }
  }
}
