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
    this.http.post("http://192.168.224.100:8000/userdata",{"data":{sid:this.studentId.toLocaleLowerCase(),name:this.studentId.toLocaleLowerCase,email:this.email,userType:this.userType,phone:"9876543210"}},{headers:header}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      this.http.post(environment.firebaseSignUp,{email:this.email,password:this.password,returnSecureToken:true}).subscribe((res)=>{

      },(err)=>{

      },()=>{

      this.studentId = '';
      this.email = '';
      this.userType = '';
      this.password = '';
      })
    })
  }
}
