import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  submitData(){
    this.router.navigate(['/admindb/application-view']);
  }

}
