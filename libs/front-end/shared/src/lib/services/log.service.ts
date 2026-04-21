/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, ErrorHandler, inject } from '@angular/core';
import { APP_CONFIG_TOKEN } from '../tokens/config.token';



/**
 * To use LogService in providers of any module, provide 'InjectionToken' 'APP_CONFIG_TOKEN',
 * which must be envinroment variable, and ErrorHandler
 * 
 * @usageNotes
 * ### Example
 * 
 * ```
 * import { environment } from '../environments/environment';
 * import { ErrorHandler } from '@angular/core';
 * import { APP_CONFIG_TOKEN, LogService } from '@sg/core/services'; 
 * 
 * @NgModule({
 *   providers: [
 *    { provide: APP_CONFIG_TOKEN, useValue: environment },
 *    LogService,
 *    ErrorHandler
 *  ]
 * })
 * class MyModule {}
 * ```
 */

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private errorHandler = inject(ErrorHandler);
  public env = inject(APP_CONFIG_TOKEN).envRCP;

  log(value: any, ...rest: any[]) {
    if (!(this.env as any)?.production) {
      console.log(value, ...rest);
    }
  }

  error(error: Error) {
    this.errorHandler.handleError(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
