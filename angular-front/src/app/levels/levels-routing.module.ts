import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { BeginnerComponent } from './beginner/beginner.component';
import { IntermediateComponent } from './intermediate/intermediate.component';

const routes: Routes = [
  {
    path:'beginner',
    component: BeginnerComponent
  },
  {
    path: 'intermediate',
    component: IntermediateComponent,
  },
  {
    path: 'advanced',
    component: AdvancedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelsRoutingModule { }
