import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loginData')){
      this.router.navigateByUrl('');
    }
    if((JSON.parse(localStorage.getItem('loginData')??'')).type!='guestdb'){
      localStorage.clear();
      this.router.navigateByUrl('');
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
