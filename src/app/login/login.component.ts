import { AllPurposeService } from './../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router, private allPurpose: AllPurposeService) {}

  ngOnInit(): void {
    if (localStorage.getItem('loginData')) {
      let r = JSON.parse(localStorage.getItem('loginData') ?? '');
      this.router.navigateByUrl(r.type);
    }
  }

  login() {
    // if(this.studentId=='' && this.password==''){
    //   this.errorValue = 'Kindly Enter UserName and Password'
    //   this.isValid = true
    // }
    // else{
    //   this.userDetails.forEach((elem)=>{
    //     if(elem.password==this.password && elem.studentid == this.studentId){
    //       localStorage.setItem('loginData',JSON.stringify({name:this.studentId,password:this.password,type:elem.type}))
    //       this.router.navigateByUrl(elem.type)
    //     }
    //   });
    //   this.errorValue = 'Invalid credentials'
    //   this.isValid = true
    // }

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
            this.userType = res[k].userType;
          }
        });
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
}
