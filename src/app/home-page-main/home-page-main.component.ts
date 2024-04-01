import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-home-page-main',
  templateUrl: './home-page-main.component.html',
  styleUrls: ['./home-page-main.component.css']
})
export class HomePageMainComponent implements OnInit{
  title='Navkar Artistry Hub'
  titleBackgroundImage='https://drive.google.com/uc?export=view&id=1tH5BJiVKeDvK93Sm2TrB4ipyTb7ZgDFp'
  elements=[
    {
      id:'1+',
      heading:'',
      imageLink:'https://drive.google.com/uc?export=view&id=1Y1X6Lj_-d-hlYH0LPi4FMXGccsMZGbUd'
    },
    {
      id:'1+',
      heading:'',
      imageLink:'https://drive.google.com/uc?export=view&id=1Y1X6Lj_-d-hlYH0LPi4FMXGccsMZGbUd'
    },
    {
      id:'1+',
      heading:'',
      imageLink:'https://drive.google.com/uc?export=view&id=1Y1X6Lj_-d-hlYH0LPi4FMXGccsMZGbUd'
    },
  ]

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.demoAlert();
  }

  demoAlert() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: '<strong>Notice:</strong> This is a demo environment. Any orders placed will not be fulfilled or processed.'
      }
    });
  }
}
