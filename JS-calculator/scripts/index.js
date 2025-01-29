let buttonsContainer = document.querySelector(".buttons-container");
let screen = document.querySelector(".screen");
let questionElement = document.querySelector("#question");
let answerDisplay = document.querySelector(".answer-display");
let answer = document.querySelector("#answer");
let equalToButton = document.querySelector("#equalTo");
let allButtons = buttonsContainer.children;

let powerButton = document.querySelector("#buttonPower");
let calculatorState = powerButton.value;

let totalInputString = "0";
questionElement.textContent = totalInputString;

let cursorSelectedVisual = totalInputString[totalInputString.length - 1];

// add click event to each button

for (let button of allButtons) {
  button.addEventListener("click", (e) => {
    let clickedValue = e.target.value;
    let ClickedButtonId = e.target.id;
    console.log("clicked value: ", clickedValue);
    console.log("clicked id: ", ClickedButtonId);
    handleClickedValue(clickedValue, ClickedButtonId);
  });
}

function handleCursorSelection() {
  // do this tomorrow
}

function handleClickedValue(input, buttonId) {
  if (totalInputString.length === 1 && totalInputString[0] === "0") {
    totalInputString = "";
  }

  if (!isNaN(input)) {
    // is a number
    console.log("length of total input string: ", totalInputString.length);
    totalInputString += input;
    questionElement.textContent = totalInputString;
  } else {
    // is not a number
    if (buttonId === "buttonPower") {
      totalInputString = "0";
      questionElement.textContent = totalInputString;
      if (calculatorState === "off") {
        calculatorState = "on";
        questionElement?.classList.remove("off");
      } else {
        calculatorState = "off";
        questionElement?.classList.add("off");
        answerDisplay.classList.add("off");
      }
    } else {
      switch (input) {
        case "delete":
          totalInputString = totalInputString.substring(
            0,
            totalInputString.length - 1
          );
          if (totalInputString.length === 0) {
            totalInputString = "0";
          }
          questionElement.textContent = totalInputString;
          break;

        case "moveLeft":
          break;

        case "moveRight":
          break;

        case "cancel":
          totalInputString = "0";
          questionElement.textContent = totalInputString;
          answerDisplay.classList.add("off");
          break;

        case "=":
          const finalAnswer = solve(totalInputString);
          console.log(finalAnswer);
          answer.textContent = finalAnswer;
          answerDisplay.classList.remove("off");
          break;

        default:
          totalInputString += input;
          questionElement.textContent = totalInputString;
          break;
      }
    }
  }
}

const calculatorObj = {
  operatorsList: ["*", "/", "%", "-", "+"],

  parseTheNumbers(data) {
    let parsedArr = [];
    for (let val of data) {
      if (isNaN(val)) {
        parsedArr.push(val);
      } else {
        parsedArr.push(Number(val));
      }
    }

    return parsedArr;
  },

  segmentDataAndParseNumbers(data) {
    let finalArr = [];
    let tempChunk = "";
    for (let val of data) {
      if (val === "." || !isNaN(parseInt(val))) {
        tempChunk += val;
      } else {
        finalArr.push(tempChunk);
        tempChunk = "";
        finalArr.push(val);
      }
    }
    if (tempChunk.length) {
      finalArr.push(tempChunk);
      tempChunk = "";
    }
    return this.parseTheNumbers(finalArr);
  },

  calculate(operator, paramA, paramB) {
    let result;
    switch (operator) {
      case "*":
        result = paramA * paramB;
        break;
      case "/":
        result = paramA / paramB;
        break;
      case "%":
        result = paramA % paramB;
        break;
      case "+":
        result = paramA + paramB;
        break;
      case "-":
        result = paramA - paramB;
        break;
      default:
        throw new Error("Operation not recognize!");
    }
    return result;
  },

  handleProductLevelOperations(data, operator) {
    let newArray = [];
    let indexesToJump = [];
    for (let [index, value] of data.entries()) {
      if (indexesToJump.includes(index)) {
        continue;
      }
      if (value !== operator) {
        newArray.push(value);
      } else {
        if (typeof data[index + 1] === "number") {
          let calcResult = this.calculate(
            operator,
            newArray[newArray.length - 1],
            data[index + 1]
          );
          newArray.pop();
          newArray.push(calcResult);
          indexesToJump.push(index + 1);
        } else {
          throw new Error("Syntax error somewhere!");
        }
      }
    }

    return newArray;
  },

  handleCalculations(data) {
    let result = data;
    for (let operator of this.operatorsList) {
      result = this.handleProductLevelOperations(result, operator);
    }
    return result;
  },
};

function solve(dataArr) {
  const segMentedData = calculatorObj.segmentDataAndParseNumbers(dataArr);
  const solutionResult = calculatorObj.handleCalculations(segMentedData);
  if (solutionResult.length !== 1) {
    throw new Error("Something is wrong with the calculation");
  }
  return solutionResult[0];
}
