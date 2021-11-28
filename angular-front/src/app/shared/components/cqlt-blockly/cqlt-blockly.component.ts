import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var Blockly: any;
@Component({
  selector: 'cqlt-blockly',
  templateUrl: './cqlt-blockly.component.html',
  styleUrls: ['./cqlt-blockly.component.scss']
})
export class CqltBlocklyComponent implements OnInit {
  private workspace: any;
  @Output() change: EventEmitter<string> = new EventEmitter();
  @Input() toolbox: string | undefined;
  constructor() { }

  ngOnInit(): void {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: this.toolbox ? this.toolbox : '',
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
    this.workspace.addChangeListener(()=> {
      var code = Blockly.JavaScript.workspaceToCode(this.workspace);
      this.change.emit(code);
    })
  }

}
