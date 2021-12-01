import { AllPurposeService } from './../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})

export class StudentDashboardComponent implements OnInit {


  constructor(private router:Router,private allPurpose:AllPurposeService,private title:Title) { }

  name:string='';

  ngOnInit(): void {
    this.title.setTitle("Student profile");
    if(!localStorage.getItem('loginData')){
      this.router.navigateByUrl('');
    }
    if((JSON.parse(localStorage.getItem('loginData')??'')).type!='studentdb'){
      localStorage.clear();
      this.router.navigateByUrl('');
    }
    this.name = this.allPurpose.userEmail;
  }


}
