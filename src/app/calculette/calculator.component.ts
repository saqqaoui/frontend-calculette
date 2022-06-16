import {Component, OnInit} from '@angular/core';
import {CalculateService} from "../calculate.service";


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private readonly AVAILABLE_OPERATORS = ['/', '*', '-', '+'];

  constructor(private calculateService: CalculateService) {
  }

  ngOnInit(): void {
  }

  public input: string = '';
  public result: number | undefined = undefined;
  public errorMessage: string | undefined;

  private allOperators = /(\+|\-|\*|\/)/g;

  public calculateResult() {
    let operatorsAndOperands = this.input.split(this.allOperators);
    this.calculate(operatorsAndOperands)
      .then(value => {
        this.allClear();
        this.input = "" + value;
        this.result = value;
      })
      .catch(reason => {
        console.log(reason)
        this.errorMessage = reason.error.message;
      });
  }

  private add(a: number, b: number): Promise<number> {
    return this.calculateService.add(a, b).toPromise();
  }

  private subtract(a: number, b: number): Promise<number> {
    return this.calculateService.subtract(a, b).toPromise();
  }

  private multiply(a: number, b: number): Promise<number> {
    return this.calculateService.multiply(a, b).toPromise();
  };

  private divide(a: number, b: number): Promise<number> {
    return this.calculateService.divide(a, b).toPromise();
  }

  private async calculate(operatorsAndOperands: string[]) {
    let firstOperand = operatorsAndOperands[0] ? parseFloat(operatorsAndOperands[0]) : 0;
    let secondOperand;
    let operator;

    try {
      for (let i = 1; i < operatorsAndOperands.length;) {
        operator = operatorsAndOperands[i];
        secondOperand = parseFloat(operatorsAndOperands[i + 1]);
        firstOperand = await this.calculateOperation(firstOperand, secondOperand, operator).catch(reason => {
          return Promise.reject(reason);
        });
        i += 2;
      }
      return Promise.resolve(firstOperand);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private async calculateOperation(operand1: number, operand2: number, operator: string) {
    switch (operator) {
      case "+":
        return this.add(operand1, operand2);
      case "-":
        return this.subtract(operand1, operand2);
      case "*":
        return this.multiply(operand1, operand2);
      case "/":
        return this.divide(operand1, operand2);
    }
    throw Error("Unsupported operation");

  }

  public updateWithLastOperand(operand: string) {
    this.input = this.input + operand;
  }

  public appendOperator(operator: string) {
    const lastKey = this.input[this.input.length - 1];
    //Do not allow operators as input before operand, excepted "-"
    if (!lastKey && operator !== "-") {
      return;
    }
    //Do not allow operators more than once
    if (this.AVAILABLE_OPERATORS.includes(lastKey)) {
      return;
    }

    this.input = this.input + operator
  }


  public allClear() {
    this.result = undefined;
    this.input = '';
    this.errorMessage = "";
  }
}
