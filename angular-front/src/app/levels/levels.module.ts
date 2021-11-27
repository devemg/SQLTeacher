import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsRoutingModule } from './levels-routing.module';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { BeginnerComponent } from './beginner/beginner.component';
import { AdvancedComponent } from './advanced/advanced.component';


@NgModule({
  declarations: [
    IntermediateComponent,
    BeginnerComponent,
    AdvancedComponent
  ],
  imports: [
    CommonModule,
    LevelsRoutingModule
  ]
})
export class LevelsModule { }
