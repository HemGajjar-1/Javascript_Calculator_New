const display = document.getElementById("textbar-1");
const expressionDisplay = document.getElementById("textbar-2");

function Calculator() {
    this.currentInput = "";
    this.fullExpression = "";
    this.memoryData = [];
    this.isExponential = false;
}
let isScientificTypeOne = true;
//======================= DISPLAY =======================

Calculator.prototype.updateDisplay = function () {
    display.innerText = this.currentInput || "0";
    expressionDisplay.innerText = this.fullExpression;
};
const calc = new Calculator();
//======================== Closure Demo =========================
const calculationCounter = (function () {

    let count = 0;

    return function () {
        count++;
        document.getElementById("cal-count").innerHTML = count;
        return count;
    };

})();

//======================= BUTTON HANDLER =======================

document.addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    const value = btn.innerText.trim();
    if (!value) return;


    if (!isNaN(value)) {
        calc.appendNumber(value);
        return;
    }

    switch (value) {

        case ".":
            calc.appendDot();
            break;

        case "+":
        case "−":
        case "×":
        case "÷":
        case "mod":
        case "^":
            calc.appendOperator(value);
            break;

        case "(":
        case ")":
            calc.appendBracket(value);
            break;

        case "=":
            calc.calculate();
            break;

        case "C":
            calc.clearAll();
            break;

        case "CE":
            calc.clearEntry();
            break;

        case "⌫":
            calc.backspace();
            break;

        case "+/-":
            calc.toggleSign();
            break;

        case "%":
            calc.percentage();
            break;

        case "1/x":
            calc.reciprocal();
            break;

        case "x²":
            calc.square();
            break;

        case "√x":
            calc.squareRoot();
            break;

        case "π":
            calc.insertConstant("Math.PI");
            break;

        case "e":
            calc.insertConstant("Math.E");
            break;

        case "|x|":
            calc.wrapFunction("Math.abs");
            break;

        case "exp":
            calc.wrapFunction("Math.exp");
            break;
        case "F-E":
            calc.toggleExponential();
            break;
        case "n!":
            calc.factorial();
            break;

        case "xʸ":
            calc.appendOperator("^");
            break;

        case "10ˣ":
            calc.wrapFunction("pow10");
            break;

        case "log":
            calc.wrapFunction("Math.log10");
            break;

        case "ln":
            calc.wrapFunction("Math.log");
            break;

        case "sin":
            calc.wrapFunction("Math.sin");
            break;

        case "cos":
            calc.wrapFunction("Math.cos");
            break;

        case "tan":
            calc.wrapFunction("Math.tan");
            break;

        case "sec":
            if (!calc.currentInput) return;
            calc.fullExpression += `(1 / Math.cos(${calc.currentInput}))`;
            calc.currentInput = "";
            calc.updateDisplay();
            break;

        case "csc":
            if (!calc.currentInput) return;
            calc.fullExpression += `(1 / Math.sin(${calc.currentInput}))`;
            calc.currentInput = "";
            calc.updateDisplay();
            break;

        case "cot":
            if (!calc.currentInput) return;
            calc.fullExpression += `(1 / Math.tan(${calc.currentInput}))`;
            calc.currentInput = "";
            calc.updateDisplay();
            break;

        case "hyp":
            if (!calc.currentInput) return;
            calc.fullExpression += `Math.sinh(${calc.currentInput})`;
            calc.currentInput = "";
            calc.updateDisplay();
            break;

        case "⌊x⌋":
            calc.wrapFunction("Math.floor");
            break;

        case "⌈x⌉":
            calc.wrapFunction("Math.ceil");
            break;

        case "rand":
            calc.currentInput = Math.random().toString();
            calc.updateDisplay();
            break;

        case "→deg":
            calc.convertToDegrees();
            break;

        case "→dms":
            calc.convertToDMS();
            break;

        case "2ⁿᵈ":
            toggleButtonList(btn);
            break;

        case "x³":
            calc.cube();
            break;

        case "³√x":
            calc.cubeRoot();
            break;

        case "ʸ√x":
            calc.appendOperator("rooty");
            break;

        case "2ˣ":
            calc.wrapFunction("pow2");
            break;

        case "logᵧx":
            calc.appendOperator("logy");
            break;

        case "eˣ":
            calc.wrapFunction("Math.exp");
            break;

        case "MS":
            calc.memoryStore();
            break;
        case "MR":
            calc.memoryRecall();
            break;
        case "MC":
            calc.memoryClear();
            break;
        case "M+":
            calc.memoryAdd();
            break;
        case "M-":
            calc.memorySubtract();
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

//======================= INPUT FUNCTIONS =======================

Calculator.prototype.appendNumber = function (number) {
    this.currentInput += number;
    this.updateDisplay();
};
Calculator.prototype.toggleExponential = function () {

    this.isExponential = !this.isExponential;

    const feBtn = document.querySelector("#function-1 button:nth-child(2)");
    if (feBtn) {
        feBtn.classList.toggle("active-fe", this.isExponential);
    }

    const num = parseFloat(this.currentInput);

    if (!isNaN(num)) {
        this.currentInput = this.isExponential
            ? num.toExponential(10)
            : num.toString();
    }

    this.updateDisplay();
};
Calculator.prototype.appendDot = function () {

    if (!this.currentInput.includes(".")) {

        if (this.currentInput === "") {
            this.currentInput = "0.";
        } else {
            this.currentInput += ".";
        }

    }

    this.updateDisplay();
};

Calculator.prototype.appendOperator = function (op) {

    if (this.currentInput === "" && this.fullExpression === "") return;

    if (this.currentInput !== "") {
        this.fullExpression += this.currentInput;
        this.currentInput = "";
    }

    this.fullExpression += " " + op + " ";

    this.updateDisplay();
};

Calculator.prototype.appendBracket = function (bracket) {

    if (bracket === ")") {

        let openCount = (this.fullExpression + this.currentInput).split("(").length - 1;
        let closeCount = (this.fullExpression + this.currentInput).split(")").length - 1;

        if (closeCount >= openCount) {
            return;
        }
    }

    if (this.currentInput !== "") {
        this.fullExpression += this.currentInput;
        this.currentInput = "";
    }

    this.fullExpression += bracket;

    this.updateDisplay();
};
Calculator.prototype.insertConstant = function (value) {

    if (this.currentInput !== "") {
        this.fullExpression += this.currentInput;
        this.currentInput = "";
    }

    this.fullExpression += value;

    this.updateDisplay();

    switch (value) {
        case "Math.PI":
            display.innerHTML = Math.PI;
            break;
        case "Math.E":
            display.innerHTML = Math.E;
            break;
    }
};
Calculator.prototype.wrapFunction = function (fnName) {

    if (!this.currentInput) return;

    if (fnName === "pow10") {
        this.fullExpression += `Math.pow(10, ${this.currentInput})`;
    }
    else if (fnName === "pow2") {
        this.fullExpression += `Math.pow(2, ${this.currentInput})`;
    }
    else {
        this.fullExpression += `${fnName}(${this.currentInput})`;
    }

    this.currentInput = "";

    this.updateDisplay();
};
Calculator.prototype.convertToDegrees = function () {

    if (!this.currentInput) return;

    let radians = parseFloat(this.currentInput);
    let degrees = radians * (180 / Math.PI);

    this.currentInput = degrees.toString();

    this.updateDisplay();
};
Calculator.prototype.convertToDMS = function () {

    if (!this.currentInput) return;

    let decimal = parseFloat(this.currentInput);

    let degrees = Math.floor(decimal);
    let minutesFloat = (decimal - degrees) * 60;
    let minutes = Math.floor(minutesFloat);
    let seconds = ((minutesFloat - minutes) * 60).toFixed(2);

    this.currentInput = `${degrees}° ${minutes}' ${seconds}"`;

    this.updateDisplay();
};

//======================= EXTRA BUTTONS =======================

Calculator.prototype.clearEntry = function () {
    this.currentInput = "";
    this.updateDisplay();
};

Calculator.prototype.toggleSign = function () {

    if (!this.currentInput) return;

    this.currentInput = (parseFloat(this.currentInput) * -1).toString();

    this.updateDisplay();
};

Calculator.prototype.percentage = function () {

    if (!this.currentInput) return;

    let percentValue = parseFloat(this.currentInput);

    let expressionParts = this.fullExpression.trim().split(" ");

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

    this.currentInput = percentValue.toString();

    this.updateDisplay();
};

Calculator.prototype.reciprocal = function () {

    if (!this.currentInput) return;

    let num = parseFloat(this.currentInput);

    if (num === 0) {
        this.currentInput = "Error";
    } else {
        this.currentInput = (1 / num).toString();
    }

    this.updateDisplay();
};

Calculator.prototype.square = function () {

    if (!this.currentInput) return;

    let num = parseFloat(this.currentInput);

    this.currentInput = (num * num).toString();

    this.updateDisplay();
};

Calculator.prototype.squareRoot = function () {

    if (!this.currentInput) return;

    let num = parseFloat(this.currentInput);

    if (num < 0) {
        this.currentInput = "Error";
    } else {
        this.currentInput = Math.sqrt(num).toString();
    }

    this.updateDisplay();
};
Calculator.prototype.cube = function () {

    if (!this.currentInput) return;

    let num = parseFloat(this.currentInput);

    this.currentInput = Math.pow(num, 3).toString();

    this.updateDisplay();
};
Calculator.prototype.cubeRoot = function () {

    if (!this.currentInput) return;

    let num = parseFloat(this.currentInput);

    this.currentInput = Math.cbrt(num).toString();

    this.updateDisplay();
};
Calculator.prototype.factorial = function () {
    if (!this.currentInput) return;

    let num = parseInt(this.currentInput);

    if (num < 0) {
        this.currentInput = "Error";
    } else {
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        this.currentInput = result.toString();
    }

    this.updateDisplay();
};
// ======================= CALCULATION =======================

Calculator.prototype.isValidParentheses = function (expression) {

    let stack = [];

    for (let char of expression) {
        if (char === "(") {
            stack.push(char);
        }
        else if (char === ")") {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
};
Calculator.prototype.calculate = function () {

    if (this.currentInput !== "") {
        this.fullExpression += this.currentInput;
    }

    if (this.fullExpression === "") return;

    if (!this.isValidParentheses(this.fullExpression)) {
        this.currentInput = "Error";
        this.fullExpression = "";
        this.updateDisplay();
        return;
    }

    try {

        let expr = this.fullExpression;


        expr = expr.replace(/(\d+)\srooty\s(\d+)/g, (_, y, x) => {
            return `Math.pow(${x}, 1/${y})`;
        });


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

        this.addToHistory(this.fullExpression + " =", result);

        this.currentInput = result.toString();
        this.fullExpression = "";

        this.updateDisplay();
        calculationCounter();

    } catch {
        this.currentInput = "Error";
        this.fullExpression = "";
        this.updateDisplay();
    }
};


// ======================= EDITING =======================

Calculator.prototype.clearAll = function () {

    this.currentInput = "";
    this.fullExpression = "";

    this.updateDisplay();
};

Calculator.prototype.backspace = function () {

    if (this.currentInput !== "") {
        this.currentInput = this.currentInput.slice(0, -1);
    } else {
        this.fullExpression = this.fullExpression.slice(0, -1);
    }

    this.updateDisplay();
};

// ======================= HISTORY =======================

Calculator.prototype.addToHistory = function (expression, result) {

    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

    history.unshift({ expression, result });

    localStorage.setItem("calcHistory", JSON.stringify(history));

    this.renderHistory();
};

Calculator.prototype.renderHistory = function () {

    const historyList = this.historyContainer || document.getElementById("history-list");
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
            this.currentInput = item.result.toString();
            this.fullExpression = "";
            this.updateDisplay();
        });

        historyList.appendChild(div);
    });
};
Calculator.prototype.clearHistory = function () {

    localStorage.removeItem("calcHistory");

    this.renderHistory();
};

