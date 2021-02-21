const prompt = require('prompt-sync')();

const points = [
	'Ace',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'Jack',
	'Queen',
	'King'
];
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

const duplicated = (card, cards_out) => {
	for (c of cards_out) if (c === card) return true;
	return false;
};

const ask_continue = () => {
	console.log('> Wanna play more (Yes/No)?');
	const ans = prompt('> ');
	if (ans !== 'Yes' && ans !== 'yes' && ans !== 'y' && ans !== 'Y')
		return false;
	return true;
};

const dealCard = (cards_out) => {
	const randPoint = points[Math.floor(Math.random() * points.length)];
	const randSuit = suits[Math.floor(Math.random() * suits.length)];
	const card = randSuit + '-' + randPoint;
	if (!duplicated(card, cards_out)) {
		cards_out.push(card);
		return card;
	}
	return dealCard(cards_out);
};

const compareCards = (playerHands, dealerHands) => {
	let playerPoints = 0;
	let dealerPoints = 0;
	playerHands.forEach((card) => {
		const point = card.split('-')[1];
		if (point === 'Ace') playerPoints += 1;
		else if (point !== 'Jack' && point !== 'Queen' && point !== 'King')
			playerPoints += parseInt(point);
	});
	dealerHands.forEach((card) => {
		const point = card.split('-')[1];
		if (point === 'Ace') dealerPoints += 1;
		else if (point !== 'Jack' && point !== 'Queen' && point !== 'King')
			dealerPoints += parseInt(point);
	});

	if (playerPoints >= 10) playerPoints -= 10;
	if (dealerPoints >= 10) dealerPoints -= 10;
	// console.log(playerPoints);
	// console.log(dealerPoints);

	if (playerPoints > dealerPoints) return 'player';
	else if (playerPoints < dealerPoints) return 'dealer';
	else return 'draw';
};

module.exports = { duplicated, ask_continue, dealCard, compareCards };
