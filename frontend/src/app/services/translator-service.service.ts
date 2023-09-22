import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private baseUrl = 'http://localhost:8080/api'; 
  private search = {
    endTime: Date(),
    startTime: Date(),
    selectedLocation: ''
  }

  constructor(private http: HttpClient) {
    
  }
  //getters and setters
  getSearch() {
    return this.search;
  }
  setSearch(newEvent: any) {
    this.search = newEvent;
  }

  // Method to create a new translator
  createTranslator(translatorData: any): Observable<any> {
    const url = `${this.baseUrl}/translators/create`; 
    return this.http.post(url, translatorData, { withCredentials: true });
  }

  // Method to update an existing translator
  updateTranslator(translatorId: number, translatorData: any): Observable<any> {
    const url = `${this.baseUrl}/translators/update/${translatorId}`; 
    return this.http.put(url, translatorData,{ withCredentials: true });
  }

  // Method to delete a translator by ID
  deleteTranslator(translatorId: number): Observable<any> {
    const url = `${this.baseUrl}/translators/delete/${translatorId}`; 
    return this.http.delete(url);
  }

  // Method to retrieve a translator by ID
  getTranslatorById(translatorId: number): Observable<any> {
    const url = `${this.baseUrl}/translators/${translatorId}`; 
    return this.http.get(url,{ withCredentials: true });
  }

  // Method to retrieve a list of all translators
  getAllTranslators(): Observable<any> {
    const url = `${this.baseUrl}/translators`; 
    return this.http.get(url);
  }

  // get the list of avialable translators
  public getByAvailability(): Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl+'/translators/available',this.search);
  }


}
