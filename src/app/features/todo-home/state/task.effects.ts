import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as TaskActions from '@features/todo-home/state/task.actions';
import { TaskService } from '@features/todo-home/task.service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadAllTasks),
      mergeMap((action) =>
        this.taskService.getAllUserTasks(action.userId).pipe(
          map((tasks) => TaskActions.loadAllTasksSuccess({ tasks })),
          catchError((error) =>
            of(
              TaskActions.loadAllTasksFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap((action) =>
        this.taskService.createTask(action.task).pipe(
          map((task) => TaskActions.createTaskSuccess({ task })),
          catchError((error) =>
            of(
              TaskActions.createTaskFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap((action) =>
        this.taskService.updateTask(action.task, action.taskId).pipe(
          map((task) => {
            return TaskActions.updateTaskSuccess({
              changes: action.task,
              taskId: action.taskId,
            });
          }),
          catchError((error) =>
            of(
              TaskActions.updateTaskFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.taskId).pipe(
          map(() =>
            TaskActions.deleteTaskSuccess({
              taskId: action.taskId,
            })
          ),
          catchError((error) =>
            of(
              TaskActions.deleteTaskFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );
}
