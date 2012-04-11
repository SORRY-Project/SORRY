(function() {

	/**
	 *
	 */
	Sorry.Pawn = (function() {

		//dependencies
		var Board = Sorry.Board;

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
			validateMove : function(cardValue, squareClicked) {

				var valid = false, 
					position = this.position, 
					forwardDelta = (squareClicked - position) % 60, 
					backwardDelta = (position - squareClicked) % 60,
					//detect collisions
					collisionNotice = this.detectCollision(squareClicked),
					collision = collisionNotice.collision,
					bump = collisionNotice.bump;

				switch(cardValue) {
					
					/* must test to make sure pawn isn't at START */
					
					//case one and two are similar
					//if case 1, execution falls through
					//to case 2
					case 1:
					case 2:
						if(position === "START" && squareClicked === 1) {
							valid = true;
						} else if(position !== "START") {
							if(cardValue === 1 && forwardDelta === 1) {
								valid = true;
							} else if(cardValue === 2 && forwardDelta === 2) {
								valid = true;
							}
						}
						break;
					case 4:
						if(backwardDelta === 4) {
							valid = true;
						}
						break;
					case 7:
						//must check the multimove object
						break;
					case 10:
						if(forwardDelta === 10 || backwardDelta === 1) {
							valid = true;
						}
						break;
					case 11:
						if(forwardDelta === 11 || bump) {
							valid = true;
						}
						break;
					case "SORRY":
						if(position === "START" && bump) {
							valid = true;
						}
						break;
					default:
						//3,5,8,12
						if(forwardDelta === cardValue) {
							valid = true;
						}
				}
				return valid;
			},
			setPosition : function(position) {

				//determine if pawn lands on slide -- if so, adjust position
				if(position === 13 || position === 28 || position === 43) {
					position += 3;
				} else if(position === 21 || position === 36 || position === 51) {
					position += 4;
				}

				this.position = position;
			},
			/**
			 * "Bumps" an opponents pawn back to the
			 * "START" position if the two pawns would
			 * otherwise collide
			 * @param pawn {Pawn} An opponents pawn
			 */
			bump : function(pawn) {
				pawn.setPosition("START");
			},
			/**
			 *@return {Object Literal} 
			 */
			detectCollision : function(square) {
				//get occupiedSquares
				var occupiedSquares = Board.getOccupiedSquares(), 
					collision = false, 
					bump = false,
					pawn;

				for(pawn in occupiedSquares) {
					if(square === occupiedSquares[pawn].position) {
						collision = true;
						if(!(this instanceof occupiedSquares[pawn].occupier)) {
							bump = true;
						}
						break;
					}
				}
				return {
					collision : collision,
					bump : bump,
					occupier : occupiedSquares[pawn].occupier
				}
			}
		}

		return Pawn;

	})();

	//////////////////////////////////////////////////////////
	//MODULE TESTING
	//////////////////////////////////////////////////////////
	/*var pawn = new Sorry.Pawn("blue"),
	cardValue = 5;
	cardValue = 1;
	cardValue = 2;
	pawn.setPosition(10);
	console.log(pawn.validateMove(cardValue,12));*/

})();
