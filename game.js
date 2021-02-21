const Player = require('./player');
const prompt = require('prompt-sync')();

const {
	ask_question,
	ask_continue,
	dealCard,
	compareCards
} = require('./utility');

let cards_out = [];
let play = true;
const player = new Player();
while (play) {
	const dealerHands = [];
	console.log('> Please put your bet');
	const bet = parseInt(prompt('> '));

	player.dealCards(cards_out);
	console.log(`> You got ${player.hands.join(', ')}`);
	const drawMore = ask_question(
		'Would you like to get 1 more card?(Yes/No)?'
	);
	if (drawMore) player.hands.push(dealCard(cards_out));
	console.log(`> You got ${player.hands.join(', ')}`);
	dealerHands.push(dealCard(cards_out));
	dealerHands.push(dealCard(cards_out));
	console.log(`> The dealer got ${dealerHands.join(', ')}`);

	const result = compareCards(player.hands, dealerHands);
	if (result === 'player') {
		console.log(`> You won!!!, received ${bet} chips`);
		player.winTurn(bet);
	} else if (result === 'dealer') {
		console.log(`> You lose!!!, loss ${bet} chips`);
		player.loseTurn(bet);
	} else console.log(`> Draw!!!`);
	play = ask_question('> Wanna play more (Yes/No)?');
	cards_out = [];
	player.endTurn();
}
player.showMoney();
