var scorePlayer1 = 0;
var scorePlayer2 = 0;
let button1 = 0;
let button2 = 0;

function setText() {
    var inputFeld = document.getElementById("Score");
    var text = scorePlayer1 + " : " + scorePlayer2;
    inputFeld.value = text;
}

document.getElementById('startButton').addEventListener('click', function() {
    askQuestion();
});

function askQuestion() {
    let answer = prompt("Wie viele Spieler? (1 oder 2)");

    if (answer === "1") {
        console.log("1");
        startGame(false);
    } else if (answer === "2") {
        console.log("2");
        startGame(true);
    }
}

function startGame(isTwoPlayer) {
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    setText()
    let ctx = ca.getContext('2d');
    let p1 = 80;
    let p2 = 200;
    let key = {};
    let ball = {
        x: 360,
        y: 240,
        speedX: 5,
        speedY: 0
    };

    let aiSpeed = 2;

    document.addEventListener('keydown', e => key[e.keyCode] = true);
    document.addEventListener('keyup', e => key[e.keyCode] = false);

    draw();
    setInterval(loop, 1000 / 60);

    function draw() {
        ctx.clearRect(0, 0, 720, 480); // Clear canvas before drawing
        ctx.fillStyle = 'rgb(240, 240, 240)';
        ctx.fillRect(0, 0, 720, 480);
        ctx.fillStyle = 'rgb(0, 116, 136)';
        ctx.fillRect(10, p1, 10, 80);
        ctx.fillRect(700, p2, 10, 80);
        ctx.fillRect(ball.x, ball.y, 10, 10);
        requestAnimationFrame(draw);
    }

    document.getElementById('W').addEventListener('mousedown', function() {
        button1 = 1;
    });
    
    document.getElementById('W').addEventListener('mouseup', function() {
        button1 = 0;
    });
    
    document.getElementById('S').addEventListener('mousedown', function() {
        button2 = 1;
    });
    
    document.getElementById('S').addEventListener('mouseup', function() {
        button2 = 0;
    });
    

    function loop() {
        if (isTwoPlayer) {
            if (key[38]) { // Up arrow
                p2 = Math.max(p2 - 3, 0);
            }
            if (key[40]) { // Down arrow
                p2 = Math.min(p2 + 3, 400);
            }
            if (key[87]) { // W key
                p1 = Math.max(p1 - 3, 0);
            }
            if (key[83]) { // S key
                p1 = Math.min(p1 + 3, 400);
            }
        } else {
            if (key[87]) { // W key
                p2 = Math.max(p2 - 3, 0);
            }
            if (key[83]) { // S key
                p2 = Math.min(p2 + 3, 400);
            }
            if (button1 === 1) { // W key
                p2 = Math.max(p2 - 3, 0);
            }
            if (button2 === 1) { // S key
                p2 = Math.min(p2 + 3, 400);
            }

            if (ball.speedX < 0) {
                if (ball.y < p1 + 40) {
                    p1 = Math.max(p1 - aiSpeed, 0);
                } else if (ball.y > p1 + 40) {
                    p1 = Math.min(p1 + aiSpeed, 400);
                }
            }
        }

        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Ball trifft linke oder rechte Wand (Punkt für Spieler)
        if (ball.x < 0) {
            scorePlayer2++; // Punkt für Spieler 2
            setText(); // Score aktualisieren
            resetBall();
        }
        if (ball.x > 720) {
            scorePlayer1++; // Punkt für Spieler 1
            setText(); // Score aktualisieren
            resetBall();
        }

        if (ball.y < 0 || ball.y > 470) {
            ball.speedY = -ball.speedY;
        }

        // Ball trifft Schläger
        if (ball.x < 20 || ball.x > 690) {
            if (ball.y > p1 - 10 && ball.y < p1 + 80 && ball.speedX < 0) {
                ball.speedX = -ball.speedX + 1;
                ball.speedY = (ball.y - p1 - 40) * 0.15;
            } else if (ball.y > p2 - 10 && ball.y < p2 + 80 && ball.speedX > 0) {
                ball.speedX = -ball.speedX;
                ball.speedY = (ball.y - p2 - 40) * 0.15;
            }
        }
    }

    function resetBall() {
        ball.x = 360;
        ball.y = 240;
        ball.speedX = ball.speedX < 0 ? 3 : -3;
        ball.speedY = 0;
    }
}
