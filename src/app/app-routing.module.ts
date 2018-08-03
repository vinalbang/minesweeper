import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from './rules/rules.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
 {
   path:'',
   component: RulesComponent,
   runGuardsAndResolvers : 'always'
 },
 {
   path:'game/:id',
   component: GameComponent,
   runGuardsAndResolvers : 'always'
 }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation:'ignore'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
