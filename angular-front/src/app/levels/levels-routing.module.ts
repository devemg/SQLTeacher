import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { BeginnerComponent } from './beginner-intermediate/beginner.component';
import { LevelsHomeComponent } from './levels-home/levels-home.component';

const routes: Routes = [
  {
    path: '',
    component: LevelsHomeComponent,
  },
  {
    path:'beginner',
    component: BeginnerComponent
  },
  {
    path: 'intermediate',
    component: BeginnerComponent,
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
