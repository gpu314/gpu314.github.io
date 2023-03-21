const degs = ["0", "30", "45", "60", "90", "120", "135", "150", "180", "210", "225", "240", "270", "300", "315", "330"];
const rads = ["0", "&pi;/6", "&pi;/4", "&pi;/3","&pi;/2","2&pi;/3","3&pi;/4","5&pi;/6","&pi;","7&pi;/6","5&pi;/4","4&pi;/3","3&pi;/2","5&pi;/3","7&pi;/4","11&pi;/6"]
const ansSin = ["0", "1 / 2", "sqrt 2 / 2", "sqrt 3 / 2", "1", "sqrt 3 / 2", "sqrt 2 / 2", "1 / 2", "0", "-1 / 2", "-sqrt 2 / 2", "-sqrt 3 / 2", "-1", "-sqrt 3 / 2", "-sqrt 2 / 2", "-1 / 2"]
const ansCos = ["1", "sqrt 3 / 2", "sqrt 2 / 2", "1 / 2", "0", "-1 / 2", "-sqrt 2 / 2", "-sqrt 3 / 2", "-1", "-sqrt 3 / 2", "-sqrt 2 / 2", "-1 / 2", "0", "1 / 2", "sqrt 2 / 2", "sqrt 3 / 2"]
const ansTan = ["0", "sqrt 3 / 3", "1", "sqrt 3", "dne", "-sqrt 3", "-1", "-sqrt 3 / 3", "0", "sqrt 3 / 3", "1", "sqrt 3", "dne", "-sqrt 3", "-1", "-sqrt 3 / 3"]

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
    if (document.getElementById("toggle").checked) {
        if (fn == 0) {
            q = q.concat("sin(");
            a = Math.sin(Math.PI * (+(rads[n].replace("&pi;",""))));
        }
        else if (fn == 1) {
            q = q.concat("cos(");
            a = Math.cos(Math.PI * (+(rads[n].replace("&pi;",""))));
        }
        else {
            q = q.concat("tan(");
            a = Math.tan(Math.PI * (+(rads[n].replace("&pi;",""))));
        }
        q = q.concat(rads[n], ")");
    }
    else {
        if (fn == 0) {
            q = q.concat("sin ");
            a = Math.sin(Math.PI * (+(degs[n])) / 180);
        }
        else if (fn == 1) {
            q = q.concat("cos ");
            a = Math.cos(Math.PI * (+(degs[n])) / 180);
        }
        else {
            q = q.concat("tan ");
            if (n == 4 || n == 12) a = "dne";
            else a = Math.tan(Math.PI * (+(degs[n])) / 180);
        }
        q = q.concat(degs[n], "&deg;");
    }
}

function valueOf(x) {
    if (isNaN(+x)) {
        return (Math.abs(eval(x.replace("sqrt", ""))) / eval(x.replace("sqrt", ""))) * ((Math.sqrt(Math.abs(eval(x.replace("sqrt", "")))) / Math.sqrt(+(x.slice(-1)))));
    }
    return +x
}

qButton.onclick = () => {
    generateQuestion();
    ask(q, a);
};

submitButton.onclick = () => {
    var answer = answerInput.value;
    if ((a == "dne" && answer.toLowerCase() == "dne") || (Math.abs(valueOf(answer) - a) < 0.0001)) {
        result.innerHTML = "Correct!";
        result.style.color = "green";
        generateQuestion();
        ask(q, a);
    }
    else {
        result.innerHTML = valueOf(answer) - a;
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