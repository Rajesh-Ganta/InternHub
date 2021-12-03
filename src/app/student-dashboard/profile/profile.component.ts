import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  step1: boolean = true;
  step2: boolean = false;
  disable : boolean = true;

  data : any = [];

  fname: string = '';
  lname: string = '';
  email: string = '';
  dob: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  state: string = '';
  pin: string = '';
  clg_name: string =
    'Rajiv Gandhi University of Knowledge Technologies Srikakulam';
  roll_number: string = '';
  enggbranch: string = '';
  enggdatejoin: string = '';
  enggdatecomplete: string = '';
  engge1s1: string = '';
  engge1s2: string = '';
  engge2s1: string = '';
  engge2s2: string = '';
  engge3s1: string = '';
  engge3s2: string = '';
  engge4s1: string = '';
  engge4s2: string = '';
  enggcgpa: string = '';
  pucbranch : string = '';
  pucdatejoin: string = '';
  pucdatecomplete: string = '';
  puc1: string = '';
  puc2: string = '';
  puccgpa: string = '';
  xboard: string = '';
  xcgpa: string = '';
  xdate: string = '';
  skills: string = '';
  pathOfFile: string = '';


  currentUser : string = '';


  header : any = new HttpHeaders()
   .set('content-type','application/json')
   .set('Access-Control-Allow-Origin', '*');


  constructor(private router:Router,private http:HttpClient) {}

  ngOnInit(): void {
      let x:any = JSON.parse(localStorage.getItem('loginData')??'');
      this.currentUser = x.type;
      console.log(this.currentUser);

      let user_data = JSON.parse(localStorage.getItem('loginData')??'');
      let email = user_data.name
      console.log(email);
      this.http.get("http://localhost:8000/profile_data/" + email).subscribe((res)=>{
      this.data = res;
      console.log(res);

      if(this.data != null){
        this.fname = this.data.fname;
        this.lname = this.data.lname   ;
        this.email = this.data.email   ;
        this.dob = this.data.dob   ;
        this.address1 = this.data.address1   ;
        this.address2 = this.data.address2   ;
        this.city = this.data.city   ;
        this.state = this.data.state   ;
        this.pin = this.data.pin   ;
        this.clg_name =
          'Rajiv Gandhi University of Knowledge Technologies Srikakulam';
        this.roll_number = this.data.roll_number   ;
        this.enggbranch = this.data.enggbranch   ;
        this.enggdatejoin = this.data.enggdatejoin   ;
        this.enggdatecomplete = this.data.enggdatecomplete   ;
        this.engge1s1 = this.data.engge1s1   ;
        this.engge1s2 = this.data.engge1s2   ;
        this.engge2s1 = this.data.engge2s1   ;
        this.engge2s2 = this.data.engge2s2   ;
        this.engge3s1 = this.data.engge3s1   ;
        this.engge3s2 = this.data.engge3s2   ;
        this.engge4s1 = this.data.engge4s1   ;
        this.engge4s2 = this.data.engge4s2   ;
        this.enggcgpa = this.data.enggcgpa   ;
        this.pucbranch  = this.data.pucbranch   ;
        this.pucdatejoin = this.data.pucdatejoin   ;
        this.pucdatecomplete = this.data.pucdatecomplete   ;
        this.puc1 = this.data.puc1   ;
        this.puc2 = this.data.puc2   ;
        this.puccgpa = this.data.puccgpa   ;
        this.xboard = this.data.xboard   ;
        this.xcgpa = this.data.xcgpa   ;
        this.xdate = this.data.xdate   ;
        this.skills = this.data.skills   ;
        this.pathOfFile = this.data.path   ;
      }
    },(err)=>{
      console.log(err)
    })

  }

  nextStep() {
    this.step1 = false;
    this.step2 = true;
  }
  previousStep() {
    this.step1 = true;
    this.step2 = false;
  }

  uploadFile(event: any) {
    // const storage = getStorage();
    // const file = event.target.files[0];
    // const filePath = 'images/' + file.name;
    // const fileRef = ref(storage, filePath);
    // const uploadTask = uploadBytesResumable(fileRef, file);
    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    //   }
    // );
  }
  updateData() {
    // console.log("Update Called");
    this.data = {
      "fname":this.fname,"lname":this.lname,"email":this.email,"dob":this.dob,"address1":this.address1,"address2":this.address2,
      "city":this.city,"state":this.state,"pin":this.pin,"clg_name":this.clg_name,"roll_number":this.roll_number,"enggbranch":this.enggbranch,
      "enggdatejoin":this.enggdatejoin,"enggdatecomplete":this.enggdatecomplete,"engge1s1":this.engge1s1,"engge1s2":this.engge1s2,
      "engge2s1":this.engge2s1,"engge2s2":this.engge2s2,"engge3s1":this.engge3s1,"engge3s2":this.engge3s2,"engge4s1":this.engge4s1,
      "engge4s2":this.engge4s2,"enggcgpa":this.enggcgpa,"pucbranch":this.pucbranch,"pucdatejoin":this.pucdatejoin,"pucdatecomplete":this.pucdatecomplete,
      "puc1":this.puc1,"puc2":this.puc2,"puccgpa":this.puccgpa,"xboard":this.xboard,"xcgpa":this.xcgpa,"xdate":this.xdate,"skills":this.skills,
      "path":this.pathOfFile
    };
    console.log(this.data)
    this.http.post("http://localhost:8000/create_student",this.data).subscribe((res)=>{
      console.log(res);
    },(err) => {
      console.log(err);
    },()=>{
      alert("Student Profile Created!!!");
    })
    // let data = {
    //   sid: JSON.parse(localStorage.getItem('loginData') ?? '').name.split(
    //     '@'
    //   )[0],
    //   fname: this.fname,
    //   lname: this.lname,
    //   email: this.email,
    //   dob: this.dob,
    //   address1: this.address1,
    //   address2: this.address2,
    //   city: this.city,
    //   state: this.state,
    //   pincode: this.pin,
    // };

    // console.log("Hui" + "\n" + this.data)
    // console.log(data);
  }
  submitEmployeeProfile(){
    let role = JSON.parse(localStorage.getItem('loginData')??'').type.toString();
    this.data = {
      "fname":this.fname,"lname":this.lname,"email":this.email,"dob":this.dob,"address1":this.address1,"address2":this.address2,
      "city":this.city,"state":this.state,"pin":this.pin,"clg_name":this.clg_name,"roll_number":this.roll_number,"enggbranch":this.enggbranch,
      "enggdatejoin":this.enggdatejoin,"enggdatecomplete":this.enggdatecomplete,"engge1s1":this.engge1s1,"engge1s2":this.engge1s2,
      "engge2s1":this.engge2s1,"engge2s2":this.engge2s2,"engge3s1":this.engge3s1,"engge3s2":this.engge3s2,"engge4s1":this.engge4s1,
      "engge4s2":this.engge4s2,"enggcgpa":this.enggcgpa,"pucbranch":this.pucbranch,"pucdatejoin":this.pucdatejoin,"pucdatecomplete":this.pucdatecomplete,
      "puc1":this.puc1,"puc2":this.puc2,"puccgpa":this.puccgpa,"xboard":this.xboard,"xcgpa":this.xcgpa,"xdate":this.xdate,"skills":this.skills,
      "path":this.pathOfFile
    };

    //console.log("Hui" + "\n" + this.data)
    this.http.post("http://localhost:8000/create_student",{headers:this.header},this.data).subscribe((res)=>{
      console.log(res);
    },(err) => {
      console.log(err);
    },()=>{
      alert("Profile Created");
    })
    this.router.navigate([`${role}/profile`]);
  }
  editForm(){
    this.disable = this.disable?false:true;
  }
}
