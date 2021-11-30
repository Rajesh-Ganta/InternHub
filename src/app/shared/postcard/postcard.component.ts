import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AllPurposeService } from 'src/app/allpurposervice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent implements OnInit {

  notices:any = [];

  constructor(private http:HttpClient, private allpurpose: AllPurposeService, private route: Router) {
  }

  ngOnInit(): void {
    this.get_notices();
  }

  public get_notices()
  {
    return this.http.get("http://localhost:8000/get_notices")
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          this.notices = response;
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })
  }

  view_notice(data: any)
  {
    this.allpurpose.post = data;
    this.route.navigate(['/admindb/application-view']);
  }

  delete_notice(notice_id: any){
    this.http.post("http://localhost:8000/del_notice",{"notice_id" : notice_id}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      alert("Notice Deleted!!!");
      window.location.reload();
    })
  }

}
