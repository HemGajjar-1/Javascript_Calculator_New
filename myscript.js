document.querySelectorAll('#trigDropdown + .dropdown-menu .dropdown-item')
    .forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.innerText);
        });
    });
var theme = "light";
let fun1 = document.getElementById("function-1")
let fun3 = document.getElementById("function-3")


function changeToStandard() {
    changeMode("standard")
    document.getElementById("current-type").innerHTML = "Standard"
    fun1.classList.add("d-none")
    fun3.classList.add("d-none")
    fun1.classList.remove("d-flex")
    fun3.classList.remove("d-flex")
}
function changeToScientific() {
    changeMode("scientific")
    document.getElementById("current-type").innerHTML = "Scientific"
    fun1.classList.add("d-flex")
    fun3.classList.add("d-flex")
    fun1.classList.remove("d-none")
    fun3.classList.remove("d-none")
}
const standardButtons = [
    "%", "CE", "C", "⌫",
    "1/x", "x²", "√x", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "+/-", "0", ".", "="
];

const scientificButtons = [
    "2ⁿᵈ", "π", "e", "C", "⌫",
    "x²", "1/x", "|x|", "exp", "mod",
    "√x", "(", ")", "n!", "÷",
    "xʸ", "7", "8", "9", "×",
    "10ˣ", "4", "5", "6", "−",
    "log", "1", "2", "3", "+",
    "ln", "+/-", "0", ".", "="
];

const scientificButtons2 = [
    "2ⁿᵈ", "π", "e", "C", "⌫",
    "x³", "1/x", "|x|", "exp", "mod",
    "³√x", "(", ")", "n!", "÷",
    "ʸ√x", "7", "8", "9", "×",
    "2ˣ", "4", "5", "6", "−",
    "logᵧx", "1", "2", "3", "+",
    "eˣ", "+/-", "0", ".", "="
];

const calculator = document.getElementById("btn-grid")

function renderButtons(buttonSet, column) {
    calculator.innerHTML = "";
    calculator.className = `row row-cols-${column} g-1 flex-grow-1`
    buttonSet.forEach(text => {
        const col = document.createElement("div")
        col.className = "col"

        const btn = document.createElement("button")
        btn.className = (text === "=") ? "btn btn-primary grid-btn-style w-100 h-100 p-3" : "btn btn-light border grid-btn-style w-100 h-100 p-3"
        btn.innerHTML = text;

        col.appendChild(btn);
        calculator.appendChild(col);
    });
}

function changeMode(mode) {
    if (mode === "standard") {
        renderButtons(standardButtons, 4);
    } else {
        renderButtons(scientificButtons, 5);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    changeToScientific()
    renderHistory();
})

function changeTheme() {
    if (theme == "light") {
        document.getElementById("trigDropdown2").classList.add("btn-dark")
        document.getElementById("trigDropdown1").classList.add("btn-dark")
        document.getElementById("trigDropdown1").classList.remove("btn-light")
        document.getElementById("trigDropdown2").classList.remove("btn-light")

        document.getElementById("css-link").setAttribute("href", "dark_css.css")
        document.getElementById("menu-icon").setAttribute("src", "images/menu_white.svg")
        document.getElementById("theme-change-btn").classList.remove("btn-light")
        document.getElementById("theme-change-btn").classList.add("btn-dark")
        document.getElementById("theme-change-btn").innerHTML = "Change Theme ☀️"
        document.getElementById("clear-btn").classList.remove("btn-light")
        document.getElementById("clear-btn").classList.add("btn-dark")

        theme = "dark"
    }
    else if (theme == "dark") {
        document.getElementById("trigDropdown1").classList.add("btn-light")
        document.getElementById("trigDropdown2").classList.add("btn-light")
        document.getElementById("trigDropdown1").classList.remove("btn-dark")
        document.getElementById("trigDropdown2").classList.remove("btn-dark")

        document.getElementById("css-link").setAttribute("href", "light_css.css")
        document.getElementById("menu-icon").setAttribute("src", "images/menu_black.svg")
        document.getElementById("theme-change-btn").classList.remove("btn-dark")
        document.getElementById("theme-change-btn").classList.add("btn-light")
        document.getElementById("theme-change-btn").innerHTML = "Change Theme 🌙"
        document.getElementById("clear-btn").classList.remove("btn-dark")
        document.getElementById("clear-btn").classList.add("btn-light")

        theme = "light"
    }
}

const historyTab = document.getElementById("history-tab");
const memoryTab = document.getElementById("memory-tab");

const historyList = document.getElementById("history-list");
const memoryListUI = document.getElementById("memory-list");

const clearBtn = document.getElementById("clear-btn");

historyTab.addEventListener("click", () => {

    historyList.classList.remove("d-none");
    memoryListUI.classList.add("d-none");

    clearBtn.classList.remove("d-none"); // show clear history

    historyTab.classList.add("active-tab");
    memoryTab.classList.remove("active-tab");
});

memoryTab.addEventListener("click", () => {

    memoryListUI.classList.remove("d-none");
    historyList.classList.add("d-none");

    clearBtn.classList.add("d-none"); // hide clear button

    memoryTab.classList.add("active-tab");
    historyTab.classList.remove("active-tab");
});