import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wayForward';
  result: string = '0';
  expression: string = '';
  firstOperand: string = '';
  secondOperand: string = '';
  operator: string = '';
  operatorSupported: string[] = ['x', '-', '+', '/'];
  operatorPressed = false;
  maxDigits: number = 9;

  reset() {
    this.result = '0';
    this.expression = '';
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = '';
    this.operatorPressed = false;
  }

  press(pressedValue) {
    if (this.operatorSupported.includes(pressedValue)) {
      if (this.secondOperand) {
        this.solve();
        this.firstOperand = this.result;
        this.secondOperand = '';
        this.operator = pressedValue;
        this.expression = this.firstOperand + this.operator;
      } else {
        if (this.operator) {
          this.expression =
            this.expression.substring(0, this.expression.length - 1) +
            pressedValue;
        } else {
          this.expression += pressedValue;
        }
        this.operator = pressedValue;
        this.operatorPressed = true;
      }
    } else if (this.operatorPressed) {
      if (!(this.secondOperand.length >= this.maxDigits)) {
        this.secondOperand += pressedValue;
        this.expression += pressedValue;
      }
    } else {
      if (!(this.firstOperand.length >= this.maxDigits)) {
        this.firstOperand += pressedValue;
        this.expression += pressedValue;
      }
    }

    console.log(this.firstOperand, this.secondOperand, this.operator);
  }

  solve() {
    let result: any;
    if (this.operator == 'x') {
      result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
    } else if (this.operator == '/') {
      console.log(this.secondOperand);
      if (parseFloat(this.secondOperand) == 0) {
        result = "Can't divide by 0";
      } else {
        result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
      }
    } else if (this.operator == '+') {
      result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
    } else if (this.operator == '-') {
      result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
    } else {
      result = 0;
    }
    this.result = typeof result == 'number' ? result.toString() : result;
  }
}
