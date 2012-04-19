(function() {

	Sorry.Board = (function() {
		
		//contains a list of occupied squares based on
		//absolute positions rather than color adjusted
		//positions along with a reference to the
		//occupying pawn (stored as object literal pairs {position:,occupier(pawn):})
		//initially empty as we are not concerned about collisions occuring 
		//in the "START" position
		var occupiedSquares = [];
	
		return {
			/**
			 * This method maps a pair of (x,y) coordinates to
			 * absolute square positions on the Sorry! Board
			 * The top left square is position one, and increase 
			 * as one traverses to the right 			 
			 *@param {Integer} x The 'click' events x coordinate
			 *@param {Integer} y The 'click' events y coordinate
			 *@return {Integer} square The squares position
			 */
			mapPixelsToSquare : function(x, y) {

				var square,
					//test to see if pixels correspond to squares in top,bottom,left
					//or right sides
					topRow = (x <= 640 && y <= 40), 
					bottomRow = (x <= 640 && y >= 600), 
					leftSide = (x <= 40 && y <= 600 && y >= 40), 
					rightSide = (x >= 600 && y >= 40);

				//if pixels are in top/bottom row or left/right side
				if(topRow || bottomRow || leftSide || rightSide) {
					if(bottomRow) {
						x = 1280 - x;
						square = Math.ceil(x / 40) + 14;
					} else if(leftSide) {
						y = 1280 - y;
						square = Math.floor(y / 40) + 30;
					} else {
						square = Math.ceil(x / 40) + Math.floor(y / 40);
					}
					return square;
				}
				else {
					return; 
				}
			},
			/**
			 * Adjusts the absolute position of the pawn to a relative position 
			 * based on the pawns START position - the first position out of START
			 * has a value of 1
			 * @param {Integer} square
			 * @param {String} color
			 */
			adjustSquareForPawnColor : function(square,color) {
				
				if(color === "green") {
					if(square < 4) {
						square += 56;
					}
					else {
						square -= 4;
					}
				}
				else if(color === "red") {
					if(square < 19) {
						square += 41;
					}
					else {
						square-=19;
					}
				}
				else if(color === "blue") {
					if(square < 34) {
						square+=26;
					}
					else {											
						square-=34;	
					}
				}
				else if(color === "yellow") {
					if(square < 49) {
						square += 11;
					}
					else {
						square-=49;
					}
				}
				
				square %= 60;
								
				return square;				
			},
			/**
			 * @return 
			 */
			getOccupiedSquares : function() {
				return $.extend([],occupiedSquares);			
			},
			/**
			 * @param {Integer}
			 * @param {Sorry.Pawn} 
			 */
			setOccupiedSquares : function(position,pawn) {
				occupiedSquares.push({position:position,occupier:pawn}); 
			}
		}								
	})();
		
})();

