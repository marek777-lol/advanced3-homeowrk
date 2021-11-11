const calculator = (function () {
    class Calculator {
        constructor(previousOperandTextElement, currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement;
            this.currentOperandTextElement = currentOperandTextElement;
            this.clear();
        }

        clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
        }

        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOpeation(operation) {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }

        compute() {
            let computation;
            let prev = parseFloat(this.previousOperand);
            let current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay;
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                });
            }

            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay;
            }
        }

        updateDisplay() {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
            } else {
                this.previousOperandTextElement.innerText = '';
            }
        }
    }

    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');

    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

    function clickNumberButtons() {
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText)
                console.log('button.innerText');
                calculator.updateDisplay();
                console.log('button', button);
            })
        })
    }

    function clickOperationButtons() {
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOpeation(button.innerText);
                calculator.updateDisplay();
                console.log('buttonOperation', button);
            })
        })
    }


    function clickEqualsButton() {
        equalsButton.addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        })
    }

    function clickAllClearButton() {
        allClearButton.addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        })
    }

    function clickDeleteButton() {
        deleteButton.addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        })
    }

    return {
        clickNumberButtons: clickNumberButtons,
        clickOperationButtons: clickOperationButtons,
        clickEqualsButton: clickEqualsButton,
        clickAllClearButton: clickAllClearButton,
        clickDeleteButton: clickDeleteButton
    }
}())

function init() {
    calculator.clickNumberButtons()
    calculator.clickOperationButtons();
    calculator.clickEqualsButton();
    calculator.clickAllClearButton();
    calculator.clickDeleteButton();
}

init();