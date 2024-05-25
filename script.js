class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        console.log("Clearing...");
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        console.log("Deleting...");
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        console.log("Appending number:", number);
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    appendDoubleZero() {
        console.log("Appending double zero...");
        if (this.currentOperand !== '' && !this.currentOperand.includes('.')) {
            this.currentOperand += '00';
            this.updateDisplay();
        }
    }

    appendPercentage() {
        console.log("Appending percentage...");
        if (this.currentOperand !== '') {
            this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
            this.updateDisplay();
        }
    }

    chooseOperation(operation) {
        console.log("Choosing operation:", operation);
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        console.log("Computing...");
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log("Previous:", prev);
        console.log("Current:", current);
        console.log("Operation:", this.operation);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = this.getDisplayNumber(computation); // Formatting the result
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        console.log("Updating display...");
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        console.log("Button clicked:", value);
        if (value === '00') {
            calculator.appendDoubleZero();
        } else if (value === '%') {
            calculator.appendPercentage();
        } else {
            calculator.appendNumber(value);
        }
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operation = button.innerText;
        console.log("Operation clicked:", operation);
        calculator.chooseOperation(operation);
    });
});

equalsButton.addEventListener('click', () => {
    console.log("Equals clicked");
    calculator.compute();
});

allClearButton.addEventListener('click', () => {
    console.log("All clear clicked");
    calculator.clear();
});

deleteButton.addEventListener('click', () => {
    console.log("Delete clicked");
    calculator.delete();
});
