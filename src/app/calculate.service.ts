import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})

export class CalculateService {

  private readonly CALCULATOR_API_URL;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
      this.CALCULATOR_API_URL = appConfigService.getAppConfig().backEndCalculetteUrl;
  }

  public add(operand1: number, operand2: number): Observable<any> {
    return this.getCalculResult("/add", this.buildParameters(operand1, operand2));
  }

  public subtract(operand1: number, operand2: number): Observable<any> {
    return this.getCalculResult("/subtract", this.buildParameters(operand1, operand2));
  }

  public multiply(operand1: number, operand2: number): Observable<any> {
    return this.getCalculResult("/multiply", this.buildParameters(operand1, operand2));
  }

  public divide(operand1: number, operand2: number): Observable<any> {
    return this.getCalculResult("/divide", this.buildParameters(operand1, operand2));
  }

  private getCalculResult(url: string, httpParams: HttpParams): Observable<any> {
    return this.http
      .get(this.CALCULATOR_API_URL + url, {headers: this.getHeaders(), params: httpParams});
  }

  private buildParameters(operand1: number, operand2: number): HttpParams {
    return new HttpParams().set('operand1', operand1.toString()).set('operand2', operand2.toString());
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': 'localhost:4200'
    })
  }
}
