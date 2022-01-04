import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications : any = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.http.get("http://192.168.111.86:8000/notify").subscribe((res)=>{
      this.notifications = res;
      console.log(this.notifications);

    })
  }

}
