import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home2Component implements OnInit {
  offers: any;

  constructor(private videoService: VideoService) { }
  ngOnInit() {
    this.videoService.getAllVideos().subscribe((data: any) => {
      this.offers = data; 
    });
  }

  deleteUser() {
    const table = document.getElementById("myTable") as HTMLTableElement;
    if (table && table.rows.length > 0) {
      table.deleteRow(1);
    }
  }
  

}
