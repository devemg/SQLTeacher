import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsRoutingModule } from './levels-routing.module';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { BegginerComponent } from './begginer/begginer.component';
import { AdvancedComponent } from './advanced/advanced.component';


@NgModule({
  declarations: [
    IntermediateComponent,
    BegginerComponent,
    AdvancedComponent
  ],
  imports: [
    CommonModule,
    LevelsRoutingModule
  ]
})
export class LevelsModule { }
