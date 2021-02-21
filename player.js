const { dealCard } = require('./utility');

class Player {
	constructor() {
		this.hands = [];
		this.total = 0;
	}
	dealCards(cards_out) {
		this.hands.push(dealCard(cards_out));
		this.hands.push(dealCard(cards_out));
	}
	winTurn(winMoney) {
		this.total += winMoney;
		return this.total;
	}
	loseTurn(loseMoney) {
		this.total -= loseMoney;
		return this.total;
	}
	endTurn() {
		this.hands = [];
	}
	showMoney() {
		console.log(`You got total ${this.total} chips`);
	}
}

module.exports = Player;
