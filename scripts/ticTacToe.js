var rows = 3;
var cols = 3;

var width = 500;
var height = 300;
var size = Math.min(width / cols, height / rows);

var Tile = function (x, y) {
  this.x = x;
  this.y = y;
  this.draw = function () {
    rect(this.x, this.y, size, size, 10);
  }
};


var programCode = function (processingInstance) {
  with (processingInstance) {

    size(400, 400);
    frameRate(30);

    test = new Tile(50, 50);
    test.draw();
  }
};

// Get the canvas that ProcessingJS will use
var board = document.getElementById("tttBoard");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(board, programCode); 