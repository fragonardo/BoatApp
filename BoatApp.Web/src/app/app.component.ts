import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subscription } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';
import { Alert, AlertService, alertType } from './Services/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './Models/User';
import { AuthenticationService, NullableUser } from './Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Boat Application';  
  alert: Alert = new Alert(alertType.default,'');
  type = 'success';
  subscription?: Subscription;  
  currentUser: NullableUser;
  @ViewChild('alertMessage', { static: false }) alertMessage?: NgbAlert
  
  constructor(
    private alertService: AlertService,
    private authService: AuthenticationService,
    private router: Router) {
    this.authService.User.subscribe(u => { this.currentUser = u; console.log('user:', this.currentUser); });
    }
  
  ngOnInit() {
    // Display alert message
    this.subscription = this.alertService.currentAlert.subscribe(alert => this.alert = alert);
    
    this.alertService.currentAlert.pipe(debounceTime(5000)).subscribe(() => {       
      if (this.alertMessage)
      { 
        this.alertMessage.close();
        this.alert.text = '';
      }
    })
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  


}
