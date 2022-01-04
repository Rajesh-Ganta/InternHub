import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllPurposeService } from './../../allpurposervice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private allPurpose:AllPurposeService,private router:Router,private http:HttpClient) { }
  userType : string =  this.allPurpose.userType;
  notifications : any = [];
  ngOnInit(): void {
    this.getNotifications();
  }
  logout(){
    this.allPurpose.logoutUser();
    this.router.navigateByUrl('');
  }

  getNotifications(){
    this.http.get("http://192.168.224.100:8000/notify").subscribe((res)=>{
      this.notifications = res;
      console.log(this.notifications);
      this.notifications = this.notifications.filter((elem:any)=> elem.isDelete == false);
      console.log(this.notifications);
    })
  }
}
