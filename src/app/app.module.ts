import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { AuthInterceptorService} from './authinterceptor.service'
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent} from './register.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatCardModule, 
  MatToolbarModule, 
  MatInputModule, 
  MatListModule 
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';

import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminUsersListComponent } from './users/adminUsersList.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component'

//API Keys
// google books api: AIzaSyCgjYrO5EaMufZXK6yaX5L2rPqOKtU4pME

var routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'adminUsersList', component: AdminUsersListComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'post', component: PostComponent },  
  { path: '**', component: PostComponent },  
]

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent,
    RegistrationComponent,
    LoginComponent,
    AdminUsersListComponent,
    ProfileComponent,
    PostComponent,
    HomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
