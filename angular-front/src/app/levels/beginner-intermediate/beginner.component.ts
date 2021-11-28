import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBoxBeginnerBlockly } from './toolbox-beginner';
import { ToolIntermediateBoxBlockly } from './toolbox-intermediate';
@Component({
  selector: 'app-beginner',
  templateUrl: './beginner.component.html',
  styleUrls: ['./beginner.component.scss']
})
export class BeginnerComponent implements OnInit {
  toolBoxBlockly = '';
  isBeginner = false;
  sourceCode: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isBeginner = this.router.url.includes('beginner');
    this.toolBoxBlockly = this.isBeginner ? ToolBoxBeginnerBlockly : ToolIntermediateBoxBlockly;
  }

  blocklyChanges(event: string) {
    this.sourceCode = event;
  }
}
