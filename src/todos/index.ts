import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosRoute } from './todos.route';

const todosRoutes: Routes = [
  {
    path: 'todos',
    component: TodosRoute
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(todosRoutes)
  ],
  declarations: [
    TodosRoute
  ]
})
export class TodosModule {}
