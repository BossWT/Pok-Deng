const { dealCard } = require('./utility');

class Player {
	constructor(bet) {
		this.bet = bet;
		this.hands = [];
		this.total = bet;
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
}

module.exports = Player;
