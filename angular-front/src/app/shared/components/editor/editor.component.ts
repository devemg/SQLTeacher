import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'monaco-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() code: string = '';
  @ViewChild('monacoEditor') editor: any;

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  constructor() { }

  ngOnInit(): void {
  }

  getCode() {
    return this.code;
  }

}
