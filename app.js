let score = 0;
let cross = true;
let gamesound  = new Audio("Run-Amok.mp3");
let oversound  = new Audio("woman-scream-02.mp3");
let pointSound = new Audio("point.mp3");
setTimeout(() => {
    gamesound.play();
}, 1000);

document.onkeydown = (event) => {
    if (event.keyCode == 38) {
        dino = document.querySelector(".dino");
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700)
    }
    if (event.keyCode == 39) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 115 + "px";
    }
    if (event.keyCode == 37) {
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 115) + "px";
    }
}
setInterval(() => {
    dino = document.querySelector(".dino");
    flydino = document.querySelector(".flydino");
    gameOver = document.querySelector(".gameOver");

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    fx = parseInt(window.getComputedStyle(flydino, null).getPropertyValue('left'));
    fy = parseInt(window.getComputedStyle(flydino, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - fx);
    offsetY = Math.abs(dy - fy);

    if (offsetX < 120 && offsetY < 52) {
        gameOver.style.visibility = "visible";
        flydino.classList.remove("animateflydino")
        score = 0 ;
        oversound.play()
    } else if (offsetX < 145 && cross) {

        score += 1;
        pointSound.play()
        updateScore(score)
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000)

        setTimeout(() => {
            dinoflydur = parseFloat(window.getComputedStyle(flydino, null).getPropertyValue("animation-duration"));
            duration = dinoflydur - 0.1;
            if (duration <= 3) {
                const newDuration = duration;
                flydino.style.animationDuration = newDuration + "s";
            } else {
                flydino.style.animationDuration = duration + "s";
            }
        }, 500);

    }

}, 10)

function updateScore(score) {
    scoreCount = document.querySelector(".scoreCount");
    scoreCount.innerHTML = "Your score : " + score;
}