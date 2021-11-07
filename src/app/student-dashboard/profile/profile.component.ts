import { Component, OnInit } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  step1: boolean = true;
  step2: boolean = false;

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
  pucbranch = '';
  pucdatejoin = 0;
  pucdatcomplete = 0;
  puc1: string = '';
  puc2: string = '';
  puccgpag: string = '';
  xboard: string = '';
  xcgpa: string = '';
  xdate: string = '';
  skills: string = '';
  pathOfFile: string = '';



  constructor() {}

  ngOnInit(): void {}

  nextStep() {
    this.step1 = false;
    this.step2 = true;
  }
  previousStep() {
    this.step1 = true;
    this.step2 = false;
  }

  uploadFile(event: any) {
    const storage = getStorage();
    const file = event.target.files[0];
    const filePath = 'images/' + file.name;
    const fileRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  updateData() {
    let data = {
      sid: JSON.parse(localStorage.getItem('loginData') ?? '').name.split(
        '@'
      )[0],
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      dob: this.dob,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      pincode: this.pin,
    };
    console.log(data);
  }
}
