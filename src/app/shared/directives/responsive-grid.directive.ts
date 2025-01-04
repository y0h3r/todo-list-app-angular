import { Directive, Input, OnInit, HostListener } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { GRID_SIZES, SCREEN_SIZES } from '@shared/constants/screen-sizes';

@Directive({
  standalone: true,
  selector: '[appResponsiveGrid]',
})
export class ResponsiveGridDirective implements OnInit {
  @Input() smallScreenCols: number = GRID_SIZES.SMALL;
  @Input() mediumScreenCols: number = GRID_SIZES.MEDIUM;
  @Input() largeScreenCols: number = GRID_SIZES.LARGE;

  constructor(private matGrid: MatGridList) {}

  ngOnInit(): void {
    this.setInitialColumns();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustColumns();
  }

  private setInitialColumns(): void {
    const initialWidth = window.innerWidth;
    const initialCols = this.getColumnCountForWidth(initialWidth);
    this.setGridColumns(initialCols);
  }

  private adjustColumns(): void {
    const width = window.innerWidth;
    const cols = this.getColumnCountForWidth(width);
    this.setGridColumns(cols);
  }

  private getColumnCountForWidth(width: number): number {
    if (width < SCREEN_SIZES.SMALL) {
      return this.smallScreenCols;
    } else if (width < SCREEN_SIZES.MEDIUM) {
      return this.mediumScreenCols;
    } else {
      return this.largeScreenCols;
    }
  }

  private setGridColumns(cols: number): void {
    this.matGrid.cols = cols;
  }
}
