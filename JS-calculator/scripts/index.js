let buttonsContainer = document.querySelector(".buttons-container");
let screen = document.querySelector(".screen");
let questionElement = document.querySelector("#question");
let answerDisplay = document.querySelector(".answer-display");
let allButtons = buttonsContainer.children;

let powerButton = document.querySelector("#buttonPower");
let calculatorState = powerButton.value;

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
  if (!isNaN(input)) {
    // is a number
    let value = parseInt(input);
  } else {
    // is not a number
    if (buttonId === "buttonPower") {
      console.log("did we get here?", "the questionElement: ", questionElement);
      if (calculatorState === "off") {
        calculatorState = "on";
        questionElement?.classList.remove("off");
      } else {
        calculatorState = "off";
        questionElement?.classList.add("off");
      }
    } else {
      switch (input) {
        case "":
          break;

        default:
          break;
      }
    }
  }
}
