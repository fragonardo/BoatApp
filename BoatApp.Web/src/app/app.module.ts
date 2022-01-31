import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BoatDetailComponent } from './boat-detail/boat-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { NgxBootstrapIconsModule, trash, pen, boxArrowRight } from 'ngx-bootstrap-icons';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { AuthComponent } from './auth/auth.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './Interceptor/error-interceptor.service';
import { TokenInterceptor } from './Interceptor/token-interceptor.service';

const icons = {trash, pen, boxArrowRight}

@NgModule({
  declarations: [
    AppComponent,
    BoatListComponent,
    BoatDetailComponent,
    ModalConfirmComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(icons),
    ReactiveFormsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
