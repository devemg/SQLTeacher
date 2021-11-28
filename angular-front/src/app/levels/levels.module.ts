import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsRoutingModule } from './levels-routing.module';
import { IntermediateComponent } from './intermediate/intermediate.component';
import { BeginnerComponent } from './beginner/beginner.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';


@NgModule({
  declarations: [
    IntermediateComponent,
    BeginnerComponent,
    AdvancedComponent
  ],
  imports: [
    CommonModule,
    LevelsRoutingModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class LevelsModule { }
