import { AllPurposeService } from './../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private router:Router,private allPurpose:AllPurposeService) { }

  name:string='';

  ngOnInit(): void {
    if(!localStorage.getItem('loginData')){
      this.router.navigateByUrl('');
    }
    if((JSON.parse(localStorage.getItem('loginData')??'')).type!='studentdb'){
      localStorage.clear();
      this.router.navigateByUrl('');
    }
    this.name = this.allPurpose.userEmail;
  }

  logout(){
    this.allPurpose.logoutUser();
    this.router.navigateByUrl('');
  }

}
