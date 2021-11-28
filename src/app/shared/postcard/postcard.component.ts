import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent implements OnInit {

  notices:any = [];

  constructor(private http:HttpClient) {
    this.get_notices();
  }

  ngOnInit(): void {
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

  view_notice(i: any)
  {
    console.log(this.notices[i]);
  }

  delete_notice(notice_id: any){
    this.http.post("http://localhost:8000/del_notice",{"notice_id" : notice_id}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      alert("Notice Deleted!!!");
    })
  }

}
