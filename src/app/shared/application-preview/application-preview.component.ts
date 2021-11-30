import { Component, OnInit } from '@angular/core';
import { AllPurposeService } from 'src/app/allpurposervice.service';

@Component({
  selector: 'app-application-preview',
  templateUrl: './application-preview.component.html',
  styleUrls: ['./application-preview.component.css']
})
export class ApplicationPreviewComponent implements OnInit {

  data :any;
  constructor(private allpurpose: AllPurposeService) { }

  ngOnInit(): void {
    this.data = this.allpurpose.post;
    console.log(this.data);
  }

}
