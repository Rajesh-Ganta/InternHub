import { AllPurposeService } from './../allpurposervice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  studentId=''
  password=''
  isValid=false
  errorValue=''
  userType=''

  userDetails = [
    {
      name : "GuruNadh",
      password : "S160552",
      studentid : "S160552",
      class : "3D",
      type:'admindb'
    },
    {
      name : "Rajesh Ganta",
      password : "S160215",
      studentid : "S160215",
      class : "3D",
      type:'studentdb'
    },
    {
      name : "Satish",
      password : "S160980",
      studentid : "S160980",
      class : "3D",
      type:'admindb'
    },
    {
      name : "Lucky",
      password : "S160215",
      studentid : "S160215",
      class : "3D",
      type:'studentdb'
    },
    {
      name : "Vamsi",
      password : "S160839",
      studentid : "S160839",
      class : "3D",
      type:'guestdb'
    },
  ]


  constructor(private router:Router,private allPurpose:AllPurposeService) { }

  ngOnInit(): void {
    if(localStorage.getItem('loginData')){
      let r = JSON.parse(localStorage.getItem('loginData')??'');
      this.router.navigateByUrl(r.type)
    }
  }

  login(){
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

    this.allPurpose.login(this.studentId,this.password).subscribe((resp)=>{
      console.log(resp);
    });
    this.allPurpose.getUsers(this.studentId).subscribe((res:any)=>{
      Object.keys(res).forEach((k) => {
      if (res[k].email == this.studentId) {
        this.userType = res[k].userType;
        console.log(this.userType);
        }
      });
    });
    console.log(this.userType);
  }

}
