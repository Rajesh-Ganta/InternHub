import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-item',
  templateUrl: './not-item.component.html',
  styleUrls: ['./not-item.component.css']
})
export class NotItemComponent implements OnInit {

  @Input("data") data:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  deleteNot(id:any){
    let header = new HttpHeaders()
   .set('content-type','application/json')
   .set('Access-Control-Allow-Origin', '*');
    this.http.post('http://192.168.224.100:8000/delete_not',{id:id},{headers:header}).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
  }

}
