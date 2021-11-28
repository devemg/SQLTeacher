import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqltBlocklyComponent } from './components/cqlt-blockly/cqlt-blockly.component';



@NgModule({
  declarations: [
    CqltBlocklyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CqltBlocklyComponent
  ]
})
export class SharedModule { }
