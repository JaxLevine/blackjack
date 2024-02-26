/*----- constants -----*/


/*----- app's state (variables) -----*/
let deck;

let dealerHand;
let playerHand;
let dealerTotal;
let playerTotal;


/*----- cached element references -----*/



/*----- event listeners -----*/


/*----- functions -----*/

function createDeck() {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['H', 'S', 'D', 'C'];
  let deck = [];
  
  for (let x = 0; x < cards.length; x++) {
    for (let y = 0; y < suits.length; y++) {
      deck.push(`${cards[x]} of ${suits[y]}`);
    }
  }
  return deck;
}

console.log(createDeck())

function shuffleDeck() {
  
}