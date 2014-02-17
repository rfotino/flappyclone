document.addEventListener("DOMContentLoaded", flappycloneInit, false);
var canvas = document.createElement("canvas");
var bird = {
    position: 320,
    velocity: 0,
    maxVelocity: 30,
    acceleration: 2,
    update: function() {
	this.position += this.velocity;
	this.velocity = Math.min(this.velocity + this.acceleration, this.maxVelocity);
    },
    draw: function(context) {
	context.fillStyle = "#000000";
	context.beginPath();
	context.arc(100, this.position, 10, 0, 2*Math.PI);
	context.fill();
    },
    jump: function() {
	this.velocity = -20;
    }
};

function flappycloneInit() {
    canvas.setAttribute("width", "960px");
    canvas.setAttribute("height", "640px");
    canvas.setAttribute("tabindex", 1);
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    canvas.style.outline = "none";
    document.body.appendChild(canvas);
    canvas.focus();
    canvas.onkeydown = flappycloneKeyDown;
    canvas.onkeyup = flappycloneKeyUp;
    context = canvas.getContext("2d");
    
    flappycloneUpdate();
}

var spacedown = false;
function flappycloneKeyDown(e) {
    var key = e.which || e.keyCode;
    if (key === 32 && !spacedown) {
	bird.jump();
	spacedown = true;
    }
}
function flappycloneKeyUp(e) {
    var key = e.which || e.keyCode;
    if (key === 32) {
	spacedown = false;
    }
}

function flappycloneUpdate() {
    bird.update();
    flappycloneDraw();
}

function flappycloneDraw() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, 960, 640);
    bird.draw(context);
    
    setTimeout(flappycloneUpdate, 1000/30);
}