import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllPurposeService } from 'src/app/allpurposervice.service';

@Component({
  selector: 'app-application-preview',
  templateUrl: './application-preview.component.html',
  styleUrls: ['./application-preview.component.css']
})
export class ApplicationPreviewComponent implements OnInit {

  data :any;
  constructor(private allpurpose: AllPurposeService, private http: HttpClient) { }

  user_data : any;

  ngOnInit(): void {
    this.data = this.allpurpose.post;
    console.log(this.data);
    let x:any = JSON.parse(localStorage.getItem('loginData')??'');
  }

  post = this.allpurpose.post;

  eligible: any;

  apply()
  {
    if(this.eligible == true)
    {
      this.http.post("http://localhost:8000/insert_application",{"student_id": "S160215", "name": 'XXX', "email" : "12345", "phone": "123434", "company_name": this.data["company_name"], "notice_id": this.data["notice_id"]}).subscribe((res)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      },()=>{
        alert("Application Submited");
      })

    }
  }

  //data["student_id"],data["name"],data["email"], data["phone"], data["company_name"], datetime.datetime.now() ,data["notice_id"])

}
