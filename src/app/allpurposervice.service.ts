import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({providedIn: 'root'} )
export class AllPurposeService {
   constructor(private http:HttpClient) { }

  //for getting type of the users we use this JSON API
  usersUrl : string = "https://myproject-e549a.firebaseio.com/";

  //for storing sigin details
  loginId : string ='';
  userEmail : string = '';
  password : string = '';
  userType : string = '';
  isAuth : boolean = false;

  //for getting login data
  login(email:any,password:any){
    let data = {
      email:email,
      password:password,
      returnSecureToken:true
    }
    return this.http.post(environment.firebaseAuthURL,data);;
  }

  //For getting type of the user
  getUsers(email:string){
    return this.http.get(this.usersUrl+"users.json");
  }

  //for logging out user
  logoutUser(){
    localStorage.clear();
    this.isAuth = false;
    this.loginId = '';
    this.userEmail = '';
    this.userType = '';
  }


}
