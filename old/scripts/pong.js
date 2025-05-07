let interval = 0;
const ms = 10;

const ball_r = 10;
const paddle_width = 5;
const paddle_height = 100;

let gameState = 0; // 0 = menu, 1 = game, 2 = end
let menuCounter = 0; // 0 = p1 up, 1 = p1 down, 2 = p2 up, 3 = p2 down
const menuMsg = ["1 (left side) up", "1 (left side) down", "2 (right side) up", "2 (right side) down"];

const fontSize = 36;

const canvas = document.getElementById("canvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
ctx.font = fontSize + "px Fira Sans";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let ball_x = width / 2;
let ball_y = height / 2;
let ball_dx = Math.random() < 0.5 ? -1 : 1;
let ball_dy = Math.random() < 0.5 ? -1 : 1;
const p1_x = 0;
let p1_y = height / 2 - paddle_height / 2;
let p1_dy = 0; // -1 = up, +1 = down
const p2_x = width - paddle_width;
let p2_y = height / 2 - paddle_height / 2;
let p2_dy = 0; // -1 = up, +1 = down

let moves = ["", "", "", ""];

let p1_score = 0;
let p2_score = 0;

const ball_speed = 2;
const p_speed = 3;


function writeText(text, x, y) {
    let textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "white";
    ctx.fillText(text, x - textWidth / 2, y - fontSize / 2);
}

function reset() {
    ball_x = width / 2;
    ball_y = height / 2;
    ball_dx = Math.random() < 0.5 ? -1 : 1;
    ball_dy = Math.random() < 0.5 ? -1 : 1;
    p1_y = height / 2 - paddle_height / 2;
    p1_dy = 0; // -1 = up, +1 = down
    p2_y = height / 2 - paddle_height / 2;
    p2_dy = 0; // -1 = up, +1 = down
}

function score_draw() {
    ctx.fillStyle = "white";
    writeText(p1_score, width / 4, 50 + fontSize / 2);
    writeText(p2_score, 3 * width / 4, 50 + fontSize / 2);
}

function p1_draw() {
    ctx.beginPath();
    ctx.rect(p1_x, p1_y, paddle_width, paddle_height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function p2_draw() {
    ctx.beginPath();
    ctx.rect(p2_x, p2_y, paddle_width, paddle_height);
    ctx.fillStyle = "#0000FF";
    ctx.fill();
    ctx.closePath();
}

function ball_draw() {
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_r, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function p1_move() {
    p1_y += p_speed * p1_dy;
    if (p1_y < 0) p1_y = 0;
    if (p1_y > height - paddle_height) p1_y = height - paddle_height;
}

function p2_move() {
    p2_y += p_speed * p2_dy;
    if (p2_y < 0) p2_y = 0;
    if (p2_y > height - paddle_height) p2_y = height - paddle_height;
}

function ball_move() {
    if (ball_x + ball_speed * ball_dx < ball_r) {
        if (p1_y < ball_y && ball_y < p1_y + paddle_height) {
            ball_dx *= -1;
        }
        else {
            p2_score++;
            reset();
        }
    }
    if (ball_x + ball_speed * ball_dx > width - ball_r) {
        if (p2_y < ball_y && ball_y < p2_y + paddle_height) {
            ball_dx *= -1;
        }
        else {
            p1_score++;
            reset();
        }
    }
    if (ball_y + ball_speed * ball_dy < ball_r || ball_y + ball_speed * ball_dy > height - ball_r) {
        ball_dy *= -1;
    }

    ball_x += ball_speed * ball_dx;
    ball_y += ball_speed * ball_dy;
}

function drawGame() {
    score_draw();
    p1_draw();
    p2_draw();
    ball_draw();
}

function move() {
    p1_move();
    p2_move();
    ball_move();
}

function gameCheck() {
    if (p1_score >= 5 || p2_score >= 5) {
        gameState = 2;
    }
}

function menu() {
    writeText("PONG", width / 2, height / 2 - 2 * fontSize);
    for (var i = 0; i < menuCounter; i++) {
        writeText("Player " + menuMsg[i] + ": " + moves[i], width / 2, height / 2 + i * fontSize);
    }
    if (menuCounter > 3) {
        writeText("Press enter to begin", width / 2, height / 2 + (i + 1) * fontSize)
    }
    else {
        writeText("Press key for player " + menuMsg[menuCounter], width / 2, height / 2 + (i + 1) * fontSize);
    }
}

function end() {
    writeText("Winner: player " + (p1_score < p2_score ? "2 (right side)" : "1 (left side)"), width / 2, height / 2 - fontSize);
    writeText("Final Score: " + p1_score + " to " + p2_score, width / 2, height / 2 + fontSize);
    writeText("Press space to return to menu", width / 2, height / 2 + 2 * fontSize);
}

function game() {
    ctx.clearRect(0, 0, width, height);
    console.log(gameState);
    if (gameState == 0) {
        reset();
        menu();
    }
    if (gameState == 1) {
        drawGame();
        move();
        gameCheck();
    }
    if (gameState == 2) {
        end();
    }
}

function start() {
    canvas.style.display = 'block';
    reset();
    interval = setInterval(game, ms);
}

function keyDownHandler(e) {
    if (gameState == 0) {
        if (menuCounter > 3) {
            if (e.key == "Enter") {
                gameState = 1;
            }
        }
        else {
            console.log(e.key, moves, (moves.includes(e.key)));
            if (!(moves.includes(e.key))) {
                moves[menuCounter] = e.key;
                menuCounter++;
            }
        }
    }
    if (gameState == 1) {
        if (e.key == moves[0]) p1_dy = -1;
        else if (e.key == moves[2]) p2_dy = -1;
        else if (e.key == moves[1]) p1_dy = 1;
        else if (e.key == moves[3]) p2_dy = 1;
    }
    if (gameState == 2) {
        if (e.key == " ") {
            gameState = 0;
            p1_score = 0;
            p2_score = 0;
            menuCounter = 0;
        }
    }
}

function keyUpHandler(e) {
    if (gameState == 1) {
        if (e.key == moves[0] || e.key == moves[1]) p1_dy = 0;
        else if (e.key == moves[2] || e.key == moves[3]) p2_dy = 0;
        console.log(e.key);
    }
}

