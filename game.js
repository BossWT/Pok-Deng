const Player = require('./player');
const prompt = require('prompt-sync')();

const { ask_continue, dealCard, compareCards } = require('./utility');

let cards_out = [];
let play = true;
const player = new Player(0);
while (play) {
	const dealerHands = [];
	console.log('> Please put your bet');
	const bet = prompt('> ');
	player.bet = parseInt(bet);

	player.dealCards(cards_out);
	console.log(`> You got ${player.hands.join(', ')}`);

	dealerHands.push(dealCard(cards_out));
	dealerHands.push(dealCard(cards_out));
	console.log(`> The dealer got ${dealerHands.join(', ')}`);

	const result = compareCards(player.hands, dealerHands);
	if (result === 'player') {
		console.log(`> You won!!!, received ${player.bet} chips`);
		player.winTurn(bet);
	} else if (result === 'dealer') {
		console.log(`> You lose!!!, loss ${player.bet} chips`);
		player.loseTurn(bet);
	} else console.log(`> Draw!!!`);
	play = ask_continue();
	cards_out = [];
	player.endTurn();
}