const clearHistoryButton = document.getElementById("clear-btn");
if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
        calc.clearHistory();
    });
}
// ======================== Memory ==========================
Calculator.prototype.renderMemory = function () {

    const memoryList = document.getElementById("memory-list");
    if (!memoryList) return;

    memoryList.innerHTML = "";

    if (!this.memoryData || this.memoryData.length === 0) {
        memoryList.innerHTML =
            "<p class='text-muted mt-2'>There's nothing saved in memory</p>";

        this.disableMemory();
        return;
    }

    this.enableMemory();

    this.memoryData.forEach((value, index) => {

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
};
Calculator.prototype.enableMemory = function () {

    const mcBtn = document.getElementById("mc-btn");
    const mrBtn = document.getElementById("mr-btn");

    if (mcBtn) mcBtn.disabled = false;
    if (mrBtn) mrBtn.disabled = false;
};
Calculator.prototype.disableMemory = function () {

    const mcBtn = document.getElementById("mc-btn");
    const mrBtn = document.getElementById("mr-btn");

    if (mcBtn) mcBtn.disabled = true;
    if (mrBtn) mrBtn.disabled = true;
};

Calculator.prototype.memoryStore = function () {

    if (!this.currentInput) return;

    this.memoryData.unshift(parseFloat(this.currentInput));

    this.renderMemory();
};
Calculator.prototype.memoryRecall = function () {

    if (!this.memoryData || this.memoryData.length === 0) return;

    this.currentInput = this.memoryData[0].toString();

    this.updateDisplay();
};
Calculator.prototype.memoryClear = function () {

    this.memoryData = [];

    this.renderMemory();
};
Calculator.prototype.memoryAdd = function () {

    if (!this.currentInput) return;

    if (!this.memoryData || this.memoryData.length === 0) {
        this.memoryData = [parseFloat(this.currentInput)];
    } else {
        this.memoryData[0] += parseFloat(this.currentInput);
    }

    this.renderMemory();
};
Calculator.prototype.memorySubtract = function () {

    if (!this.currentInput) return;

    if (!this.memoryData || this.memoryData.length === 0) {
        this.memoryData = [-parseFloat(this.currentInput)];
    } else {
        this.memoryData[0] -= parseFloat(this.currentInput);
    }

    this.renderMemory();
};

document.addEventListener("click", function (e) {

    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains("memory-value")) {
        calc.currentInput = calc.memoryData[index].toString();
        calc.updateDisplay();
    }
});

document.addEventListener("keydown", function (e) {

    const key = e.key;


    if (!isNaN(key)) {
        calc.appendNumber(key);
        return;
    }

    switch (key) {

        case ".":
            calc.appendDot();
            break;

        case "+":
            calc.appendOperator("+");
            break;

        case "-":
            calc.appendOperator("−");
            break;

        case "*":
            calc.appendOperator("×");
            break;

        case "/":
            e.preventDefault();
            calc.appendOperator("÷");
            break;

        case "%":
            calc.appendOperator("mod");
            break;

        case "(":
        case ")":
            calc.appendBracket(key);
            break;

        case "Enter":
            e.preventDefault();
            calc.calculate();
            break;

        case "Backspace":
            calc.backspace();
            break;

        case "Escape":
            calc.clearAll();
            break;
    }
});
calc.renderHistory();
calc.updateDisplay();