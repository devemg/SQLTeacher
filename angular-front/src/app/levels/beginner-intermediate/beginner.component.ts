import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beginner',
  templateUrl: './beginner.component.html',
  styleUrls: ['./beginner.component.scss']
})
export class BeginnerComponent implements OnInit {
  
  isBeginner = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isBeginner = this.router.url.includes('beginner');
  }

}
