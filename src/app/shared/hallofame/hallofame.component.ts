import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hallofame',
  templateUrl: './hallofame.component.html',
  styleUrls: ['./hallofame.component.css']
})
export class HallofameComponent implements OnInit {

  selectedStudents :any =[
    {
      name:"LaxmiNaryana Menda",
      sid:"S160307",
      profUrl:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
      name:"Satissh",
      sid:"S160980",
      profUrl:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
      name:"Vamsi",
      sid:"S160839",
      profUrl:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    },
    {
      name:"Rajesh",
      sid:"S160215",
      profUrl:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
