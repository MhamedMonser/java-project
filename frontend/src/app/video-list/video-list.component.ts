import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Video } from '../model/video.model';
import { VideoService } from '../services/video.service'; 


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  loadingError: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private VideoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.VideoService.getAllVideos()
      .subscribe(
        (videos: Video[]) => {
          this.videos = videos;
          this.loadingError = null; // Clear any previous loading errors
        },
        (error: HttpErrorResponse) => {
          this.loadingError = 'Error loading videos: ' + (error.message || 'Unknown error');
          console.error(this.loadingError);
        }
      );
  }

  getSafeVideoUrl(video: Video): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(video.videoUrl);
  }
}
