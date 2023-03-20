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
    let n1 = Math.floor(1 + Math.random() * 50);
    let n2 = Math.floor(1 + Math.random() * 50);
    let oper = Math.floor(Math.random()*4);
    if (oper == 0) {
        q = q.concat(n1, " + ", n2);
        a = n1 + n2;
    }
    else if (oper == 1) {
        q = q.concat(n1, " - ", n2);
        a = n1 - n2;
    }
    else if (oper == 2) {
        q = q.concat(n1, " x ", n2);
        a = n1 * n2;
    }
    else {
        q = q.concat(n1, " / ", n2);
        a = Math.round(((n1 / n2) + Number.EPSILON) * 100) / 100
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
    }
    else {
        result.innerHTML = "Incorrect :( Try again or press the button above for a new question.";
        result.style.color = "red";
    }
    ask(q, a);
}

const input = document.getElementById("answer");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitButton.click();
    }
});


generateQuestion();
ask(q, a);