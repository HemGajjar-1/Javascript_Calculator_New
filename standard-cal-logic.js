const display = document.getElementById("textbar-1");
const expressionDisplay = document.getElementById("textbar-2");

let currentInput = "";
let fullExpression = "";
let memoryData = [];


let isScientificTypeOne = true;
// ======================= DISPLAY =======================

function updateDisplay() {
    display.innerText = currentInput || "0";
    expressionDisplay.innerText = fullExpression;
}

// ======================= BUTTON HANDLER =======================

document.addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    const value = btn.innerText.trim();
    if (!value) return;

    // Handle numbers first
    if (!isNaN(value)) {
        appendNumber(value);
        return;
    }

    switch (value) {

        case ".":
            appendDot();
            break;

        case "+":
        case "−":
        case "×":
        case "÷":
        case "mod":
        case "^":
            appendOperator(value);
            break;

        case "(":
        case ")":
            appendBracket(value);
            break;

        case "=":
            calculate();
            break;

        case "C":
            clearAll();
            break;

        case "CE":
            clearEntry();
            break;

        case "⌫":
            backspace();
            break;

        case "+/-":
            toggleSign();
            break;

        case "%":
            percentage();
            break;

        case "1/x":
            reciprocal();
            break;

        case "x²":
            square();
            break;

        case "√x":
            squareRoot();
            break;

        case "π":
            insertConstant("Math.PI");
            break;

        case "e":
            insertConstant("Math.E");
            break;

        case "|x|":
            wrapFunction("Math.abs");
            break;

        case "exp":
            wrapFunction("Math.exp");
            break;

        case "n!":
            factorial();
            break;

        case "xʸ":
            appendOperator("^");
            break;

        case "10ˣ":
            wrapFunction("pow10");
            break;

        case "log":
            wrapFunction("Math.log10");
            break;

        case "ln":
            wrapFunction("Math.log");
            break;

        case "sin":
            wrapFunction("Math.sin");
            break;

        case "cos":
            wrapFunction("Math.cos");
            break;

        case "tan":
            wrapFunction("Math.tan");
            break;

        case "sec":
            if (!currentInput) return;
            fullExpression += `(1 / Math.cos(${currentInput}))`;
            currentInput = "";
            updateDisplay();
            break;

        case "csc":
            if (!currentInput) return;
            fullExpression += `(1 / Math.sin(${currentInput}))`;
            currentInput = "";
            updateDisplay();
            break;

        case "cot":
            if (!currentInput) return;
            fullExpression += `(1 / Math.tan(${currentInput}))`;
            currentInput = "";
            updateDisplay();
            break;

        case "hyp":
            if (!currentInput) return;
            fullExpression += `Math.sinh(${currentInput})`;
            currentInput = "";
            updateDisplay();
            break;

        case "⌊x⌋":
            wrapFunction("Math.floor");
            break;

        case "⌈x⌉":
            wrapFunction("Math.ceil");
            break;

        case "rand":
            currentInput = Math.random().toString();
            updateDisplay();
            break;

        case "→deg":
            convertToDegrees();
            break;

        case "→dms":
            convertToDMS();
            break;

        case "2ⁿᵈ":
            toggleButtonList(btn);
            break;

        case "x³":
            cube();
            break;

        case "³√x":
            cubeRoot();
            break;

        case "ʸ√x":
            appendOperator("rooty");
            break;

        case "2ˣ":
            wrapFunction("pow2");
            break;

        case "logᵧx":
            appendOperator("logy");
            break;

        case "eˣ":
            wrapFunction("Math.exp");
            break;

        case "MS":
            memoryStore();
            break;
        case "MR":
            memoryRecall();
            break;
        case "MC":
            memoryClear();
            break;
        case "M+":
            memoryAdd();
            break;
        case "M-":
            memorySubtract();
            break;
        default:
            break;
    }
});

function toggleButtonList(btn) {
    if (isScientificTypeOne == true) {
        renderButtons(scientificButtons2, 5);
        isScientificTypeOne = false;

    } else {
        renderButtons(scientificButtons, 5);
        isScientificTypeOne = true;
    }
}

