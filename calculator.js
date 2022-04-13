// Basic operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function remainder(a, b) {
  return a % b;
}


// Main functions
function operate(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a,b);
    case '−':
      return subtract(a,b);
    case 'x':
      return multiply(a,b);
    case '÷':
      return divide(a,b);
    case '%':
      return remainder(a,b);
  }
}

function evaluate() {
  // Convert from string to number
  firstValue = (firstValue === '') ? currentTotal : +firstValue; // If a is empty it will take the current accumulated value
  secondValue = +secondValue;
  currentTotal = operate(operator, firstValue, secondValue);
  operator = '';
  firstValue = '';
  secondValue = '';
  console.log(currentTotal);
}


// Events
let firstValue = '';
let secondValue = '';
let operator = '';
let currentTotal = '';

// Number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operator === '') {
      firstValue += button.textContent;
    } else {
      secondValue += button.textContent;
    }
    console.log(`a:${firstValue} operator:${operator} b:${secondValue}`);
  });
});

// Operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (secondValue === '') {
      operator = button.textContent;
    } else {
      evaluate()
      operator = button.textContent;
    }
  });
});

// Equal button
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
  evaluate();
});

