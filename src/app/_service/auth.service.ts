import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';



const AUTH_API = 'http://localhost:4200/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  link = 'http://localhost:4200/user';
  status = false;


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(utilisateur: { username: any; email: any; password: any; nom: any; prenom: any; phone: any; gender: any; status: any; image: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: utilisateur.username,
      email: utilisateur.email,
      password: utilisateur.password,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      phone: utilisateur.phone,
      gender: utilisateur.gender,
      image: utilisateur.image,
      status: false
    }, httpOptions);
  }

  sendEmail(url, data) {
    return this.http.post(url, data);
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
