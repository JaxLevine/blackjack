//----- constants ----- //
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['H', 'S', 'D', 'C'];

//----- app's state (variables) ----- //
let completeDeck = createDeck(); // Full and proper deck
let shuffledDeck = shuffleDeck(completeDeck); // Full deck shuffled
let dealtHands = dealCards(); // Hands for player and dealer (that have been dealt)
let playerHand = dealtHands.playerHand; // Global player hand
let dealerHand = dealtHands.dealerHand; // Global dealer hand

//----- cached element references ----- //
let dealerFaceUpCard = document.querySelector('#faceUp');
let dealerFaceDown = document.querySelector('#faceDown');
let playerCardOne = document.querySelector('#playerCardOne');
let playerCardTwo = document.querySelector('#playerCardTwo');
let hitAction = document.querySelector('#hitButton');
let standAction = document.querySelector('#stayButton');

//----- event listeners ----- //
hitAction.addEventListener('click', playerHits);
standAction.addEventListener('click', playerStands);


//--------------------------- Create Deck -----------------------------//

// Create // 
function createDeck() {
  let completeDeck = [];
  for (let x = 0; x < cards.length; x++) {
    for (let y = 0; y < suits.length; y++) {
      completeDeck.push(`${cards[x]}-${suits[y]}`);
    }
  }
  return completeDeck;
}

//--------------------------- Shuffle Deck -----------------------------//

// Shuffle //
function shuffleDeck(completeDeck) {
  for (let x = 0; x < completeDeck.length; x++) {
    let randomNum = Math.floor(Math.random() * completeDeck.length);
    let currentCard = completeDeck[x];
    completeDeck[x] = completeDeck[randomNum];
    completeDeck[randomNum] = currentCard;
  }
  console.log(`Shuffled Deck: ${completeDeck}`);
  return completeDeck;
}

//-------------------------- Deal and Display Cards ---------------------------//

// Deal //
function dealCards() {
  let playerHand = [shuffledDeck.pop(), shuffledDeck.pop()];
  let dealerHand = [shuffledDeck.pop(), shuffledDeck.pop()];
  return {playerHand, dealerHand};
}

// Display //
function displayCards(playerHand, dealerHand, dontRevealDealer = false) {
  console.log(`Dealer's Hand: ${dealerHand[0]}, [hidden]`);
  console.log(`Player's Hand: ${playerHand[0]}, ${playerHand[1]}`);
  dealerFaceUpCard.src = `./cards/${dealerHand[1]}.png`;
  if (!dontRevealDealer) {
    dealerFaceDown.src = `./cards/BACK.png`;
  }
  playerCardOne.src = `./cards/${playerHand[0]}.png`;
  playerCardTwo.src = `./cards/${playerHand[1]}.png`;
} 

//--------------------------- Player Action -----------------------------//

// Hit //
function playerHits() {
  let newCard = shuffledDeck.pop(); // Gets the new card from the deck
  playerHand.push(newCard); // Adds new card to player's hand
  //  create new <img> element for the new card and append it
  const newCardPng = document.createElement('img');
  newCardPng.src = `./cards/${newCard}.png`; // Set the source of the new card image
  newCardPng.style.height = '275px';
  newCardPng.style.margin = '4px';
  document.querySelector('.player-cards').appendChild(newCardPng); // Appends as a child to player cards class
  
  if (calculateScore(playerHand) > 21) {   // See if player busted after the hit
    console.log('Sorry Brother, You Busted.');
  }
}

// Stand //
function playerStands() {
  dealerMove();
}

//--------------------------- Dealer Action -----------------------------//

//Dealer Move
function dealerMove() {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(shuffledDeck.pop());
  }
  dealerFaceDown.src = `./cards/${dealerHand[0]}.png`; //reveals facdown card now
  checkForWinner();
}

//--------------------------- Calculations -----------------------------//

// Calculate Scores //
function calculateScore(hand) {
  let score = 0;
  let aces = 0;

  hand.forEach(function (card) {
    let cardValue = card.split('-')[0];
    if (cardValue === 'A') {
      aces += 1;
      score += 11;
    } else if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
      score += 10;
    } else {
      score += parseInt(cardValue, 10);
    }
  });

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

//--------------------------- Determining Winner -----------------------------//

// Checking Winner //
function checkForWinner() {
  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);

  if (playerScore > 21) {
    console.log('You Busted.');
  } else if (dealerScore > 21) {
    console.log('Dealer Busts. You Win!');
  } else if (playerScore > dealerScore) {
    console.log('You Win!');
  } else if (playerScore < dealerScore) {
    console.log('You Lose!');
  } else {
    console.log('Push.');
  }
}

//--------------------------- Initialize Game -----------------------------//

// Start Game //
function init() {
  displayCards(playerHand, dealerHand);
}

init();
