import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';

import { ResponsiveGridDirective } from '@shared/directives/responsive-grid.directive';
import { ResponsiveTileDirective } from '@shared/directives/responsive-tile.directive';
import { FormErrorStateMatcher } from '@shared/validators/form-error-state-matcher';

@NgModule({
  declarations: [ResponsiveGridDirective, ResponsiveTileDirective],
  imports: [CommonModule],
  exports: [ResponsiveGridDirective, ResponsiveTileDirective],
  providers: [{ provide: ErrorStateMatcher, useClass: FormErrorStateMatcher }],
})
export class SharedModule {}
