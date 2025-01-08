// App.js

// Constants and Configuration
const gameContainer = document.getElementById("game");
localStorage.setItem("lowestGuesses", Infinity);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// Utility Functions

// Fisher-Yates algorithm to shuffle cards
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    [array[counter], array[index]] = [array[index], array[counter]];
  }
  return array;
}

// Reset game state
function resetGame() {
  gameContainer.innerHTML = "";
  activeCards = [];
  pairsFound = 0;
  guesses = 0;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  addScoreCounter();
}

// Add replay button
function addReplayButton() {
  const replayButton = document.createElement("button");
  replayButton.innerText = "Play Again!";
  replayButton.addEventListener("click", () => {
    replayButton.remove();
    resetGame();
  });
  document.body.appendChild(replayButton);
}

// Game Logic

let activeCards = [];
let clickLock = false;
let pairsFound = 0;
let guesses = 0;

// Handle matching logic
function handleMatch(card1, card2) {
  pairsFound++;
  activeCards = [];
  console.log(`Pairs Found: ${pairsFound}`);

  if (pairsFound === COLORS.length / 2) {
    console.log("You win!");
    addReplayButton();
    console.log()
    localStorage.setItem('lowestGuesses', Math.min(localStorage.getItem('lowestGuesses'),guesses));
  }
}

// Handle mismatch logic
function handleMismatch(card1, card2) {
  clickLock = true;
  setTimeout(() => {
    card1.style.backgroundColor = card2.style.backgroundColor = "white";
    activeCards = [];
    clickLock = false;
  }, 750);
}

// Handle card click
function handleCardClick(event) {
  const currCard = event.target;
  if (clickLock || activeCards.includes(currCard)) return;

  const cardColor = currCard.className;
  currCard.style.backgroundColor = cardColor;
  activeCards.push(currCard);

  if (activeCards.length === 2) {
    guesses++;
    document.querySelector('.guess-counter').innerText = `Current Guesses: ${guesses}`;
    const [card1, card2] = activeCards;
    if (card1.style.backgroundColor === card2.style.backgroundColor) {
      handleMatch(card1, card2);
    } else {
      handleMismatch(card1, card2);
    }
  }
}

// DOM Manipulation

function createDivsForColors(colorArray) {
  colorArray.forEach(color => {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  });
}

function addScoreCounter() {
  const guessCounter = document.createElement("p");
  guessCounter.classList.add('guess-counter')
  guessCounter.innerText = `Current Guesses: ${guesses}`;
  gameContainer.appendChild(guessCounter);
}

// Game Initialization

function initializeGame() {
  const startButton = document.querySelector("#startButton");
  startButton.addEventListener("click", () => {
    startButton.remove();
    resetGame();
  });
}

// Start the game on DOM load
let shuffledColors = shuffle(COLORS);
initializeGame();