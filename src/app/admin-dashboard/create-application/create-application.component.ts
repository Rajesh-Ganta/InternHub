import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SrvRecord } from 'dns';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  company_name :string = '';
  company_sector: string = '';
  website: string = '';
  visit_date: string = '';
  logo_url: string = '';
  address: string = '';
  registration_type: string = '';
  poc = ""; // point of contact
  poc_email ="";
  job_description = "";
  posting_place = "";
  package_details = "";
  eligibility_criteria = "";
  bond_details ="";
  job_duration  ="";
  stiphend = "";
  job_role = "";
  recruitment_type = "";
  recruits_count = "";
  eligible_branch = "";
  resume_shortlist = "";
  online_test = "";
  aptitude_test = '';
  technical_test = '';
  group_discussion = '';
  technical_interview = '';
  mr_interview = '';
  hr_interview = '';
  othe_details = '';
  third_party_details='';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  submitData(){
    this.router.navigate(['/admindb/application-view']);
  }

}
