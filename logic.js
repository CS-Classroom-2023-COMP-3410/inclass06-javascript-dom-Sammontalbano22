// Initialize Deck
let ShuffledDeck = createdeck();
let finalDeck = ShuffledDeck[0];
let cardBack = ShuffledDeck[1];
let pairs = [];
let matched = [];
let score = 0;
let strikes = 0;
const maxStrikes = 8;
const totalPairs = finalDeck.length / 2;

// Helper to reset unmatched cards
function resetUnmatchedCards() {
  pairs.forEach((idx) => {
    document.querySelector("#card-" + idx).innerHTML = cardBack;
  });
  pairs = [];
}

// DeckCreating Function
const createdeck = function () {
  const randIndex = function (lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
  };
  let allCards = [
    "&#127136;",
    "&#127137;",
    "&#127138;",
    "&#127139;",
    "&#127140;",
    "&#127141;",
    "&#127142;",
    "&#127143;",
    "&#127144;",
    "&#127145;",
    "&#127146;",
    "&#127147;",
    "&#127148;",
    "&#127149;",
    "&#127150;",
    "&#127153;",
    "&#127154;",
    "&#127155;",
    "&#127156;",
    "&#127157;",
    "&#127158;",
    "&#127159;",
    "&#127160;",
    "&#127161;",
    "&#127162;",
    "&#127163;",
    "&#127164;",
    "&#127165;",
    "&#127166;",
    "&#127167;",
    "&#127169;",
    "&#127170;",
    "&#127171;",
    "&#127172;",
    "&#127173;",
    "&#127174;",
    "&#127175;",
    "&#127176;",
    "&#127177;",
    "&#127178;",
    "&#127179;",
    "&#127180;",
    "&#127181;",
    "&#127182;",
    "&#127183;",
    "&#127185;",
    "&#127186;",
    "&#127187;",
    "&#127188;",
    "&#127189;",
    "&#127190;",
    "&#127191;",
    "&#127192;",
    "&#127193;",
    "&#127194;",
    "&#127195;",
    "&#127196;",
    "&#127197;",
    "&#127198;",
    "&#127199;",
  ];

  let cardBack = allCards[0];
  allCards.shift();

  // Select 8 random cards
  let finalDeck = [];
  for (let i = 0; i < 8; i++) {
    let lastIndex = allCards.length - 1;
    let r = randIndex(lastIndex);
    finalDeck.push(allCards[r]);
    allCards.splice(r, 1);
  }
  // Duplicate the selected cards to create pairs
  finalDeck = finalDeck.concat(finalDeck);
  return [finalDeck, cardBack];
};

// Handle card click
function handleClick(event) {
  if (pairs.length === 2 || matched.includes(event.target.id)) return;

  //pull the caerd index from id.
  let cardIdx = event.target.id.slice(5);
  event.target.innerHTML = finalDeck[cardIdx];
  //see faced up
  pairs.push(cardIdx);

  if (pairs.length === 2) {
    if (finalDeck[pairs[0]] === finalDeck[pairs[1]]) {
      // Match found

      // Adding id of matched cards to matched array.
      matched.push("card-" + pairs[0], "card-" + pairs[1]);
      score++;
      // Disable further clicks on matched cards
      document.querySelector("#card-" + pairs[0]).onclick = null;
      document.querySelector("#card-" + pairs[1]).onclick = null;
      pairs = [];
      if (score === totalPairs) {
        alert("You win!");
      }
    } else {
      // Feature tracks how many wrong attempts the player has made and ends game if it goes over threshold.
      strikes++;
      setTimeout(resetUnmatchedCards, 1000);

      //
      if (strikes >= maxStrikes) {
        alert("Game over!");
        for (let i = 0; i < finalDeck.length; i++) {
          document.querySelector("#card-" + i).onclick = null;
        }
      }
    }
  }
}

// GAME LOOP
function gameLoop() {
  //Sets board

  for (let i = 0; i < finalDeck.length; i++) {
    let card = document.querySelector("#card-" + i);
    card.innerHTML = cardBack;
    card.onclick = handleClick;
  }
  pairs = [];
  matched = [];
  score = 0;
  strikes = 0;
}

// MAIN
function main() {
  gameLoop();
}

main();
