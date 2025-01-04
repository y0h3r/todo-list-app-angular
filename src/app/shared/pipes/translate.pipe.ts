import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private cache: { [key: string]: string } = {};
  constructor(private translate: TranslateService) {}

  transform(value: string): string {
    if (this.cache[value]) {
      return this.cache[value];
    }

    this.translate.get(value).subscribe((res: string) => {
      this.cache[value] = res;
    });

    return this.cache[value] || value;
  }
}
