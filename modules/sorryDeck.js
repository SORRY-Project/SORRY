/**
 * 
 */
Sorry.Deck = (function() {
	
	//dependencies 
	var Card = Sorry.Card;
	
	//private variable
	var TOTAL_CARDS = 45;

	/**
	 * @constructor 
	 * @return 
	 */
	function Deck() {
		
		var cards = this.cards = [];		
		//deck includes five 1s, but four of all other valid cards
	    //push five 1s into deck
		cards.push(new Card(1),new Card(1), new Card(1), new Card(1), new Card(1));
		
		for(var i = 2; i < 13; i++) {
			for(var j = 0; j < 4; j++) {
				//don't populate deck with 6s
				if(i == 6) {
					break;
				}
				//don't populate card deck with 9s, but use this iteration
			    //to include four `Sorry` cards
			    else if(i == 9) {
			    	cards.push(new Card("Sorry"));
			    }
			    else {
			    	cards.push(new Card(i)); 	
			    }
			}
		}
	}
	
	//public methods 
	/**
	 * 
	 */
	Deck.prototype = {
		/**
		 *Simulates drawing a card from a shuffled deck by selecting a card 
		 *at a randomly computed index in the Deck. Each card which is selected
		 *is then removed from its present position and placed at the end of
		 *the Deck. Following invocations of this method then compute a random
		 *number that lies between index 0 
		 *@return {Sorry.Card} card
		 */
		drawCard : (function() {
			
			var iteration = 0;
				
			return function() {

				var randomDraw = Math.floor(Math.random() * (TOTAL_CARDS - iteration)), 
					card = this.cards[randomDraw];
					
				//removes `drawn` card from current position
				//and pushes to end of deck	
				this.cards.push(this.cards.splice(randomDraw,1)[0]);
					
				iteration = ++iteration % TOTAL_CARDS; 
			
				return card;
			} 

		})()		
	}
	
	return Deck;
	 
})();
