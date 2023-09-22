// video.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from '../model/video.model'; // Import the Video model
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData): Observable<any> { // Update the argument type to FormData
    const headers = new HttpHeaders();
    const options = { headers, withCredentials: true }; 

    return this.http.post<any>(`${this.apiUrl}/upload`, formData, options); // Use formData here
  }
  getAllVideos(): Observable<Video[]> {
    const options = { withCredentials: true }; // Include this line to send credentials

    return this.http.get<Video[]>(`${this.apiUrl}/list`, options);
  }
}
