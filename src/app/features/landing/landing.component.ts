import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ResponsiveGridDirective } from '@shared/directives/responsive-grid.directive';
import { ResponsiveTileDirective } from '@shared/directives/responsive-tile.directive';
import { FormErrorStateMatcher } from '@shared/validators/form-error-state-matcher';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { User } from '@features/landing/state/user.state';
import {
  selectedUser,
  selectError,
} from '@features/landing/state/user.selectors';
import { createUser, loadUser } from '@features/landing/state/user.actions';

const NOT_FOUND_STATUS_CODE = 404;
@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    ResponsiveGridDirective,
    ResponsiveTileDirective,
    MatGridListModule,
    MatGridTile,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: ErrorStateMatcher, useClass: FormErrorStateMatcher }],
})
export class LandingComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  isInitialized = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new FormErrorStateMatcher();
  user: User | null = null;

  constructor(private store: Store) {
    this.subscriptions.push(this.loadUserSubscription());
    this.subscriptions.push(this.loadUserFailureSubscription());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isInitialized = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  onVerify(): void {
    if (this.emailFormControl.value) {
      this.store.dispatch(loadUser({ email: this.emailFormControl.value }));
    }
  }

  createUser(): void {
    if (this.emailFormControl.value) {
      this.store.dispatch(
        createUser({ user: { email: this.emailFormControl.value } })
      );
    }
  }

  private loadUserSubscription(): Subscription {
    const selectedUser$ = this.store.select(selectedUser);
    return selectedUser$.subscribe((data) => {
      if (data) {
        this.user = data;
        window.location.reload();
      }
    });
  }

  private loadUserFailureSubscription(): Subscription {
    const selectedError$ = this.store.select(selectError);
    return selectedError$.subscribe((data) => {
      if (data?.status === NOT_FOUND_STATUS_CODE) {
        const isConfirmed = confirm('Quieres crear el usuario?');
        if (isConfirmed) {
          this.createUser();
        }
      }
      return data;
    });
  }
}
