const degs = ["0", "30&deg;", "45&deg;", "60&deg;", "90&deg;", "120&deg;", "135&deg;", "150&deg;", "180&deg;", "210&deg;", "225&deg;", "240&deg;", "270&deg;", "300&deg;", "315&deg;", "330&deg;"];
const rads = ["0", "&pi;/6", "&pi;/4", "&pi;/4"]
const ansSin = ["0", "1/2", "sqrt 2 / 2"]
const ansCos = []
const ansTan = []

let qButton = document.getElementById("getQButton");
let submitButton = document.getElementById("aButton")
let result = document.getElementById("answerCorrect");
let answerInput = document.getElementById("answer");

let q = "";
let a = 0;

function ask(question, correct) {
    var qText = document.getElementById("qText");
    qText.innerHTML = q;
}

function generateQuestion() {
    q = "";
    a = 0;
    answerInput.value = "";
    let n = Math.floor(Math.random() * 16);
    let fn = Math.floor(Math.random() * 3);
    /* Radians */
    if (document.getElementById("toggle")) {
        if (fn == 0) {
            q = q.concat("sin ");
            a = ansSin[n];
        }
        else if (fn == 1) {
            q = q.concat("cos ");
            a = ansCos[n];
        }
        else {
            q = q.concat("tan ");
            a = ansTan[n];
        }
        q = q.concat(rads[n]);
    }
    else {
        if (fn == 0) {
            q = q.concat("sin ");
            a = ansSin[n];
        }
        else if (fn == 1) {
            q = q.concat("cos ");
            a = ansCos[n];
        }
        else {
            q = q.concat("tan ");
            a = ansTan[n];
        }
        q = q.concat(degs[n]);
    }
}

qButton.onclick = () => {
    generateQuestion();
    ask(q, a);
};

submitButton.onclick = () => {
    var answer = answerInput.value;
    if (answer == a) {
        result.innerHTML = "Correct!";
        result.style.color = "green";
        generateQuestion();
        ask(q, a);
    }
    else {
        result.innerHTML = "Incorrect :( Try again or press the button above for a new question.";
        result.style.color = "red";
    }
}

const input = document.getElementById("answer");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitButton.click();
    }
});


generateQuestion();
ask(q, a);