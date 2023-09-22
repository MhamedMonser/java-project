import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap'; // Import Bootstrap


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() {}

  ngOnInit() {
  //   // Initialize Bootstrap tabs
  //   this.renderer.listen(this.el.nativeElement, 'click', (event) => {
  //     if (event.target.hasAttribute('data-bs-toggle')) {
  //       new bootstrap.Tab(event.target).show();
  //     }
  //   });
  // }

  // selectTab(tabId: string) {
  //   this.selectedTab = tabId;
  }
}