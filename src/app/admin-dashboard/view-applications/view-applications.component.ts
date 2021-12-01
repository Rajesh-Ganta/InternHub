import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllPurposeService } from 'src/app/allpurposervice.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  applications:any = [];

  constructor(private http:HttpClient, private allpurpose: AllPurposeService, private route: Router) {
  }

  ngOnInit(): void {
    this.get_applications();
  }

  public get_applications()
  {
    return this.http.get("http://localhost:8000/fetch_application")
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          this.applications = response;
          console.log(this.applications);
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })
  }

}
