import { HttpClient } from '@angular/common/http';
import { AllPurposeService } from './../../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
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

    });

  }
}
