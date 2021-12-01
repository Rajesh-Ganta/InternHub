import { Router } from '@angular/router';
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
  constructor(private allpurpose: AllPurposeService, private http: HttpClient,private router:Router) { }

  user_data : any;

  ngOnInit(): void {
    this.data = this.allpurpose.post;
    if(!this.data){
      let x:any = JSON.parse(localStorage.getItem('loginData')??'');
      this.router.navigateByUrl(`${x.type}/dash`);
    }
    //console.log(this.data);
  }

  post = this.allpurpose.post;

  eligible: any;

  apply()
  {
    let user_data = JSON.parse(localStorage.getItem('loginData')??'');
    let email = user_data.name
    let sid = user_data.name.split('@')[0]
    let role = user_data.type;

    if(this.eligible == true)
    {
      this.http.post("http://localhost:8000/insert_application",{"student_id": sid, "name": 'XXX', "email" : email, "phone": "123434", "company_name": this.data["company_name"], "notice_id": this.data["notice_id"]}).subscribe((res)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
      },()=>{
        alert("Application Submited");
        this.router.navigateByUrl(`/${role}/dash`);
      })

    }
  }

  //data["student_id"],data["name"],data["email"], data["phone"], data["company_name"], datetime.datetime.now() ,data["notice_id"])

}
