import { throwError as observableThrowError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Declaration of config class
 */
export class AppConfig {
  // Your properties here
    backEndCalculetteUrl: string = "";
}

/**
 * Global variable containing actual config to use. Initialised via ajax call
 */

/**
 * Service in charge of dynamically initialising configuration
 */
@Injectable()
export class AppConfigService {
  constructor(private http: HttpClient) {}

  private _appConfig: AppConfig = new AppConfig();

  public load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('./assets/config/app-settings.json')
        .pipe(
          map((res) => res as any),
          catchError((error: any): any => {
            reject(true);
            return observableThrowError('Server error');
          })
        )
        .subscribe((envResponse: any) => {
          const t = new AppConfig();
          // Modify envResponse here if needed (e.g. to ajust parameters for https,...)
          this._appConfig = Object.assign(t, envResponse);
          resolve(true);
        });
    });
  }

  getAppConfig(): AppConfig {
    return this._appConfig;
  }

}
