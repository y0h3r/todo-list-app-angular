import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';
import { SCREEN_SIZES, TILE_SIZE } from '@shared/constants/screen-sizes';

@Directive({
  standalone: true,
  selector: '[appResponsiveTile]',
})
export class ResponsiveTileDirective implements OnInit {
  @Input() smallScreenCols: number = TILE_SIZE;
  @Input() mediumScreenCols: number = TILE_SIZE;
  @Input() largeScreenCols: number = TILE_SIZE;

  constructor(private matTile: MatGridTile) {}

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
    this.matTile.colspan = cols;
  }
}
