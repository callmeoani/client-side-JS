function handleMultiplication(data) {
  console.log("data inside multiplication: ", data);
  const newArr = [];
  let indexesToJump = [];

  for (let [idx, val] of data.entries()) {
    if (indexesToJump.includes(idx)) {
      continue;
    } else {
      if (!operatorsList.includes(val)) {
        newArr.push(val);
      } else {
        let beforeVal = Number(data[idx - 1]);
        let afterVal = Number(data[idx + 1]);

        if (beforeVal && afterVal) {
          let result;
          switch (val) {
            case "*":
              result = beforeVal * afterVal;
              break;
            case "/":
              result = beforeVal / afterVal;
              break;
            case "%":
              result = before % afterVal;
            default:
              break;
          }
          newArr.pop();
          newArr.push(result);
          indexesToJump.push(idx - 1, idx, idx + 1);
        } else {
          throw new Error("Check your sytax wella");
        }
      }
    }
  }
  return newArr;
}

function operation_old(data, operator) {
  const newArr = [];
  let indexesToJump = [];

  for (let [idx, val] of data.entries()) {
    if (indexesToJump.includes(idx)) {
      continue;
    } else {
      if (!isNaN(val)) {
        // if val is a numbers
        newArr.push(val);
      } else {
        // val is not a number
        let beforeValCheck = !isNaN(data[idx - 1]);
        let afterValCheck = !isNaN(data[idx + 1]);
        let beforeVal = Number(data[idx - 1]);
        let afterVal = Number(data[idx + 1]);

        if (beforeValCheck && afterValCheck) {
          let result = calculate(operator, beforeVal, afterVal);
          newArr.pop();
          newArr.push(result);
          indexesToJump.push(idx - 1, idx, idx + 1);
        } else {
          console.log("the error was here: ", idx);
          console.log("current result: ", newArr);
          throw new Error("Check your sytax wella");
        }
      }
    }
  }

  return newArr;
}