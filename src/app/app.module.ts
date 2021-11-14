import { AddUsersComponent } from './admin-dashboard/add-users/add-users.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { NotificationsComponent } from './student-dashboard/notifications/notifications.component';
import { DashboardComponent } from './student-dashboard/dashboard/dashboard.component';
import { PostsComponent } from './student-dashboard/posts/posts.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { PostcardComponent } from './shared/postcard/postcard.component';
import { HallofameComponent } from './shared/hallofame/hallofame.component';
import { NotItemComponent } from './shared/not-item/not-item.component';
import { RouterModule } from '@angular/router';
import {
  getFunctions,
  provideFunctions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';
import { ApplicationPreviewComponent } from './shared/application-preview/application-preview.component';
import { CreateApplicationComponent } from './admin-dashboard/create-application/create-application.component';

@NgModule({
  declarations: [
    AddUsersComponent,
    AppComponent,
    LoginComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    GuestDashboardComponent,
    ProfileComponent,
    NotificationsComponent,
    DashboardComponent,
    PostsComponent,
    SideNavComponent,
    PostcardComponent,
    HallofameComponent,
    NotItemComponent,
    ApplicationPreviewComponent,
    CreateApplicationComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(():any => {
      if (environment.useEmulators) {
        const firestorage = getStorage();
        connectStorageEmulator(firestorage, 'localhost', 4200); // <---- Firestorage Port
        return firestorage;
      } else
        getStorage();
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
