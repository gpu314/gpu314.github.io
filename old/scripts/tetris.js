let interval = 0;
let interval2 = 0;
const ms = 10;
const ms_move = 500;
var gameState = 1;

const cell = 20;
const tetrominos = [
    ["I", "#6EECEE", [17476, 3840, 8738, 240]],
    ["J", "#0000E6", [550, 1136, 802, 113]],
    ["L", "#E4A339", [1570, 368, 547, 116]],
    ["O", "#F0F04F", [102, 102, 102, 102]],
    ["S", "#6EEC47", [1122, 864, 561, 54]],
    ["T", "#921CE7", [610, 624, 562, 114]],
    ["Z", "#DC2F21", [612, 1584, 306, 99]]
]

var curr;
var idx = Math.floor(Math.random() * 7);
var rot = Math.floor(Math.random() * 4);
var idx_nxt = Math.floor(Math.random() * 7);
var rot_nxt = Math.floor(Math.random() * 4);
var x = 3;
var y = 0;
var block_x;
var block_y;
var sidemenu_x;
var sidemenu_y;

const width = 10;
const height = 20;

const canvas = document.getElementById("canvas");
canvas.width = width * cell + 6 * cell;
canvas.height = height * cell;
const ctx = canvas.getContext("2d");
ctx.font = cell + "px Fira Sans";

document.addEventListener("keydown", keyDownHandler, false);

var grid = [];
for (var i = 0; i < height; i++) {
    const tmp = []
    for (var j = 0; j < width; j++) {
        tmp.push(-1);
    }
    grid.push(tmp);
}

function writeText(text, x, y) {
    let textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "white";
    ctx.fillText(text, x - textWidth / 2, y - cell / 2);
}

function block_load() {
    x = 3;
    y = 0;
    idx = idx_nxt;
    rot = rot_nxt;
    idx_nxt = Math.floor(Math.random() * 7);
    rot_nxt = Math.floor(Math.random() * 4);
    if (block_check_bottom()) {
        gameState = 2;
    }
}

function block_draw() {
    curr = tetrominos[idx][2][rot];
    ctx.beginPath();
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            block_x = x + (i % 4);
            block_y = y + Math.floor(i / 4);
            ctx.rect(block_x * cell, block_y * cell, cell, cell);
        }
    }
    ctx.fillStyle = tetrominos[idx][1];
    ctx.fill();
    ctx.closePath();
}

function block_check_bottom() {
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            block_x = x + (i % 4);
            block_y = y + Math.floor(i / 4);
            if (block_y < 0 || block_y >= height || grid[block_y][block_x] != -1) {
                return true;
            }
        }
    }
    return false;
}

function block_check_sides() {
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            block_x = x + (i % 4);
            block_y = y + Math.floor(i / 4);
            if (block_x < 0 || block_x >= width || grid[block_y][block_x] != -1) {
                console.log(grid);
                return true;
            }
        }
    }
    return false;
}

function block_add() {
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            block_x = x + (i % 4);
            block_y = y + Math.floor(i / 4);
            if (block_y < height) {
                grid[block_y][block_x] = idx;
            }
        }
    }
}

function clear_rows() {
    for (var r = height - 1; r >= 0; r--) {
        var filled = true;
        for (var c = 0; c < width; c++) {
            if (grid[r][c] == -1) { filled = false; break; }
        }
        if (filled) {
            grid.splice(r, 1);
            grid.splice(0, 0, Array(width).fill(-1));
        }
    }
}

