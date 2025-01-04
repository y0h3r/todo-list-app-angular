import { Routes } from '@angular/router';
import { LandingComponent } from '@features/landing/landing.component';
import { TodoHomeComponent } from '@features/todo-home/todo-home.component';
import { authGuard } from '@shared/guards/auth.guard';
import { notUserGuard } from '@shared/guards/not-user.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [notUserGuard] },
  { path: 'todo', component: TodoHomeComponent, canActivate: [authGuard] },
];
