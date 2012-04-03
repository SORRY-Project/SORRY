/**
 *@author Jeffrey R. Hudzik
 */

Sorry.Core = (function() {
	
	var Deck = Sorry.Deck;	
	
	//private variables
	var user,
		computer,
		numTurns,
		usersTurn,
		gameOver,
		/**
		 *@param
		 *@param
		 */
		arrays_equal = function(arrOne,arrTwo) {
			return !!arrOne && !!arrTwo && !(a < b || b < a);
		}; 
	
	//public methods
	return {
		
		instantiateDeck: function(){
			this.deck = new Deck();
		},
		/**
		 * 
		 */
		startGame : function(players) {
			
			//define players
			user = players[0];
			computer = players[1]; 
			
			//create card deck
			this.instantiateDeck();
			
			//initialize 
			usersTurn = true; 
			numTurns = 0;
			
			
		},
		/**
		 * 
		 */
		endGame : function() {
			
			var END_LOCATION = [65,65,65,65];
			
			if(arrays_equal(user.pawnLocation,END_LOCATION) 
				|| array_equals(computer.pawnLocation,END_LOCATION))
			{
				gameOver = true;	
			}
			
			return gameOver;
		},
		mainGame : function() {
			
			while(!this.endGame()) {
				
			}
			usersTurn = (++numTurns)%2; 
			
			
		},
		takeTurn : function() {
			numTurns++;
		}
	}
})();
