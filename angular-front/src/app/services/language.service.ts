import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor(private http: HttpClient) { }

  sendToRun(code: string): Promise<any> {
    return this.http.post(environment.URL,{code}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).toPromise();
  }
}
