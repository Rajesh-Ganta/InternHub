import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AllPurposeService } from './../../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  email : string = "";
  password : string= "";
  userType : string = "student";
  studentId : string = "";
  showValid : boolean = false;
  imgUrl : string = '';
  data : any ;

  constructor(private allPurpose:AllPurposeService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  createUser(){
    this.http.post(environment.firebaseSignUp,{"email":this.email,"password":this.password,"returnSecureToken":true}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
      this.showValid = true;
    },()=>{
      this.postData();

    });
    // this.postData();
  }

  postData(){
    let header = new HttpHeaders()
   .set('content-type','application/json')
   .set('Access-Control-Allow-Origin', '*');
    this.http.post("http://localhost:8000/userdata",{"data":{sid:this.studentId,name:this.studentId,email:this.email,userType:this.userType}},{headers:header}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      alert("User Added Successfully!!!");
      this.studentId = '';
      this.email = '';
      this.userType = '';
      this.password = '';
    })
  }
}
