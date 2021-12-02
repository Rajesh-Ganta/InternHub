import { ApplicationPreviewComponent } from './shared/application-preview/application-preview.component';
import { CreateApplicationComponent } from './admin-dashboard/create-application/create-application.component';
import { AddUsersComponent } from './admin-dashboard/add-users/add-users.component';
import { HallofameComponent } from './shared/hallofame/hallofame.component';
import { PostsComponent } from './student-dashboard/posts/posts.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { NotificationsComponent } from './student-dashboard/notifications/notifications.component';
import { DashboardComponent } from './student-dashboard/dashboard/dashboard.component';
import { ViewApplicationsComponent } from './admin-dashboard/view-applications/view-applications.component';

const routes: Routes = [
  {
    path:"",component:LoginComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"studentdb",
    component:StudentDashboardComponent,
    children: [
      {
        path:'',
        redirectTo:'dash',
        pathMatch:'full'
      },
      {
        path:'dash',
        component:DashboardComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'notifications',
        component:NotificationsComponent
      },
      {
        path:'posts',
        component:PostsComponent
      },
      {
        path:'halloffame',
        component:HallofameComponent
      },
      {
        path:'application-view',
        component:ApplicationPreviewComponent
      },
      {
        path:'**',
        redirectTo:'dash'
      }
    ]
  },
  {
    path:"guestdb",component:GuestDashboardComponent
  },
  {
    path:"admindb",component:AdminDashboardComponent,
    children: [
      {
        path:'',
        redirectTo:'dash',
        pathMatch:'full'
      },
      {
        path:'dash',
        component:DashboardComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'notifications',
        component:NotificationsComponent
      },
      {
        path:'posts',
        component:PostsComponent
      },
      {
        path:'halloffame',
        component:HallofameComponent
      },
      {
        path:'addusers',
        component:AddUsersComponent,
      },
      {
        path:'create-application',
        component:CreateApplicationComponent
      },
      {
        path:'application-view',
        component:ApplicationPreviewComponent
      },
      {
        path:'applications',
        component:ViewApplicationsComponent
      },
      {
        path:'**',
        redirectTo:'dash'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
