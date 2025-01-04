import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ResponsiveGridDirective } from '@shared/directives/responsive-grid.directive';
import { ResponsiveTileDirective } from '@shared/directives/responsive-tile.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { FormErrorStateMatcher } from '@shared/validators/form-error-state-matcher';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { User } from '@features/landing/state/user.state';
import {
  createTask,
  deleteTask,
  loadAllTasks,
  updateTask,
} from '@features/todo-home/state/task.actions';
import { Store } from '@ngrx/store';
import { selectedUser } from '@features/landing/state/user.selectors';
import { Task } from '@features/todo-home/state/task.state';
import { selectAllTasks } from '@features/todo-home/state/task.selectors';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-home',
  imports: [
    CommonModule,
    ResponsiveGridDirective,
    ResponsiveTileDirective,
    MatGridListModule,
    MatGridTile,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.scss',
  providers: [{ provide: ErrorStateMatcher, useClass: FormErrorStateMatcher }],
})
export class TodoHomeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  isInitialized = false;
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', []);
  idFormControl = new FormControl('', []);
  isCompletedTodo = false;
  matcher = new FormErrorStateMatcher();
  todos = new Array(25).fill('test');
  cachedUser: User | null = null;
  allUserTasks: Task[] = [];

  constructor(private store: Store) {
    this.subscriptions.push(this.loadUserSubscription());
    this.subscriptions.push(this.loadTasksSubscription());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isInitialized = true;
    });
  }

  handleCreateTodo(): void {
    if (this.titleFormControl.valid) {
      this.store.dispatch(
        createTask({
          task: {
            completed: false,
            description: this.descriptionFormControl.value || '',
            title: this.titleFormControl.value || '',
            user: this.cachedUser?.id,
          },
        })
      );
      this.handleClearTodoForm();
    }
  }

  handleUpdateTodo(): void {
    if (this.titleFormControl.valid) {
      this.store.dispatch(
        updateTask({
          task: {
            completed: this.isCompletedTodo,
            description: this.descriptionFormControl.value || '',
            title: this.titleFormControl.value || '',
            user: this.cachedUser?.id,
            id: this.idFormControl.value || '',
          },
          taskId: this.idFormControl.value || '',
        })
      );
      this.handleClearTodoForm();
    }
  }

  handleDelete(task: Task): void {
    this.store.dispatch(
      deleteTask({
        taskId: task.id || '',
      })
    );
    this.handleClearTodoForm();
  }

  handleToogleTask(task: Task): void {
    this.store.dispatch(
      updateTask({
        task: {
          completed: !task.completed,
          description: task.description,
          title: task.title,
          user: task.user,
          id: task.id,
        },
        taskId: task.id || '',
      })
    );
  }

  handleLoadTodoOnForm(task: Task): void {
    this.titleFormControl.setValue(task.title);
    this.descriptionFormControl.setValue(task.description);
    this.idFormControl.setValue(task.id || '');
    this.isCompletedTodo = task.completed;
  }

  handleClearTodoForm(): void {
    this.titleFormControl.clearValidators();
    this.titleFormControl.setValue('');
    this.descriptionFormControl.setValue('');
    this.idFormControl.setValue('');
  }

  private loadUserSubscription(): Subscription {
    const selectedUser$ = this.store.select(selectedUser);
    return selectedUser$.subscribe((user: User | null) => {
      console.log(user);
      if (user?.id) {
        this.store.dispatch(loadAllTasks({ userId: user.id }));
      }
      this.cachedUser = user;
      return user;
    });
  }

  private loadTasksSubscription(): Subscription {
    const allUserTasks$ = this.store.select(selectAllTasks);
    return allUserTasks$.subscribe((tasks) => (this.allUserTasks = tasks));
  }
}
