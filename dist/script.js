"use strict";
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-btn");
const truthButton = document.getElementById("truth-btn");
const dareButton = document.getElementById("dare-btn");
const pickButton = document.getElementById("pick-btn");
const nextButton = document.getElementById("next-btn");
const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");
const playerDisplay = document.getElementById("player-display");
const roundDisplay = document.getElementById("round-display");
const streakDisplay = document.getElementById("streak-display");
const resultCard = document.getElementById("result-card");
const typeLabel = document.getElementById("type-label");
const questionElement = document.getElementById("question");
const resultRound = document.getElementById("result-round");
const resultMessage = document.getElementById("result-message");
const gameMessage = document.getElementById("game-message");
const selectedLabel = document.getElementById("selected-label");
const pickHint = document.getElementById("pick-hint");
let playerName = "";
let round = 1;
let streak = 0;
let selectedType = null;
let truths = [];
let dares = [];
let usedTruths = [];
let usedDares = [];
const truthMessages = [
    "Be honest... we can tell when you're lying. 👀",
    "No pressure. Just your reputation. 😌",
    "Okay... expose yourself. 🤭",
    "The truth hurts sometimes. Good luck. 💀",
    "Everybody is listening... 👂",
    "You picked this. Not us. 😂"
];
const dareMessages = [
    "Oh no. You actually picked Dare. 💀",
    "You asked for this. 😈",
    "No backing out now. 😂",
    "Time to prove you're brave. 🔥",
    "This could get embarrassing. 🤡",
    "We officially regret giving you this option. 😭"
];
const nextMessages = [
    "That was easy... maybe. 👀",
    "Still alive? Impressive. 😂",
    "Okay, next victim... I mean player.",
    "Round two? Brave choice.",
    "Things are getting interesting. 😈"
];
const getRandomItem = (items) => {
    const index = Math.floor(Math.random() * items.length);
    return items[index] ?? "";
};
const loadQuestions = async () => {
    try {
        const [truthResponse, dareResponse] = await Promise.all([
            fetch("./data/truths.json"),
            fetch("./data/dares.json")
        ]);
        if (!truthResponse.ok ||
            !dareResponse.ok) {
            throw new Error("Could not load game data.");
        }
        truths =
            await truthResponse.json();
        dares =
            await dareResponse.json();
        console.log("Game data loaded.");
    }
    catch (error) {
        console.error(error);
        questionElement.textContent =
            "Oops! Game questions could not be loaded.";
    }
};
const getRandomQuestion = (questions, usedQuestions) => {
    if (questions.length === 0) {
        return "No questions available.";
    }
    if (usedQuestions.length ===
        questions.length) {
        usedQuestions.length = 0;
    }
    let randomIndex;
    do {
        randomIndex =
            Math.floor(Math.random() *
                questions.length);
    } while (usedQuestions.includes(randomIndex));
    usedQuestions.push(randomIndex);
    return questions[randomIndex];
};
const selectType = (type) => {
    selectedType = type;
    truthButton.classList.remove("selected");
    dareButton.classList.remove("selected");
    if (type === "truth") {
        truthButton.classList.add("selected");
        selectedLabel.textContent =
            "😇 TRUTH SELECTED";
        pickHint.textContent =
            "Ready to expose yourself?";
        gameMessage.textContent =
            "Playing it safe... kinda.";
    }
    else {
        dareButton.classList.add("selected");
        selectedLabel.textContent =
            "😈 DARE SELECTED";
        pickHint.textContent =
            "You really want to do this?";
        gameMessage.textContent =
            "Oh boy... here we go.";
    }
    pickButton.disabled = false;
};
const pickQuestion = () => {
    if (!selectedType) {
        return;
    }
    let question;
    if (selectedType === "truth") {
        question =
            getRandomQuestion(truths, usedTruths);
        typeLabel.textContent =
            "TRUTH";
        resultMessage.textContent =
            getRandomItem(truthMessages);
    }
    else {
        question =
            getRandomQuestion(dares, usedDares);
        typeLabel.textContent =
            "DARE";
        resultMessage.textContent =
            getRandomItem(dareMessages);
    }
    questionElement.textContent =
        question;
    resultRound.textContent =
        round
            .toString()
            .padStart(2, "0");
    streak++;
    streakDisplay.textContent =
        streak
            .toString()
            .padStart(2, "0");
    resultCard.classList.remove("hidden");
    truthButton.disabled = true;
    dareButton.disabled = true;
    pickButton.disabled = true;
    pickHint.textContent =
        "Challenge unlocked!";
    gameMessage.textContent =
        "OH NO! YOU GOT ONE! 😂";
    setTimeout(() => {
        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 100);
};
startButton.addEventListener("click", async () => {
    const name = playerNameInput.value.trim();
    if (!name) {
        playerNameInput.focus();
        return;
    }
    playerName = name;
    round = 1;
    streak = 0;
    selectedType = null;
    playerDisplay.textContent =
        playerName;
    roundDisplay.textContent =
        "01";
    streakDisplay.textContent =
        "00";
    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    await loadQuestions();
});
truthButton.addEventListener("click", () => {
    selectType("truth");
});
dareButton.addEventListener("click", () => {
    selectType("dare");
});
pickButton.addEventListener("click", () => {
    pickQuestion();
});
nextButton.addEventListener("click", () => {
    round++;
    roundDisplay.textContent =
        round
            .toString()
            .padStart(2, "0");
    selectedType = null;
    truthButton.classList.remove("selected");
    dareButton.classList.remove("selected");
    truthButton.disabled = false;
    dareButton.disabled = false;
    pickButton.disabled = true;
    selectedLabel.textContent =
        "CHOOSE TRUTH OR DARE";
    pickHint.textContent =
        "Your fate is waiting...";
    resultCard.classList.add("hidden");
    gameMessage.textContent =
        getRandomItem(nextMessages);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
playerNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startButton.click();
    }
});