// ======================= INPUT FUNCTIONS =======================
console.log(Math.sin(30))
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDot() {
    if (!currentInput.includes(".")) {
        if (currentInput === "") {
            currentInput = "0.";
        } else {
            currentInput += ".";
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === "" && fullExpression === "") return;

    if (currentInput !== "") {
        fullExpression += currentInput;
        currentInput = "";
    }

    fullExpression += " " + op + " ";
    updateDisplay();
}

function appendBracket(bracket) {

    if (bracket === ")") {
        let openCount = (fullExpression + currentInput).split("(").length - 1;
        let closeCount = (fullExpression + currentInput).split(")").length - 1;

        if (closeCount >= openCount) {
            return;
        }
    }

    if (currentInput !== "") {
        fullExpression += currentInput;
        currentInput = "";
    }

    fullExpression += bracket;
    updateDisplay();
}
function insertConstant(value) {
    if (currentInput !== "") {
        fullExpression += currentInput;
        currentInput = "";

    }
    fullExpression += value;
    updateDisplay();
    switch (value) {
        case "Math.PI":
            display.innerHTML = Math.PI
            break;
        case "Math.E":
            display.innerHTML = Math.PI
            break;
        default:
            break;
    }
}
function wrapFunction(fnName) {
    if (!currentInput) return;

    if (fnName === "pow10") {
        fullExpression += `Math.pow(10, ${currentInput})`;
    }
    else if (fnName === "pow2") {
        fullExpression += `Math.pow(2, ${currentInput})`;
    }
    else {
        fullExpression += `${fnName}(${currentInput})`;
    }

    currentInput = "";
    updateDisplay();
}
function convertToDegrees() {
    if (!currentInput) return;

    let radians = parseFloat(currentInput);
    let degrees = radians * (180 / Math.PI);

    currentInput = degrees.toString();
    updateDisplay();
}
function convertToDMS() {
    if (!currentInput) return;

    let decimal = parseFloat(currentInput);

    let degrees = Math.floor(decimal);
    let minutesFloat = (decimal - degrees) * 60;
    let minutes = Math.floor(minutesFloat);
    let seconds = ((minutesFloat - minutes) * 60).toFixed(2);

    currentInput = `${degrees}° ${minutes}' ${seconds}"`;
    updateDisplay();
}

// ======================= EXTRA BUTTONS =======================

// CE — clears only current number
function clearEntry() {
    currentInput = "";
    updateDisplay();
}

// +/- — toggle positive/negative
function toggleSign() {
    if (!currentInput) return;

    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// % — percentage (currentInput / 100)
function percentage() {
    if (!currentInput) return;

    let percentValue = parseFloat(currentInput);

    let expressionParts = fullExpression.trim().split(" ");

    if (expressionParts.length >= 2) {
        let firstNumber = parseFloat(expressionParts[0]);
        let operator = expressionParts[1];

        if (operator === "+" || operator === "−") {
            percentValue = firstNumber * percentValue / 100;
        }
        else if (operator === "×" || operator === "÷") {
            percentValue = percentValue / 100;
        }
    } else {
        percentValue = percentValue / 100;
    }

    currentInput = percentValue.toString();
    updateDisplay();
}

// 1/x — reciprocal
function reciprocal() {
    if (!currentInput) return;

    let num = parseFloat(currentInput);

    if (num === 0) {
        currentInput = "Error";
    } else {
        currentInput = (1 / num).toString();
    }

    updateDisplay();
}

// x² — square
function square() {
    if (!currentInput) return;

    let num = parseFloat(currentInput);
    currentInput = (num * num).toString();
    updateDisplay();
}

// √x — square root
function squareRoot() {
    if (!currentInput) return;

    let num = parseFloat(currentInput);

    if (num < 0) {
        currentInput = "Error";
    } else {
        currentInput = Math.sqrt(num).toString();
    }

    updateDisplay();
}
function cube() {
    if (!currentInput) return;

    let num = parseFloat(currentInput);
    currentInput = Math.pow(num, 3).toString();
    updateDisplay();
}
function cubeRoot() {
    if (!currentInput) return;

    let num = parseFloat(currentInput);
    currentInput = Math.cbrt(num).toString();
    updateDisplay();
}

// ======================= CALCULATION =======================

function isValidParentheses(expression) {
    let stack = [];

    for (let char of expression) {
        if (char === "(") {
            stack.push(char);
        }
        else if (char === ")") {
            if (stack.length === 0) {
                return false; // closing before opening
            }
            stack.pop();
        }
    }

    return stack.length === 0; // must be empty
}

function calculate() {

    if (currentInput !== "") {
        fullExpression += currentInput;
    }

    if (fullExpression === "") return;

    if (!isValidParentheses(fullExpression)) {
        currentInput = "Error";
        fullExpression = "";
        updateDisplay();
        return;
    }

    try {

        let expr = fullExpression;

        // y√x  is converted to  x^(1/y)
        expr = expr.replace(/(\d+)\srooty\s(\d+)/g, (_, y, x) => {
            return `Math.pow(${x}, 1/${y})`;
        });

        // logᵧx is converted to log(x)/log(y)
        expr = expr.replace(/(\d+)\slogy\s(\d+)/g, (_, y, x) => {
            return `(Math.log(${x}) / Math.log(${y}))`;
        });

        let jsExpression = expr
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/mod/g, "%")
            .replace(/\^/g, "**");

        let result = eval(jsExpression);

        if (result === Infinity || isNaN(result)) {
            throw "Math Error";
        }

        addToHistory(fullExpression + " =", result);

        currentInput = result.toString();
        fullExpression = "";

        updateDisplay();

    } catch {
        currentInput = "Error";
        fullExpression = "";
        updateDisplay();
    }
}


// ======================= EDITING =======================

function clearAll() {
    currentInput = "";
    fullExpression = "";
    updateDisplay();
}

function backspace() {
    if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
    } else {
        fullExpression = fullExpression.slice(0, -1);
    }
    updateDisplay();
}

