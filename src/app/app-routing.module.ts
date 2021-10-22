import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './student-dashboard/profile/profile.component';
import { NotificationsComponent } from './student-dashboard/notifications/notifications.component';
import { DashboardComponent } from './student-dashboard/dashboard/dashboard.component';

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
      }
    ]
  },
  {
    path:"guestdb",component:GuestDashboardComponent
  },
  {
    path:"admindb",component:AdminDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
