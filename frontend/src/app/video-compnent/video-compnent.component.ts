import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form-related classes
import { VideoService } from '../services/video.service'; 
import { TranslatorService } from '../services/translator-service.service'; 

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-video-compnent',
  templateUrl: './video-compnent.component.html',
  styleUrls: ['./video-compnent.component.css']
})
export class VideoComponent {
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;
  videoForm: FormGroup;
  capturedVideoBlob: Blob | null = null; // Store the captured video Blob
  id: any;
  translator: any;

  constructor(private http: HttpClient, private fb: FormBuilder,  private VideoService: VideoService,private TranslatorService:TranslatorService
    ,private activeRoute: ActivatedRoute , private router: Router) {
    this.videoForm = this.fb.group({
      title: [''], 
      description: [''],
      isAccept:[false],
      
    });
  }
  get titleControl() {
    return this.videoForm.get('title');
  }

  get descriptionControl() {
    return this.videoForm.get('description');
  }
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    // this.id=1
    this.TranslatorService.getTranslatorById(this.id).subscribe(
      (translator) => {
        this.translator = translator;
        console.log('Fetched user by ID:', translator);
      },
      (error) => {
        console.error('Error fetching user by ID:', error);
        // Handle errors if needed
      }
    );
    
  }
  async startCapture() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }

  stopCapture() {
    if (this.videoElement) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        this.videoElement.nativeElement.srcObject = null;
      }
    }
  }

  async saveVideo() {
    if (this.videoElement) {
      const title = this.titleControl?.value;
      const description = this.descriptionControl?.value;
      const isAccept=false;
      
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      if (stream) {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/mp4' });
          // Set the captured video Blob
          this.capturedVideoBlob = blob;

          // Generate a unique video name (timestamp + random string)
          const uniqueVideoName = this.generateUniqueVideoName();
          // Send the blob, title, description, and the unique video name to the backend.
          this.uploadVideo(blob, uniqueVideoName,title,description,isAccept,this.id);
        };

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
          this.stopCapture();
        }, 100000); // Record for 10 seconds (adjust as needed).
      }
    }
  }

  generateUniqueVideoName(): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7); // Generates a random string
    return `Video_${timestamp}_${randomString}.mp4`;
  }

  uploadVideo(blob: Blob, videoName: string, title: string, description: string,isAccept:boolean,translatorId:number) {
    const formData = new FormData();
    formData.append('videoName', videoName);
    formData.append('videoFile', blob, videoName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isAccept', isAccept.toString());
    formData.append('translatorId', translatorId.toString());



    this.VideoService.uploadVideo(formData).subscribe(
      (response) => {
        console.log('Video uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading video:', error);
      }
      );
  }
}
