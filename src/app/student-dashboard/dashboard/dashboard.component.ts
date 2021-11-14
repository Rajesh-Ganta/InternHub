import { AllPurposeService } from './../../allpurposervice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private allPurposeService:AllPurposeService){

  }
  userType : any = this.allPurposeService.userType;
  dashboardStats : any = [
    {
      text:"No of Applications",
      num:10
    },
    {
      text:"Appplications Submitted",
      num:3
    },
    {
      text:"Applications in Progress",
      num:2
    },
    {
      text:"Exams Attempted",
      num:1
    }
  ]

  ngOnInit(): void {
  }

}
