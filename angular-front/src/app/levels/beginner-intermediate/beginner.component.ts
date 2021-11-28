import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBoxBlockly } from './toolbox';
@Component({
  selector: 'app-beginner',
  templateUrl: './beginner.component.html',
  styleUrls: ['./beginner.component.scss']
})
export class BeginnerComponent implements OnInit {
  ToolBoxBlockly = ToolBoxBlockly;
  isBeginner = false;
  sourceCode: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isBeginner = this.router.url.includes('beginner');
  }

  blocklyChanges(event: string) {
    this.sourceCode = event;
  }
}
