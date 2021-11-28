import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqltBlocklyComponent } from './components/cqlt-blockly/cqlt-blockly.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule } from '@angular/forms';

const components = [
  CqltBlocklyComponent,
    EditorComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MonacoEditorModule.forRoot(),
    FormsModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
