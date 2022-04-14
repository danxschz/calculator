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

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
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
  if ((secondValue === undefined) || (operator === '')) return;
  currentTotal = round(operate(operator, firstValue, secondValue), 4);
  displayTop.textContent = `${firstValue} ${operator} ${secondValue} =`;
  displayBottom.textContent = currentTotal;
  operator = '';
  firstValue = '';
  secondValue = '';
}


// Events
let firstValue = '';
let secondValue = '';
let operator = '';
let currentTotal = '';
const displayBottom = document.querySelector('.bottom');
const displayTop = document.querySelector('.top');

// Number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operator === '') {
      if (firstValue === '') {
        displayBottom.textContent = '';
        displayTop.textContent = '';
        currentTotal = '';
      }
      firstValue += button.textContent;
    } else {
      secondValue += button.textContent;
    }
    if (displayBottom.textContent.length < 20) {
      displayBottom.textContent += button.textContent;
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
      if (displayBottom.textContent.length < 20) {
        displayBottom.textContent += ` ${operator} `;
      }
    } else {
      evaluate()
      operator = button.textContent;
      if (displayBottom.textContent.length < 20) {
        displayBottom.textContent += ` ${operator} `;
      }
    }
  });
});

// Equal button
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
  evaluate();
});

// Clear button
function clear() {
  displayTop.textContent = '';
  displayBottom.textContent = '';
  operator = '';
  firstValue = '';
  secondValue = '';
  currentTotal = '';
}
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
  clear();
})

// Delete button
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
  if ((!(currentTotal === '')) && (operator === '')) {
    clear();
  } else if (operator === '') {
    firstValue = firstValue.slice(0,-1);
    displayBottom.textContent = displayBottom.textContent.slice(0,-1);
    console.log(firstValue);
  } else if (secondValue === '') {
    operator = '';
    displayBottom.textContent = displayBottom.textContent.slice(0,-3);
  } else {
    secondValue = secondValue.slice(0,-1);
    displayBottom.textContent = displayBottom.textContent.slice(0,-1);
  }
});