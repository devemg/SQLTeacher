import { Component, OnInit } from '@angular/core';
declare var Blockly: any;
@Component({
  selector: 'cqlt-blockly',
  templateUrl: './cqlt-blockly.component.html',
  styleUrls: ['./cqlt-blockly.component.scss']
})
export class CqltBlocklyComponent implements OnInit {
  config = `<xml id="toolbox" style="display: none">
  <category name="Control" colour="120">
    <block type="controls_if"></block>
    <block type="controls_repeat_ext" disabled="true"></block>
  </category>
  <category name="Text" colour="230">
    <block type="text"></block>
    <block type="text_print"></block>
  </category>
  <category name="Custom" colour="360">
    <block type="begin"></block>
    <block type="move"></block>
    <block type="end"></block>
  </category>
</xml>`;
workspace: any;
  constructor() { }

  ngOnInit(): void {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      scrollbars: false
    });
  }

}
