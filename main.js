// ? vars
let inputField = document.querySelector(".screen input");
let arrnums = document.querySelectorAll(".num");
let arrOperations = document.querySelectorAll(".operations");
let delBtn = document.querySelector("#delete");
let resetBtn = document.querySelector("#restBtn");
let resultBtn = document.querySelector("#resultBtn");
let themeToggle = document.querySelector("#themeToggle");

let targetOfTheOperation = true;
let targetOfTheDecimalPoint = false;
// ? define the arr inputs and check the local storage
let arrInputs = [];
if (localStorage.getItem("inputsVal")) {
  arrInputs = JSON.parse(localStorage.getItem("inputsVal"));
  updateInput();
}

// ! display the written op and nums
// ? nums
arrnums.forEach((ele) => {
  ele.addEventListener("click", () => {
    //! Check if the clicked element is a decimal point
    if (ele.textContent === ".") {
      //! Only allow a decimal point if it hasn't been used yet for the current number
      if (targetOfTheDecimalPoint === false) {
        targetOfTheDecimalPoint = true;
        arrInputs.push(ele.textContent);
      }
    } else if (ele.textContent !== "." && ele.textContent != "x") {
      arrInputs.push(ele.textContent);
      targetOfTheOperation = false;
    }

    updateInput();
    updateLocalStorage(arrInputs);
  });
});

// ? operations
arrOperations.forEach((op) => {
  op.addEventListener("click", () => {
    if (targetOfTheOperation === false) {
      if (op.textContent === "x") {
        arrInputs.push("*");
        targetOfTheOperation = true;
        targetOfTheDecimalPoint = false;
        updateInput();
        updateLocalStorage(arrInputs);
      } else {
        arrInputs.push(op.textContent);
        targetOfTheOperation = true;
        targetOfTheDecimalPoint = false;
        updateInput();
        updateLocalStorage(arrInputs);
      }
    }
  });
});

// ? update the input
function updateInput() {
  inputField.value = arrInputs.join("");
}

// ? create and update the local storage
function updateLocalStorage(arrInputs) {
  localStorage.setItem("inputsVal", JSON.stringify(arrInputs));
}

// ! Del btn
delBtn.addEventListener("click", delTheLastEle);

// ! click any btn that in the right of keyboard
document.onkeyup = function (e) {
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0"
  ) {
    arrInputs.push(e.key);
    targetOfTheOperation = false;
    updateInput();
    updateLocalStorage(arrInputs);
  } else if (
    (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") &&
    targetOfTheOperation === false
  ) {
    targetOfTheOperation = true;
    targetOfTheDecimalPoint = false;
    arrInputs.push(e.key);
    updateInput();
    updateLocalStorage(arrInputs);
  } else if (e.key === `Backspace`) {
    delTheLastEle();
  } else if (e.key === ".") {
    //! check if clicked decimal
    if (targetOfTheDecimalPoint === false) {
      //! Only allow a decimal point if it hasn't been used yet for the current number
      targetOfTheDecimalPoint = true;
      arrInputs.push(e.key);
      updateInput();
      updateLocalStorage(arrInputs);
    }
  }
};

// ? function delete the last element
function delTheLastEle() {
  if (arrInputs.length > 0) {
    //? Remove the last element from the array
    arrInputs.pop();
    //? Update the targetOfTheDecimalPoint
    if (arrInputs.length > 0 && arrInputs[arrInputs.length - 1] === ".") {
      targetOfTheDecimalPoint = true;
    }
    updateInput();
    updateLocalStorage(arrInputs);
  }
}

// ! reset btn
resetBtn.addEventListener("click", () => {
  arrInputs = [];
  targetOfTheDecimalPoint = false;
  targetOfTheOperation = true;
  updateInput();
  updateLocalStorage(arrInputs);
});

// ! result btn
resultBtn.addEventListener("click", () => {
  targetOfTheOperation = false;
  targetOfTheDecimalPoint = false;
  let ope = inputField.value;
  let res = eval(ope);
  arrInputs = [res.toString()];
  updateInput();
  updateLocalStorage(arrInputs);
  localStorage.setItem("result", res);
  inputField.value = res;
});

let targetOfMood = "Dark";
document.addEventListener("click", (e) => {
  if (e.target === themeToggle) {
    if (targetOfMood === "Dark") {
      targetOfMood = "Light";
      document.body.classList.add("light-mode");
      themeToggle.innerHTML = `  <i class="fas fa-sun"></i> Light Mode`;
    } else {
      targetOfMood = "Dark";
      document.body.classList.remove("light-mode");
      themeToggle.innerHTML = `  <i class="fas fa-moon"></i> Dark Mode`;
    }
  }
});
