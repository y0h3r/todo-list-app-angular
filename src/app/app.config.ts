import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { userReducer } from '@features/landing/state/user.reducer';
import { UserEffects } from '@features/landing/state/user.effects';
import { taskReducer } from '@features/todo-home/state/task.reducer';
import { TaskEffects } from '@features/todo-home/state/task.effects';
import { localStorageMetaReducer } from '@shared/local-storage/state/local-storage-meta-reducer';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        useDefaultLang: true,
        defaultLanguage: 'es',
      }),
    ]),
    provideStoreDevtools(),
    provideStore(
      { users: userReducer, tasks: taskReducer },
      { metaReducers: [localStorageMetaReducer] }
    ),
    provideEffects([UserEffects, TaskEffects]),
  ],
};
