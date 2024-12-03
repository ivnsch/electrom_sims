var drawCircle = function (ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
};
var run = function (document) {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    drawCircle(ctx, 200, 100);
    drawCircle(ctx, 300, 200);
};
run(document);
