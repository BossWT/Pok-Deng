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

const ask_question = (question) => {
	console.log(question);
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

const convertCard = (point) => {
	if (point === 'Ace') return 1;
	else if (point !== 'Jack' && point !== 'Queen' && point !== 'King')
		return parseInt(point);
	else return 0;
};

const compareCards = (playerHands, dealerHands) => {
	let playerPoints = 0;
	let dealerPoints = 0;
	let playerCard1 = playerHands[0];
	let playerCard2 = playerHands[1];
	let playerCard3 = '';
	let playerPoint1 = convertCard(playerCard1.split('-')[1]);
	let playerPoint2 = convertCard(playerCard2.split('-')[1]);
	let playerPoint3 = 0;
	if (playerHands.length === 3) {
		playerCard3 = playerHands[2];
		playerPoint3 = convertCard(playerCard3.split('-')[1]);
	}

	let dealerCard1 = dealerHands[0];
	let dealerCard2 = dealerHands[1];
	let dealerPoint1 = convertCard(dealerCard1.split('-')[1]);
	let dealerPoint2 = convertCard(dealerCard2.split('-')[1]);

	playerPoints = playerPoint1 + playerPoint2 + playerPoint3;
	dealerPoints = dealerPoint1 + dealerPoint2;

	if (playerPoints >= 10) playerPoints -= 10;
	if (dealerPoints >= 10) dealerPoints -= 10;
	console.log(playerPoints);
	console.log(dealerPoints);

	if (playerPoints > dealerPoints) return 'player';
	else if (playerPoints < dealerPoints) return 'dealer';
	else return 'draw';
};

module.exports = {
	duplicated,
	ask_question,
	ask_continue,
	dealCard,
	compareCards
};
