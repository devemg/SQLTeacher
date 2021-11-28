import { Component, OnInit } from '@angular/core';
import { ToolBoxBlockly } from './toolbox';

declare var Blockly: any;
@Component({
  selector: 'cqlt-blockly',
  templateUrl: './cqlt-blockly.component.html',
  styleUrls: ['./cqlt-blockly.component.scss']
})
export class CqltBlocklyComponent implements OnInit {
  private workspace: any;
  constructor() { }

  ngOnInit(): void {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: ToolBoxBlockly,
      readOnly: false,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      zoom:{
      controls: true,
       wheel: true,
       startScale: 1.0,
       maxScale: 3,
       minScale: 0.3,
       scaleSpeed: 1.2}
    });
  }

}
