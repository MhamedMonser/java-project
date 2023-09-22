import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Register a user
  registerUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user,{ withCredentials: true });
  }

  // Log in a user
  loginUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, user,{ withCredentials: true });
  }
  checkEmailExists(email: string) {
    const url = `${this.baseUrl}/check-email/${email}`;
    return this.http.get<boolean>(url);
  }

   // Get a user by ID
   getUserById(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`; 
    return this.http.get(url, { withCredentials: true });
  }
     // Get all user 
     getAllUsers(): Observable<any> {
      const url = `${this.baseUrl}/allUsers`; 
      return this.http.get(url);
    }
    logout(): Observable<any> {
      const url = `${this.baseUrl}/logout`;
      return this.http.get(url, { withCredentials: true });
    }
    

}
