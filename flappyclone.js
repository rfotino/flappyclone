document.addEventListener("DOMContentLoaded", flappycloneInit, false);
var canvas = document.createElement("canvas");
var bird = {
    position: {
	x: 100,
	y: 320
    },
    velocity: 0,
    maxVelocity: 30,
    acceleration: 2,
    update: function() {
	this.position.y += this.velocity;
	this.velocity = Math.min(this.velocity + this.acceleration, this.maxVelocity);
    },
    draw: function(context) {
	context.fillStyle = "#000000";
	context.beginPath();
	context.arc(this.position.x, this.position.y, 10, 0, 2*Math.PI);
	context.fill();
    },
    jump: function() {
	this.velocity = -20;
    }
};
var pipes = new Array();
var score = 0;

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
    if (pipes.length === 0 || pipes[pipes.length-1].position < canvas.width - 250) {
	pipes[pipes.length] = {
	    width: 50,
	    position: canvas.width,
	    gapPosition: 150 + (Math.random() * (canvas.height - 300)),
	    addedPoints: false,
	    update: function() {
		this.position -= 4;
	    },
	    draw: function(context) {
		context.fillStyle = "#000000";
		context.fillRect(this.position, 0, this.width, this.gapPosition - 75);
		context.fillRect(this.position, this.gapPosition + 75, this.width, canvas.height - (this.gapPosition + 75));
	    }
	};
    }
    for (var i = pipes.length - 1; i >= 0; i--) {
	if (pipes[i].position < -pipes[i].width) {
	    pipes.splice(i, 1);
	} else {
	    pipes[i].update();
	    if (!pipes[i].addedPoints && pipes[i].position < bird.position.x) {
		score++;
		pipes[i].addedPoints = true;
	    }
	}
    }
    flappycloneDraw();
}

function flappycloneDraw() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw(context);
    for (var i = 0; i < pipes.length; i++) {
	pipes[i].draw(context);
    }
    
    //draw score
    context.fillStyle = "#999";
    context.font = "42px sans-serif";
    context.fillText(score, 50, 50);
    
    //draw floor
    context.fillStyle = "#000";
    context.fillRect(0, canvas.height-25, canvas.width, 25);
    
    setTimeout(flappycloneUpdate, 1000/30);
}