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

