import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as cryptoJS from 'crypto-js';
@Injectable({providedIn: 'root'} )
export class AllPurposeService {
  constructor(private http:HttpClient) {
    if(localStorage.getItem('loginData')){
      this.userEmail = JSON.parse(localStorage.getItem('loginData')??'').name.toString();
      this.userType = JSON.parse(localStorage.getItem('loginData')??'').type.toString().slice(0,-2);
      // alert(this.userType);
    }
  }


  post : any;

  //for getting type of the users we use this JSON API
  usersUrl : string = "http://192.168.224.100:8000/";

  //for storing sigin details
  loginId : string ='';
  userEmail : string = '';
  password : string = '';
  userType : string = '';
  isAuth : boolean = false;


  //common key used for Encryption and Decryption
  key : string = 'guru123';

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
    return this.http.get(this.usersUrl);
  }

  //for logging out user
  logoutUser(){
    localStorage.clear();
    this.isAuth = false;
    this.loginId = '';
    this.userEmail = '';
    this.userType = '';
  }


  //for encrypting the text
  encrypt(msg:string){
    return cryptoJS.AES.encrypt(msg,this.key).toString();
  }
  //for decrypting the text
  decrypt(msg:any){
    return cryptoJS.AES.decrypt(msg,this.key).toString(cryptoJS.enc.Utf8);
  }
}
