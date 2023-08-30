const degs = ["0", "30", "45", "60", "90", "120", "135", "150", "180", "210", "225", "240", "270", "300", "315", "330"];
const rads = ["0", "&pi;/6", "&pi;/4", "&pi;/3", "&pi;/2", "2&pi;/3", "3&pi;/4", "5&pi;/6", "&pi;", "7&pi;/6", "5&pi;/4", "4&pi;/3", "3&pi;/2", "5&pi;/3", "7&pi;/4", "11&pi;/6"];
const ansSin = ["0", "1 / 2", "sqrt 2 / 2", "sqrt 3 / 2", "1", "sqrt 3 / 2", "sqrt 2 / 2", "1 / 2", "0", "-1 / 2", "-sqrt 2 / 2", "-sqrt 3 / 2", "-1", "-sqrt 3 / 2", "-sqrt 2 / 2", "-1 / 2"];
const ansCos = ["1", "sqrt 3 / 2", "sqrt 2 / 2", "1 / 2", "0", "-1 / 2", "-sqrt 2 / 2", "-sqrt 3 / 2", "-1", "-sqrt 3 / 2", "-sqrt 2 / 2", "-1 / 2", "0", "1 / 2", "sqrt 2 / 2", "sqrt 3 / 2"];
const ansTan = ["0", "sqrt 3 / 3", "1", "sqrt 3", "dne", "-sqrt 3", "-1", "-sqrt 3 / 3", "0", "sqrt 3 / 3", "1", "sqrt 3", "dne", "-sqrt 3", "-1", "-sqrt 3 / 3"];

let qButton = document.getElementById("getQButton");
let submitButton = document.getElementById("aButton");
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
    if (document.getElementById("toggle").checked == 1) {
        if (fn == 0) {
            q = q.concat("sin ");
            a = ansSin[n];
        } else if (fn == 1) {
            q = q.concat("cos ");
            a = ansCos[n];
        } else {
            q = q.concat("tan ");
            a = ansTan[n];
        }
        q = q.concat(rads[n]);
    } else {
        /* Degrees */
        if (fn == 0) {
            q = q.concat("sin ");
            a = ansSin[n];
        } else if (fn == 1) {
            q = q.concat("cos ");
            a = ansCos[n];
        } else {
            q = q.concat("tan ");
            a = ansTan[n];
        }
        q = q.concat(degs[n]);
        q = q.concat("°");
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
    } else {
        result.innerHTML = "Incorrect :( Try again or press the button above for a new question.";
        result.style.color = "red";
    }
};

const input = document.getElementById("answer");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitButton.click();
    }
});

generateQuestion();
ask(q, a);
