const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  advancedOperator: false,
  ans: 0,
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;

  if (!target.matches("button")) {
    return;
  }

  if (value === "all-clear") {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (value === "=") {
    handleOperator(value);
    updateDisplay();
    return;
  }

  if (
    [
      "+",
      "-",
      "*",
      "/",
      "xy",
      "sin",
      "cos",
      "tan",
      "ln",
      "log",
      "√",
      "exp",
      "linv",
      "x!",
      "π",
      "e",
    ].includes(value)
  ) {
    handleOperator(value);
    updateDisplay();
    return;
  }

  if (value === ".") {
    inputDecimal(value);
    updateDisplay();
    return;
  }

  if (value === "Red&Deg") {
    toggleRadDeg();
    return;
  }

  if (value === "Ans") {
    recallAns();
    updateDisplay();
    return;
  }

  inputDigit(value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (
    nextOperator === "sin" ||
    nextOperator === "cos" ||
    nextOperator === "tan" ||
    nextOperator === "ln" ||
    nextOperator === "log" ||
    nextOperator === "√" ||
    nextOperator === "exp" ||
    nextOperator === "linv" ||
    nextOperator === "x!" ||
    nextOperator === "π" ||
    nextOperator === "e"
  ) {
    advancedOperations(nextOperator, inputValue);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
    calculator.ans = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  } else if (operator === "xy") {
    return Math.pow(firstOperand, secondOperand);
  }

  return secondOperand;
}

function advancedOperations(operator, value) {
  let result;

  switch (operator) {
    case "sin":
      result = Math.sin(toRadians(value));
      break;
    case "cos":
      result = Math.cos(toRadians(value));
      break;
    case "tan":
      result = Math.tan(toRadians(value));
      break;
    case "ln":
      result = Math.log(value);
      break;
    case "log":
      result = Math.log10(value);
      break;
    case "√":
      result = Math.sqrt(value);
      break;
    case "exp":
      result = Math.exp(value);
      break;
    case "linv":
      result = 1 / value;
      break;
    case "x!":
      result = factorial(value);
      break;
    case "π":
      result = Math.PI;
      break;
    case "e":
      result = Math.E;
      break;
    default:
      result = value;
  }

  calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
  calculator.firstOperand = result;
  calculator.waitingForSecondOperand = false;
  calculator.ans = result;
  calculator.operator = null;
}

function toRadians(degrees) {
  if (calculator.radians) {
    return degrees;
  }
  return (degrees * Math.PI) / 180;
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.advancedOperator = false;
}

function toggleRadDeg() {
  calculator.radians = !calculator.radians;
  const radDegButton = document.querySelector('button[value="Red&Deg"]');
  radDegButton.textContent = calculator.radians ? "Rad" : "Deg";
}

function recallAns() {
  calculator.displayValue = calculator.ans.toString();
  calculator.waitingForSecondOperand = false;
}
