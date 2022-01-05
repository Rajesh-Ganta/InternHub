import { AllPurposeService } from './../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  studentId = '';
  password = '';
  isValid = false;
  errorValue = '';
  userType = '';

  studentName:any='';
  studentEmail:any='';
  studentPhone:any='';
  studentPassword:any='';
  studentCPassword:any='';
  studentSId:any = '';

  isSign:boolean=false;


  constructor(private router: Router, private allPurpose: AllPurposeService,private http:HttpClient) {}

  ngOnInit(): void {
    console.log(this.allPurpose.encrypt("Guru"));
    let m = this.allPurpose.encrypt("Guru");
    console.log(this.allPurpose.decrypt(m));


    if (localStorage.getItem('loginData')) {
      let r = JSON.parse(localStorage.getItem('loginData') ?? '');
      this.router.navigateByUrl(r.type);
    }
  }

  login() {
    this.allPurpose.login(this.studentId, this.password).subscribe(
      (resp) => {
        console.log(resp);
        this.allPurpose.userEmail = this.studentId;
        this.allPurpose.password = this.password;
      },
      (err) => {
        console.log(err);
        // console.log(err.error.error.message);
        this.errorValue = "Invalid Credentials";
        this.isValid = true;
      },
      () => {
        console.log('Completed 1st Api Call');
        this.checkUserType();
      }
    );
  }
  //for checking user type we are using this function
  checkUserType() {
    this.allPurpose.getUsers(this.studentId).subscribe(
      (res: any) => {
        Object.keys(res).forEach((k) => {
          if (res[k].email == this.studentId) {
            this.userType = res[k].user_type;
          }
        });
        console.log(this.userType);
      },
      (err) => {
        console.log('Error');
        console.log(err);
        console.log(err.error.error.message);
        this.errorValue = "Invalid User";
        this.isValid = true;
      },
      () => {
        console.log('Completed 2nd Api Call');
        console.log(this.userType);
        this.allPurpose.userType = this.userType;
        this.allPurpose.isAuth = true;
        // localStorage.setItem('loginData',JSON.stringify({name:this.studentId,type:this.userType}));
        localStorage.setItem("loginData",JSON.stringify({name:this.studentId,type:this.userType+'db'}));
        this.router.navigateByUrl(this.userType+'db')
      }
    );
  }

  register(){
    if(this.studentCPassword!=this.studentPassword && (this.studentEmail!='' || this.studentPassword!='' || this.studentId!='' || this.studentPhone!='')){
      this.errorValue = "Invalid Data";
      this.isValid = true;
      return;
    }
    let header = new HttpHeaders()
   .set('content-type','application/json')
   .set('Access-Control-Allow-Origin', '*');
    this.http.post("http://192.168.224.100:8000/userdata",{"data":{sid:this.studentId.toLocaleLowerCase(),name:this.studentName,email:this.studentEmail,userType:'student'}},{headers:header}).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      this.http.post(environment.firebaseSignUp,{email:this.studentEmail,password:this.studentPassword,returnSecureToken:true}).subscribe((res)=>{
      },(err)=>{
      },()=>{
      })
    })
  }
}

