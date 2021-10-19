import { AllPurposeService } from './../allpurposervice.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router:Router, private allPurpose:AllPurposeService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loginData')){
      this.router.navigateByUrl('');
    }
    if((JSON.parse(localStorage.getItem('loginData')??'')).type!='admindb'){
      localStorage.clear();
      this.router.navigateByUrl('');
    }
  }

  logout(){
    this.allPurpose.logoutUser();
    this.router.navigateByUrl('');
  }

}
