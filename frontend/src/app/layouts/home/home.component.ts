import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public emailChartType!: ChartType;
  public emailChartData: any;
  public emailChartLegendItems!: LegendItem[];
  public offers: any[] | undefined;
  private videoSrc!: string; // Add this property for video source

  @ViewChild('myModal') modal!: ElementRef; // Add this ViewChild for the modal
  @ViewChild('video') video!: ElementRef; // Add this ViewChild for the video

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

  playVideo(videoSrc: string) {
    this.videoSrc = videoSrc;
    
    // Open the modal
    this.modal.nativeElement.style.display = "block";

    // Set the video src to autoplay and not show related video
    this.video.nativeElement.setAttribute(
      'src',
      `${this.videoSrc}?autoplay=1&modestbranding=1&showinfo=0`
    );
  }

  closeVideoModal() {
    // Close the modal
    this.modal.nativeElement.style.display = "none";

    // Stop playing the video
    this.video.nativeElement.setAttribute('src', this.videoSrc);
  }
}
