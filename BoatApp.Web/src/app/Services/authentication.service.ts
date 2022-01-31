import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// The result of Api authentication is { token : '...'}
export interface ApiAuthResult{
  token: string
}

export class LoginDto{
  constructor(public Login : string, public Password : string){}
}

export type NullableUser = User|null|undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<NullableUser>;
  public User: Observable<NullableUser>;

  private optionsRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    let storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUserSubject = new BehaviorSubject<NullableUser>(JSON.parse(storedUser));    
    }
    else {
      this.currentUserSubject = new BehaviorSubject<NullableUser>(null);
    }
      
    this.User = this.currentUserSubject.asObservable();
  }

  public get CurrentUser(): NullableUser{
    return this.currentUserSubject.value;
  }

  public login(login: string, password: string) {
    let data = new LoginDto(login, password);
    
    return this.http.post<ApiAuthResult>(`${environment.apiUrl}/auth`, data, this.optionsRequete).pipe(map(result => {
      
      let decodedToken = this.jwtHelper.decodeToken(result.token);
      console.log('decodedToken :', decodedToken);
      let user = new User(decodedToken.nameid, decodedToken.Firstname, decodedToken.Lastname, decodedToken.role, result.token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return result;
    }));
  }
  
  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
