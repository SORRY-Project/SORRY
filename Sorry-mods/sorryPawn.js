/**
 * 
 */
(function() {
	
	/**
	 * 
	 */
	Sorry.Pawn = (function() {
		
		//private variables
		var START_POSITION = 0,
			//represents the position of Home 
			//on Sorry! board for each pawn color
			BLUE_HOME = 0,
			GREEN_HOME = 25,
			RED_HOME = 45,
			YELLOW_HOME = 80;
	
			idCounter = 0;
		
		//private methods
		function Pawn(color) {
			
			this.position = START_POSITION; 
			this.color = color;	
			this.id = (idCounter++) % 4;
			
			switch(color) {
				case "blue" : 
					this.home = BLUE_HOME;
					break;
				case "green" :
					this.home = GREEN_HOME;
					break;
				case "red" :
					this.home = RED_HOME;
					break;
				case "yellow" :
					this.home = YELLOW_HOME;
					break;				
			}
		}
		
		//public methods and properties
		Pawn.prototype = {
			active : false,
			/**
			 * @param displacement
			 */
			movePawn : function(displacement) {
				if(displacement === "Sorry") {
					//get location of challengers pawns
					//bump challengers pawn back
					//to its own start
				}
				else {
					
				}
			}
		}
				
		return Pawn; 
		
	})();
		
})();
