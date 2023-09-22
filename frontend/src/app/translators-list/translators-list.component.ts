import { Component } from '@angular/core';
import { TranslatorService } from '../services/translator-service.service';
import { Translator } from '../model/Translator';

@Component({
  selector: 'app-translators-list',
  templateUrl: './translators-list.component.html',
  styleUrls: ['./translators-list.component.css']
})
export class TranslatorsListComponent {

  translators: any[] = [];

  constructor(private translatorService: TranslatorService) { }

  // display all the available translators
  ngOnInit(): void {
    this.translatorService.getByAvailability().subscribe(data => {
      this.translators = data
      console.log(data);
      console.log("***********");
      console.log(this.translators);
    })
  }

}
