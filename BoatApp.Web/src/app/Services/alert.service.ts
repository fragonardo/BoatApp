import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum alertType{
  info = 'info',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark',
  default = ''
}

export class Alert{
  constructor(public type: alertType, public text: string){}
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new BehaviorSubject(new Alert(alertType.default,''));
  currentAlert = this.alertSource.asObservable();

  constructor() { }

  changeAlert(alert: Alert) {
    this.alertSource.next(alert);
  }
}
