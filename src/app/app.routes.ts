import { Routes } from '@angular/router';
import { Menu } from './components/menu/menu';
import { Juego } from './components/juego/juego';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'juego', component: Juego },
  { path: '**', redirectTo: '' }
];
