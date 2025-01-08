const gameContainer = document.getElementById("game");
let activeCards = []

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

// Fisher Yates algorithm to shuffle cards
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  console.log("you just clicked", event.target);
  let cardColor = event.target.className
  event.target.style.backgroundColor = cardColor;
  activeCards.push(event.target);

  if (activeCards.length == 2) {
    let [card1, card2] = activeCards;
    setTimeout(function() {
        if (card1.style.backgroundColor !== card2.style.backgroundColor){
          card1.style.backgroundColor = card2.style.backgroundColor = "white";
        }
        activeCards = []
      }
    , 750)
  }

  
}

// when the DOM loads
createDivsForColors(shuffledColors);