// ======================= HISTORY =======================

function addToHistory(expression, result) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

    history.unshift({ expression, result });

    localStorage.setItem("calcHistory", JSON.stringify(history));

    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById("history-list");
    if (!historyList) return;

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item mb-2 p-2 rounded text-end";

        div.innerHTML = `
            <div class="text-secondary">${item.expression}</div>
            <div class="fw-bold">${item.result}</div>
        `;

        div.addEventListener("click", () => {
            currentInput = item.result.toString();
            fullExpression = "";
            updateDisplay();
        });

        historyList.appendChild(div);
    });
}

function clearHistory() {
    localStorage.removeItem("calcHistory");
    renderHistory();
}

const clearHistoryButton = document.getElementById("clear-btn");

if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
        clearHistory();
    });
}
// ======================== Memory ==========================
function renderMemory() {

    const memoryList = document.getElementById("memory-list");
    memoryList.innerHTML = "";

    if (memoryData.length === 0) {
        memoryList.innerHTML =
            "<p class='text-muted mt-2'>There's nothing saved in memory</p>";
        disableMemory();   // 🔥 disable here
        return;
    }

    enableMemory();  // 🔥 enable here

    memoryData.forEach((value, index) => {

        const item = document.createElement("div");


        item.innerHTML = `
    <div class="text-end py-3 fs-4 memory-value"
         data-index="${index}"
         style="cursor:pointer;">
        ${value}
    </div>
`;

        memoryList.appendChild(item);
    });
}
function enableMemory() {
    document.getElementById("mc-btn").disabled = false;
    document.getElementById("mr-btn").disabled = false;
}
function disableMemory() {
    document.getElementById("mc-btn").disabled = true;
    document.getElementById("mr-btn").disabled = true;
}

function memoryStore() {
    if (!currentInput) return;

    memoryData.unshift(parseFloat(currentInput));
    renderMemory();
}

function memoryRecall() {
    if (memoryData.length === 0) return;

    currentInput = memoryData[0].toString();
    updateDisplay();
}

function memoryClear() {
    memoryData = [];
    renderMemory();
}
function memoryAdd() {
    if (!currentInput) return;

    if (memoryData.length === 0) {
        memoryData.unshift(parseFloat(currentInput));
    } else {
        memoryData[0] += parseFloat(currentInput);
    }

    renderMemory();
}

function memorySubtract() {
    if (!currentInput) return;

    if (memoryData.length === 0) {
        memoryData.unshift(-parseFloat(currentInput));
    } else {
        memoryData[0] -= parseFloat(currentInput);
    }

    renderMemory();
}

document.addEventListener("click", function (e) {

    const index = e.target.dataset.index;

    if (index === undefined) return;

    // Click value → Recall
    if (e.target.classList.contains("memory-value")) {
        currentInput = memoryData[index].toString();
        updateDisplay();
    }

    // Sidebar M+
    if (e.target.classList.contains("mem-plus")) {
        memoryData[index] += parseFloat(currentInput || 0);
        renderMemory();
    }

    // Sidebar M-
    if (e.target.classList.contains("mem-minus")) {
        memoryData[index] -= parseFloat(currentInput || 0);
        renderMemory();
    }

    // Delete single item
    if (e.target.classList.contains("mem-delete")) {
        memoryData.splice(index, 1);
        renderMemory();
    }
});

renderHistory();
updateDisplay();