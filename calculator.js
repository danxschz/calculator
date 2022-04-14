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
function appendNumber(number) {
  if (operator === '') {
    if (firstValue === '') {
      displayBottom.textContent = '';
      displayTop.textContent = '';
      currentTotal = '';
    }
    firstValue += number;
  } else secondValue += number;

  if (displayBottom.textContent.length < 20) {
    displayBottom.textContent += number;
  }
}

function appendOperator(sign) {
  if ((!(operator === '')) && (secondValue === '')) return;
  if (!(secondValue === '')) evaluate();
  operator = sign;
  if (displayBottom.textContent.length < 18) {
    displayBottom.textContent += ` ${operator} `;
  }
}

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
  // Convert from string to number or append current total if empty
  firstValue = (firstValue === '') ? currentTotal : +firstValue; 
  secondValue = +secondValue;
  // Won't evaluate if values are missing
  if ((secondValue === undefined) || (operator === '')) return;

  currentTotal = round(operate(operator, firstValue, secondValue), 4); // Round to max 4 decimals
  displayTop.textContent = `${firstValue} ${operator} ${secondValue} =`;
  displayBottom.textContent = currentTotal;
  operator = '';
  firstValue = '';
  secondValue = '';
}

function clear() {
  displayTop.textContent = '';
  displayBottom.textContent = '';
  operator = '';
  firstValue = '';
  secondValue = '';
  currentTotal = '';
}

function deleteCharacter() {
  if ((!(currentTotal === '')) && (operator === '')) {
    clear();
  } else if (operator === '') {
    firstValue = firstValue.slice(0,-1);
    displayBottom.textContent = displayBottom.textContent.slice(0,-1);
  } else if (secondValue === '') {
    operator = '';
    displayBottom.textContent = displayBottom.textContent.slice(0,-3);
  } else {
    secondValue = secondValue.slice(0,-1);
    displayBottom.textContent = displayBottom.textContent.slice(0,-1);
  }
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
  button.addEventListener('click', () => appendNumber(button.textContent));
});

// Operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => appendOperator(button.textContent));
});

// Equal button
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => evaluate());

// Clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => clear());

// Delete button
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => deleteCharacter());

// Keyboard input
function keyboardInput(e) {
  if ((e.key >= 0 && e.key <= 9) || (e.key === '.')) appendNumber(e.key);
  if (e.key === '+' || e.key === '%') appendOperator(e.key);
  switch(e.key) {
    case '-':
      appendOperator('−');
    case '/':
      appendOperator('÷');
    case 'x':
    case '*':
      appendOperator('x');
  }
  if (e.key === 'Enter' || e.key === '=') evaluate();
  if (e.key === 'Escape') clear();
  if (e.key === 'Backspace') deleteCharacter();
}

window.addEventListener('keydown', keyboardInput);