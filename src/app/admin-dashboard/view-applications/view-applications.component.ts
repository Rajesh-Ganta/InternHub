import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllPurposeService } from 'src/app/allpurposervice.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
})
export class ViewApplicationsComponent implements OnInit {
  applications: any = [];
  filterCat: any = 'all';
  allApplications: any = [];
  companies:any = ['all'];

  constructor(
    private http: HttpClient,
    private allpurpose: AllPurposeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.get_applications();
  }

  public get_applications() {
    return this.http.get('http://192.168.224.100:8000/fetch_application').subscribe(
      (response: any) => {
        //Next callback
        console.log('response received');
        response.sort((a: any, b: any) =>
          a.company_name > b.company_name ? 1 : -1
        );
        this.applications = response;
        this.allApplications = response;
        for (let i=0;i<this.applications.length;i++){
          if(!this.companies.includes(this.applications[i].company_name)){
            this.companies.push(this.applications[i].company_name);
          }
        }
        console.log(this.companies);

        console.log(this.applications);
      },
      (error) => {
        //Error callback
        console.error('Request failed with error');
      },
      () => {
        //Complete callback
        console.log('Request completed');
        // this.filterCategory('all');
      }
    );
  }

  filterCategory(event:any) {
    console.log("CAlled");
    this.filterCat = event.target.value;

    if (this.filterCat == 'all') {
      this.applications = this.allApplications;
    } else {
      this.applications = [];
      const result = this.allApplications.filter((elem:any)=>{
        return elem.company_name == this.filterCat;
      });
      console.log(result);
      this.applications = result;
    }
  }



  //for downloading

  Download() {
    var name = this.applications[0]["company_name"];
    var html = document.querySelector("table")!.outerHTML;
    this.export_table_to_csv(html, name+" registration data.csv");
  }
  export_table_to_csv(html:any, filename:any) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 1; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");

      for (var j = 1; j < cols.length; j++) {
          row.push(cols[j].innerHTML);
      }
      csv.push(row.join(","));
    }

    // Download CSV
    this.download_csv(csv.join("\n"), filename);
  }

  download_csv(csv:any, filename:any) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
  }

}
