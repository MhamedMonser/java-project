import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin-dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/allUsers', title: 'Translators List',  icon:'pe-7s-note2', class: '' },
    { path: '/allTranslators', title: 'Users List',  icon:'pe-7s-note2', class: '' },
    { path: '/allVideos', title: 'Videos List',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component implements OnInit {
  menuItems!: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
