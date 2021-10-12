// defaults
const DISPLAY_VALUE = "0";
const DEFAULT_BUFFER = null;
const DEFAULT_OPERATOR = "";
const DEFAULT_ANSWER = null;

// global variables
let displayValue = DISPLAY_VALUE;
let buffer = DEFAULT_BUFFER;
let currentOperator = DEFAULT_OPERATOR;
let answer = DEFAULT_ANSWER;

let readyToNewOperation = false;

// DOM elements
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number"); //nodeList of numbers
const operators = document.querySelectorAll(".operator"); //nodeList of operators
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");
const percent = document.querySelector(".percent");

// update display functions
function updateDisplayValue(e) {
  if (displayValue == "0") displayValue = "";
  if (e) {
    displayValue += e.target.textContent;
    display.textContent = displayValue;
  } else {
    display.textContent = displayValue;
  }
}
// clear display and reset values to defaults
function clearDisplay() {
  displayValue = DISPLAY_VALUE;
  buffer = DEFAULT_BUFFER;
  currentOperator = DEFAULT_OPERATOR;
  answer = DEFAULT_ANSWER;
  display.textContent = displayValue;
  readyToNewOperation = false;
}
//  removes the last digit to act as backspace
function removeLastDigit() {
  displayValue = displayValue.slice(0, -1);
  updateDisplayValue();
}

// operators functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function assignOperator(e) {
  if (buffer === null || readyToNewOperation) {
    currentOperator = e.target.textContent;
    buffer = displayValue;
    displayValue = 0;
    readyToNewOperation = false;
  }
  //to  be able to string together several operations and get the right answer
  else {
    operate(currentOperator, buffer, displayValue);
    currentOperator = e.target.textContent;
    buffer = displayValue;
    displayValue = 0;
    readyToNewOperation = false;
  }
}

// operate the calculations depending on the user choice of operator
function operate(operator, a, b) {
  a = parseFloat(a); //convert string value to float
  b = parseFloat(b); //convert string value to float
  switch (operator) {
    case "+":
      answer = add(a, b); //invoke add() function
      break;
    case "-":
      answer = subtract(a, b); //invoke subtract() function
      break;
    case "x":
      answer = multiply(a, b); //invoke multiply() function
      break;
    case "/":
      if (b !== 0) {
        answer = divide(a, b); //invoke divide() function
      } else answer = "this is so rude";
      break;
    default:
      break;
  }
  displayValue = answer;
  updateDisplayValue();
}

// divide current display value by 100 and update the display
function operatePercent() {
  answer = parseFloat(displayValue) / 100;
  displayValue = answer;
  updateDisplayValue();
}

// event listeners
// -numbers (nodeList)-
numbers.forEach((number) => {
  // -number-
  number.addEventListener("click", updateDisplayValue);
});

// -dot-
dot.addEventListener("click", (e) => {
  if (displayValue.includes(".")) return;
  else updateDisplayValue(e);
});

// -operators (nodeList)-
operators.forEach((operator) => {
  // -operator-
  operator.addEventListener("click", assignOperator);
});

// -clear-
clear.addEventListener("click", clearDisplay);

// -backspace-
backspace.addEventListener("click", removeLastDigit);

// -percent-
percent.addEventListener("click", operatePercent);

// -equal-
equal.addEventListener("click", () => {
  if (currentOperator === "") {
    return;
  } else {
    operate(currentOperator, buffer, displayValue);
    readyToNewOperation = true;
  }
});
