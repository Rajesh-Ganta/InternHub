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
  role : any = '';


  constructor(private http:HttpClient, private allpurpose: AllPurposeService, private route: Router) {
  }

  ngOnInit(): void {
    this.get_notices();
    this.role = JSON.parse(localStorage.getItem('loginData')??'').type;
  }

  public get_notices()
  {
    return this.http.get("http://192.168.224.100:8000/get_notices")
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          this.notices = response;
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })
  }

  view_notice(data: any)
  {
    console.log(this.role);
    this.allpurpose.post = data;
    this.route.navigateByUrl(`/${this.role}/application-view`) ;
  }

  delete_notice(notice_id: any){
    this.http.post("http://192.168.224.100:8000/del_notice",{"notice_id" : notice_id}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      alert("Notice Deleted!!!");
      window.location.reload();
    })
  }

}
