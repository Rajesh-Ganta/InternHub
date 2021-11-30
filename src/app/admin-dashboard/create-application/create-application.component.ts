import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AllPurposeService } from 'src/app/allpurposervice.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  company_name = '';
  company_sector = '';
  company_website = '';
  visit_date = '';
  logo_url = '';
  address = '';
  registration_type = '';
  poc = ""; // point of contact
  poc_email_phone = "";
  job_description = "";
  posting_place = "";
  package_details = "";
  eligibility_criteria = "";
  bond_details ="";
  job_duration  ="";
  stiphend = "";
  job_role = "";
  recruitment_type = "";
  number_recruits = "5";
  cse = "Y";
  ece = "Y";
  mech = "Y";
  civil = "Y";
  chem = "Y";
  mme = "Y";
  resume_shortlist = "Y";
  online_test = "Y";
  aptitude_test = 'Y';
  technical_test = 'Y';
  group_discussion = 'Y';
  technical_interview = 'Y';
  mr_interview = 'Y';
  hr_interview = 'Y';
  other_details = '';
  third_party_details = '';
  data = {};

  constructor(private router:Router, private http: HttpClient, private allpurpose: AllPurposeService) {

   }

  ngOnInit(): void {
  }

  submitData(){
    this.data = {
                  "company_name" :this.company_name,
                  "company_sector":this.company_sector,
                  "company_website": this.company_website,
                  "visit_date": this.visit_date,
                  "logo_url":this.logo_url,
                  "address": this.address,
                  "registration_type": this.registration_type,
                  "poc" : this.poc,
                  "poc_email_phone": this.poc_email_phone,
                  "job_description": this.job_description,
                  "posting_place": this.posting_place,
                  "package_details": this.package_details,
                  "eligibility_criteria": this.eligibility_criteria,
                  "bond_details": this.bond_details,
                  "job_duration" : this.job_duration,
                  "stiphend" : this.stiphend,
                  "job_role" : this.job_role,
                  "recruitment_type" : this.recruitment_type,
                  "number_recruits" : this.number_recruits,
                  "cse" : this.cse,
                  "ece" : this.ece,
                  "mech": this.mech,
                  "civil": this.civil,
                  "chem" : this.chem,
                  "mme": this.mme,
                  "resume_shortlist": this.resume_shortlist,
                  "online_test": this.online_test,
                  "aptitude_test": this.aptitude_test,
                  "technical_test" : this.technical_test,
                  "group_discussion" : this.group_discussion,
                  "technical_interview" : this.technical_interview,
                  "mr_interview" : this.mr_interview,
                  "hr_interview" : this.hr_interview,
                  "other_details" : this.other_details,
                  "third_party_details" : this.third_party_details
                };
    console.log(this.data);
    this.http.post("http://localhost:8000/create_notice",this.data).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      this.http.post("http://localhost:8000/notify_post",{"logo": this.logo_url, "company_name": this.company_name, "tag_line" : "Apply Frist here"}).subscribe((res)=>{
          console.log(res);
        },(err)=>{
          console.log(err);
        },()=>{
        alert("Notification Created!!!");
      })
      this.router.navigate(['/admindb/application-view']);
      alert("Notice Created!!!");
    })
  }

}
