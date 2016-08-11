import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <ul>
      <li><a routerLink="/">Start</a></li>
      <li><a routerLink="/dash">Dash</a></li>
      <li><a routerLink="/todos">Todos (Separate Module)</a></li>
    </ul>
    <h1>App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppRoute {}
