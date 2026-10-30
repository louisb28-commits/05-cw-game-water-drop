let score = 0;
let timeLeft = 30;
let gameRunning = false;

let dropMaker;
let countdown;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameContainer = document.getElementById("game-container");
const message = document.getElementById("message");

// Milestone messages
const milestones = [
    {
        score: 5,
        message: "💧 Great Start!"
    },
    {
        score: 10,
        message: "🚰 Halfway There!"
    },
    {
        score: 13,
        message: "🌍 Almost enough clean water!"
    }
];

let shownMilestones = [];

document
    .getElementById("start-btn")
    .addEventListener("click", startGame);

document
    .getElementById("reset-btn")
    .addEventListener("click", resetGame);

function startGame() {
    if (gameRunning) return;

    gameRunning = true;

    score = 0;
    timeLeft = 30;
    shownMilestones = [];

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    message.textContent = "";

    gameContainer.innerHTML = "";

    dropMaker = setInterval(createDrop, 700);

    countdown = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function createDrop() {
    const drop = document.createElement("div");

    const isBad = Math.random() < 0.3;

    drop.classList.add("water-drop");

    if (isBad) {
        drop.classList.add("bad-drop");
    } else {
        drop.classList.add("good-drop");
    }

    const size = 40 + Math.random() * 30;

    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;

    const xPosition =
        Math.random() *
        (gameContainer.offsetWidth - size);

    drop.style.left = `${xPosition}px`;

    drop.style.animationDuration =
        `${3 + Math.random() * 2}s`;

    drop.addEventListener("click", () => {
        if (!gameRunning) return;

        if (isBad) {
            score--;
        } else {
            score++;
        }

        scoreDisplay.textContent = score;

        checkMilestones();
        checkWin();

        drop.remove();
    });

    drop.addEventListener("animationend", () => {
        drop.remove();
    });

    gameContainer.appendChild(drop);
}

function checkMilestones() {
    milestones.forEach(milestone => {
        if (
            score >= milestone.score &&
            !shownMilestones.includes(milestone.score)
        ) {
            message.textContent = milestone.message;

            shownMilestones.push(
                milestone.score
            );
        }
    });
}

function checkWin() {
    if (score >= 15) {
        message.textContent =
            "🎉 You brought clean water to a community!";

        gameContainer.style.backgroundColor =
            "#8BD1CB";

        endGame(true);
    }
}

function endGame(won = false) {
    clearInterval(dropMaker);
    clearInterval(countdown);

    gameRunning = false;

    if (!won) {
        message.textContent =
            `Game Over! Final Score: ${score}`;
    }
}

function resetGame() {
    clearInterval(dropMaker);
    clearInterval(countdown);

    gameRunning = false;
    score = 0;
    timeLeft = 30;

    shownMilestones = [];

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    message.textContent = "";

    gameContainer.style.backgroundColor =
        "#e6f7ff";

    gameContainer.innerHTML = "";
}
