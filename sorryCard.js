/**
 * Sorry.Card Module 
 * Contains Card Constructor and a private object literal
 * containing Sorry! card instructions
 */
Sorry.Card = (function() {

	//instructions for each card in Sorry!
	var instructions = {
		one : "Move a pawn from Start, or move pawn one space forward",
		two : "Move a pawn from Start, or move pawn two spaces forward",
		three : "Move a pawn three spaces forward",
		four : "Move a pawn four spaces backwards",
		five : "Move a pawn five spaces forward",
		seven : "Move a pawn seven spaces forward, or split the seven spaces between two pawns",
		eight : "Move a pawn eight spaces forward",
		ten : "Move a pawn ten spaces forward, or 1 space backward",
		eleven : "Move eleven spaces forward, or switch places with one opposing pawn",
		twelve : "Move a pawn twelve spaces forward",
		Sorry : "Move any one pawn from Start to a square occupied by any opponent (sending that pawn back to its own Start)"
	}

	/**
	 * @constructor 
	 * @param value {Integer} || {String} An integer value of [1-10] 
	 * excluding 6 and 9, or the String "Sorry"
	 */
	function Card(value) {

		//Cannot instantiate a card whose value is 6,9, <=0, >11
		//or any String except "Sorry"
		if(value != 6 && value != 9 
		   && ((value < 12 && value > 0) 
		   || value == "Sorry")) {

			this.discarded = false;
			this.value = value;

			switch(value) {
				case 1 :
					this.instruction = instructions.one;
					break;
				case 2 :
					this.instruction = instructions.two;
					break;
				case 3 :
					this.instruction = instructions.three;
					break;
				case 4 :
					this.instruction = instructions.four;
					break;
				case 5 :
					this.instruction = instructions.five;
					break;
				case 7 :
					this.instruction = instructions.seven;
					break;
				case 8 :
					this.instruction = instructions.eight;
					break;
				case 10 :
					this.instruction = instructions.ten;
					break;
				case 11 :
					this.instruction = instructions.eleven;
					break;
				case "Sorry" :
					this.instruction = instructions.Sorry;
					break;
			}
		} 
		else {
			throw "Card Constructor called with Invalid Argument: " + value;
		}
	}

	return Card;

})();
