import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TodosModule } from './todos';

import { AppRoute } from './app.route';
import { HomeRoute } from './home.route';
import { DashRoute } from './dash.route';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeRoute
  },
  {
    path: 'dash',
    component: DashRoute
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TodosModule,
  ],
  declarations: [
    AppRoute,
    HomeRoute,
    DashRoute,
  ],
  bootstrap: [AppRoute],
})
export class AppModule {}
