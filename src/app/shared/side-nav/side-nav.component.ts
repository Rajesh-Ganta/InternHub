import { Router } from '@angular/router';
import { AllPurposeService } from './../../allpurposervice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private allPurpose:AllPurposeService,private router:Router) { }
  userType : string =  this.allPurpose.userType;
  ngOnInit(): void {
  }
  logout(){
    this.allPurpose.logoutUser();
    this.router.navigateByUrl('');
  }
}
