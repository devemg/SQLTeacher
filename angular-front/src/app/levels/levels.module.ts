import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsRoutingModule } from './levels-routing.module';
import { BeginnerComponent } from './beginner-intermediate/beginner.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';


@NgModule({
  declarations: [
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