function grid_draw() {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (grid[i][j] != -1) {
                ctx.beginPath();
                ctx.rect(j * cell, i * cell, cell, cell);
                ctx.fillStyle = tetrominos[grid[i][j]][1];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function projection_calculate() {
    var drop = y;
    var drop_test = drop + 1;
    var atBottom = false;
    while (drop >= 0 && drop < height && drop_test >= 0 && drop_test < height) {
        drop_test = drop + 1;
        atBottom = false;
        for (var i = 0; i < 16; i++) {
            if ((curr & (1 << i)) != 0) {
                block_x = x + (i % 4);
                block_y = drop_test + Math.floor(i / 4);
                if (block_x < 0 || block_x >= width || block_y >= height || grid[block_y][block_x] != -1) {
                    atBottom = true;
                    break;
                }
            }
        }
        if (atBottom) break;
        drop++;
    }
    return drop;
}

function projection_draw(y_drop) {
    ctx.beginPath();
    curr = tetrominos[idx][2][rot];
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            block_x = x + (i % 4);
            block_y = y_drop + Math.floor(i / 4);
            ctx.rect(block_x * cell, block_y * cell, cell, cell);
        }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.closePath();
}

function sidemenu_draw() {

    ctx.beginPath();
    ctx.rect(width * cell, 0, 6 * cell, height * cell);
    ctx.fillStyle = "#006633";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    writeText("NEXT", width * cell + 3 * cell, 2 * cell);

    curr = tetrominos[idx_nxt][2][rot_nxt];

    ctx.beginPath();
    for (var i = 0; i < 16; i++) {
        if ((curr & (1 << i)) != 0) {
            sidemenu_x = 11 + (i % 4);
            sidemenu_y = 2 + Math.floor(i / 4);
            ctx.rect(sidemenu_x * cell, sidemenu_y * cell, cell, cell);
        }
    }
    ctx.fillStyle = tetrominos[idx_nxt][1];
    ctx.fill();
    ctx.closePath();
}

function menu() {
    writeText("TETRIS", cell * width / 2, cell * height / 2 - 2 * cell);
    writeText("p to begin", cell * width / 2, cell * height / 2 + 2 * cell)
}

function end() {
    writeText("RESTART", cell * width / 2, cell * height / 2 - 2 * cell);
    writeText("Enter for menu", cell * width / 2, cell * height / 2 + 2 * cell);
}

function game() {
    ctx.clearRect(0, 0, width * cell, height * cell);
    if (gameState == 0) {
        menu();
        grid = [];
        for (var i = 0; i < height; i++) {
            const tmp = []
            for (var j = 0; j < width; j++) {
                tmp.push(-1);
            }
            grid.push(tmp);
        }
    }
    if (gameState == 1) {
        sidemenu_draw();
        grid_draw();
        block_draw();
        projection_draw(projection_calculate());
    }
    else if (gameState == 2) {
        end();
    }
}

function block_move() {
    if (gameState == 1) {
        y++;
        if (block_check_bottom()) {
            console.log("move");
            y--;
            block_add();
            clear_rows();
            block_load();
        }
    }
}

function start() {
    canvas.style.display = 'block';
    interval = setInterval(game, ms);
    interval2 = setInterval(block_move, ms_move);
}


function keyDownHandler(e) {
    console.log(e.key);
    if (gameState == 0) {
        if (e.key == "p") {
            gameState = 1;
        }
    }
    if (gameState == 1) {
        if (e.key == "ArrowUp" || e.key == "x") {
            rot = (rot + 1) % 4;
            if (block_check_sides() || block_check_bottom()) rot = (rot + 3) % 4;
        }
        if (e.key == "Control" || e.key == "z") {
            rot = (rot + 3) % 4;
            if (block_check_sides() || block_check_bottom()) rot = (rot + 1) % 4;
        }
        if (e.key == "ArrowLeft") {
            x--;
            if (block_check_sides()) x++;
        }
        if (e.key == "ArrowRight") {
            x++;
            if (block_check_sides()) x--;
        }
        if (e.key == "ArrowDown") {
            y += 2;
            if (block_check_bottom()) {
                while (y > 0 && block_check_bottom()) y--;
                block_add();
                clear_rows();
                block_load();
            }
        }
        if (e.key == " ") {
            y += projection_calculate();
            while (y > 0 && block_check_bottom()) y--;
            block_add();
            clear_rows();
        }
        if (e.key == "Shift" || e.key == "c") {
            idx += idx_nxt;
            idx_nxt = idx - idx_nxt;
            idx -= idx_nxt;
            rot += rot_nxt;
            rot_nxt = rot - rot_nxt;
            rot -= rot_nxt;
            if (block_check_bottom() || block_check_sides()) {
                idx += idx_nxt;
                idx_nxt = idx - idx_nxt;
                idx -= idx_nxt;
                rot += rot_nxt;
                rot_nxt = rot - rot_nxt;
                rot -= rot_nxt;
            }
        }
    }
    if (gameState == 2) {
        if (e.key == "Enter") {
            gameState = 0;
        }
    }
}

