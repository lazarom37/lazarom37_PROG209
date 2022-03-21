// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// rat image
var ratReady = false;
var ratImage = new Image();
ratImage.onload = function () {
    ratReady = true;
};
ratImage.src = "images/rat.png";

// trap image
var trapReady = false;
var trapImage = new Image();
trapImage.onload = function () {
    trapReady = true;
};
trapImage.src = "images/hero.png";

// ratHome image
var ratHomeReady = false;
var ratHomeImage = new Image();
ratHomeImage.onload = function () {
    ratHomeReady = true;
};
ratHomeImage.src = "images/ratHome.png";

//===============================//

// Game objects
var rat = {
    speed: 128, // movement in pixels per second
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

var trap = {
    //speed: 128, // might consider making them run around randomly?
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

var ratHome = {
    // for this version, the ratHome does not move, so just and x and y
    x: 0,
    y: 0
};
var cheese = 0;

// Handle keyboard controls
var keysDown = {
    keysDown: [] //[38 = "down"]
};
//object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down. In our game loop, we will move the rat image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown.FirstName = "Marcus";
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

//================================// FUNCTIONS

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        rat.y -= rat.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        rat.y += rat.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        rat.x -= rat.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        rat.x += rat.speed * modifier;
    }

    // rat + ratHome touch
    if (
        rat.x <= (ratHome.x + 64)
        && ratHome.x <= (rat.x + 32)
        && rat.y <= (ratHome.y + 64)
        && ratHome.y <= (rat.y + 32)
    ) {
        ++cheese; // Earned points
        soundEfx.src = "sounds/attack2.wav"
        soundEfx.play();
        timeleft = timeleft + 2;
        reset(); // start a new cycle
    }

    if (timeleft <= 0) {
        alert("Times up! You collected " + cheese + " pieces of cheese!");
    }

};

// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (ratReady) {
        ctx.drawImage(ratImage, rat.x, rat.y);
    }
    if (ratHomeReady) {
        ctx.drawImage(ratHomeImage, ratHome.x, ratHome.y);
    }
    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    if (timeleft <= 0) {
        ctx.fillText("GAME OVER");
    } else {
        ctx.fillText("Cheese: " + cheese, 32, 32);
    }

}
//Timer code
let timeleft = 10;
let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Times up!";
        //Note to self: Add more to this later.
    } else {
        document.getElementById("countdown").innerHTML = "TIME LEFT: " + timeleft;
    }
    timeleft -= 1;
}, 1000);

//================================// MAIN GAME LOOP
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player catches a ratHome
var reset = function () {
    rat.x = (canvas.width / 2) - 16;
    rat.y = (canvas.height / 2) - 16;

    //Place the ratHome somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be
    // hedge 32 + hedge 32 + char 32 = 96
    ratHome.x = 32 + (Math.random() * (canvas.width - 96));
    ratHome.y = 32 + (Math.random() * (canvas.height - 96));
};

// Let's play this game!
var then = Date.now();
reset();
main(); // call the main game loop.