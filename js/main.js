/*----- constants -----*/

/*----- app's state (variables) -----*/
// let deck;
// let dealerHand;
// let playerHand;
// let dealerTotal;
// let playerTotal;
let shuffledDeck = shuffleDeck(deck);
let hands = dealCards(deck)
/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/

function createDeck() {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['H', 'S', 'D', 'C'];
  let deck = [];

  for (let x = 0; x < cards.length; x++) {
    for (let y = 0; y < suits.length; y++) {
      deck.push(`${cards[x]}-${suits[y]}`);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let x = 0; x < deck.length; x++) {
    let randomNum = Math.floor(Math.random() * deck.length);
    let currentCard = deck[x];
    deck[x] = deck[randomNum];
    deck[randomNum] = currentCard;
  }
  console.log(`Shuffled Deck: ${deck}`);
}

//more game variables//
let playerHand = [];
let dealerHand = [];
let deck = shuffleDeck(createDeck());

function dealCards () {
  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());
  update();
}



