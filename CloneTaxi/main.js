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

// taxi image
var taxiReady = false;
var taxiImage = new Image();
taxiImage.onload = function () {
    taxiReady = true;
};
taxiImage.src = "images/taxi.png";

// destination image
var destinationReady = false;
var destinationImage = new Image();
destinationImage.onload = function () {
    destinationReady = true;
};
destinationImage.src = "images/destination.png";

//===============================//

// Game objects
var taxi = {
    speed: 256, // movement in pixels per second
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};
var destination = {
    // for this version, the destination does not move, so just and x and y
    x: 0,
    y: 0
};
var revenue = 0;

// Handle keyboard controls
var keysDown = {
    keysDown: [] //[38 = "down"]
};
//object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down. In our game loop, we will move the taxi image if when
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
        taxi.y -= taxi.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        taxi.y += taxi.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        taxi.x -= taxi.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        taxi.x += taxi.speed * modifier;
    }

    // Are they touching?
    // Gonna need to check them hitboxes
    if (
        taxi.x <= (destination.x + 50)
        && destination.x <= (taxi.x + 50)
        && taxi.y <= (destination.y + 50)
        && destination.y <= (taxi.y + 50)
    ) {
        revenue = revenue + 4.25; // Earned cash
        soundEfx.src = "sounds/attack2.wav"
        soundEfx.play();
        reset(); // start a new cycle
    }

};

// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (taxiReady) {
        ctx.drawImage(taxiImage, taxi.x, taxi.y);
    }
    if (destinationReady) {
        ctx.drawImage(destinationImage, destination.x, destination.y);
    }
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    if (revenue === 3) {
        ctx.fillText("YOU WON! ", 32, 32)
    }
    else {
        ctx.fillText("Revenue: " + revenue, 32, 32);
    }
}

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

// Reset the game when the player catches a destination
var reset = function () {
    taxi.x = (canvas.width / 2) - 16;
    taxi.y = (canvas.height / 2) - 16;

    //Place the destination somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be
    // hedge 32 + hedge 32 + char 32 = 96
    destination.x = 32 + (Math.random() * (canvas.width - 96));
    destination.y = 32 + (Math.random() * (canvas.height - 96));

    //Timer code, somehow putting it here makes it work
    let timeleft = 10;
    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            //Note to self: Add more to this later.
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);

};

// Let's play this game!
var then = Date.now();
reset();
main(); // call the main game loop.