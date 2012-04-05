
(function() {
	
	/**
	 * 
	 */
	Sorry.Pawn = (function() {
		
		//private variables
		var idCounter = 0;
		
		/**
		 * @param {String} color The color of the pawn (red,green,blue,yellow)
		 */
		function Pawn(color) {			
			this.position = "START";
			//this.absolutePosition = null;
			this.color = color;
			this.ID = ((idCounter++) % 4) + 1;			
		}
		
		Pawn.prototype = {
			/**
			*
			*/
			isValidMove : function(cardValue,squareClicked) {
				
				var valid = false;
				
				if(this.position === "START") {
					if(cardValue === 1 && squareClicked === 1) {
						valid = true;
					}
					else if(cardValue === 2 && squareClicked === 2) {
						valid = true;
					}
					else {
						valid = false;
					}
				}
				if(Math.abs(this.position - squareClicked) <= cardValue) {
					valid =true;
				}
				
				return valid;
			},	
			setPosition : function(position) {
				
				//determine if pawn lands on slide -- if so, adjust position
				if(position === 13 || position === 28 || position === 43) {
					position+=3;
				}
				else if(position === 21 || position === 36 || position === 51) {
					position+=4;
				}
				
				this.position = position;
			},
			/**
			 * "Bumps" an oppopnents pawn back to the
			 * "START" position if the two pawns would
			 * otherwise collide
			 * @param pawn {Pawn} An opponents pawn
			 */
			bump : function(pawn) {
				pawn.setPosition("START");
			},	
			detectCollision : function(pawn) {
				
			}
		}
		
		return Pawn;
				
	})();
	
	//////////////////////////////////////////////////////////
	//MODULE TESTING
	//////////////////////////////////////////////////////////
	var pawn = new Sorry.Pawn("blue"),
		cardValue = 5;
		cardValue = 1;
		cardValue = 2;
		pawn.setPosition(10);
		console.log(pawn.isValidMove(cardValue,12));
		
})(); 
