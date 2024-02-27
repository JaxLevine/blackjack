/*----- constants -----*/

/*----- app's state (variables) -----*/
let completeDeck = createDeck(); // Full and proper deck
let shuffledDeck = shuffleDeck(completeDeck); // Full deck shuffled
let dealtHands = dealCards() //Hands for player and dealer (that have been dealt)

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/



//Create the deck//
function createDeck() {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['H', 'S', 'D', 'C'];
  let completeDeck = [];

  for (let x = 0; x < cards.length; x++) {
    for (let y = 0; y < suits.length; y++) {
      completeDeck.push(`${cards[x]}-${suits[y]}`);
    }
  }
  return completeDeck;
}



//Shuffle the deck (let shuffledDeck)//
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



//Dealing cards (let dealtCards)//
function dealCards() {
  let playerHand = [completeDeck.pop(), completeDeck.pop()];
  let dealerHand = [completeDeck.pop(), completeDeck.pop()];
  return { playerHand, dealerHand };
}



//Displaying cards//
function displayCards(playerHand, dealerHand) {
  console.log(`Dealer's Hand: ${dealerHand[0]}, [hidden]`)
  console.log(`Player's Hand: ${playerHand[0]}, ${playerHand[1]}]`)
} displayCards(dealtHands.playerHand, dealtHands.dealerHand);



//Calculate player's score//
function calculatePlayerScore(playerHand) {
  let score = 0;
  let aces = 0;

  for (let x = 0; x < playerHand.length; x++) {
    let card = playerHand[x];
    let cardValue = card.split('-')[0];
    if (cardValue === 'A') {
      aces += 1;
      score += 11;
    } else if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
      score += 10;
    } else {
      score += parseInt(cardValue, 10);
    }
  }
}



//Calculate dealer's score//
function calculateDealerScore(dealerHand) {
  let score = 0;
  let aces = 0;

  for (let x = 0; x < dealerHand.length; x++) {
    let card = dealerHand[x];
    let cardValue = card.split('-')[0];
    if (cardValue === 'A') {
      aces += 1;
      score += 11;
    } else if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
      score += 10;
    } else {
      score += parseInt(cardValue, 10);
    }
  }
  return score;
}



//Aces caveat//
function adjustScoreForAces() {
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }
  return score;
}




















