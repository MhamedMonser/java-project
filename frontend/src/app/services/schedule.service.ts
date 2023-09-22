import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleEventData } from '../model/ScheduleEventData';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url = 'http://localhost:8080/api/schedule';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<ScheduleEventData[]> {
    return this.http.get<ScheduleEventData[]>(this.url);
  }

  public create(data: any) {
    return this.http.post(this.url+'/insert-appointment', data);
  }

  // public update(data: any, id:number) {
  //   return this.http.put(this.url+'/edit/'+id, data);
  // }

  
  public delete(id:number) {
    return this.http.delete(this.url+'/'+id);
  }
}
