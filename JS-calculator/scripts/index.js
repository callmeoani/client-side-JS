let buttonsContainer = document.querySelector(".buttons-container");
let screen = document.querySelector(".screen");
let questionElement = document.querySelector("#question");
let answerDisplay = document.querySelector(".answer-display");
let allButtons = buttonsContainer.children;

let powerButton = document.querySelector("#buttonPower");
let calculatorState = powerButton.value;

let totalInputString = "0";
let totalInputNumber = 0;
questionElement.textContent = totalInputString;

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
          break;

        case "=":
          break;

        default:
          totalInputString += input;
          questionElement.textContent = totalInputString;
          break;
      }
    }
  }
}
