import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 

const materialModules = [
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [ ...materialModules]
})
export class AngularMaterialModule { }
