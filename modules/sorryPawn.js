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
			this.color = color;
			//this.ID = ((idCounter++) % 4) + 1;
		}


		Pawn.prototype = {
			/**
			 *
			 */
			validateMove : function(cardValue, squareClicked, remainingMultiMoves) {

				var availMultiMoves,
					valid = false, 
					position = this.position, 
					atStart = (this.position === "START"),
					forwardDelta = (squareClicked - position) % 60, 
					backwardDelta = (position - squareClicked) % 60,
					//detect collisions
					collisionNotice = this.detectCollision(squareClicked),
					collision = collisionNotice.collision,
					bump = collisionNotice.bump;

				if(arguments.length === 3) {
					availMultiMoves = remainingMultiMoves;
				}

				switch(cardValue) {
										
					//case one and two are similar
					//if case 1, execution falls through
					//to case 2
					case 1:
					case 2:
						if(atStart && squareClicked === 1) {
							valid = true;
						} else if(!atStart) {
							if(cardValue === 1 && forwardDelta === 1) {
								valid = true;
							} else if(cardValue === 2 && forwardDelta === 2) {
								valid = true;
							}
						}
						break;
					case 4:
						if(backwardDelta === 4 && !atStart) {
							valid = true;
						}
						break;
					case 7:
						//must check the multimove object
						if((forwardDelta <= availMultiMoves) || (backwardDelta <= availMultiMoves) && !atStart) {
							valid = true;

						}
						break;
					case 10:
						if((forwardDelta === 10 || backwardDelta === 1) && !atStart) {
							valid = true;
						}
						break;
					case 11:
						if((forwardDelta === 11 || bump) && !atStart) {
							valid = true;
						}
						break;
					case "SORRY":
						if(atStart && bump) {
							valid = true;
						}
						break;
					default:
						//3,5,8,12
						if((forwardDelta === cardValue) && !atStart) {
							valid = true;
						}
				}
				
				//if a multiMove is in play return validity of attempted
				//move along with the magnitude of the pawns position change
				//to update the number of remaining moves in multiMove
				if(availMultiMoves) {					
					return {validMove : valid,
							pawnDelta : Math.abs(forwardDelta)
					}
				}
				else {
					return valid;
				}
				
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
					bump : bump
					/*occupier : occupiedSquares[pawn].occupier*/
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
