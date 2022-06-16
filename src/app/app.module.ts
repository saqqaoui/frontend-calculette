import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {CalculateService} from "./calculate.service";
import {AppConfigService} from "./app-config.service";
import {HttpClientModule} from "@angular/common/http";
import {CalculatorComponent} from './calculette/calculator.component';


/**
 * Exported function so that it works with AOT
 * @param {AppConfigService} configService
 * @returns {Function}
 */
export function loadConfigService(configService: AppConfigService): () => Promise<unknown> {
  return () => {
    return configService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      CalculateService,
      AppConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: loadConfigService,
        deps: [AppConfigService],
        multi: true,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
