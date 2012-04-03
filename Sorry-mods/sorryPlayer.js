/**
 * 
 */
(function() {
	
	/**
	 * 
	 */
	Sorry.Player = (function() {
		
		//dependencies

		//private variables
		
		//private methods
		/**
		 * @constructor 
		 * @param
		 * @param
		 */
		function Player(name,color) {	
			this.name = name;
			this.color = color; 
			this.pawnLocations = [0,0,0,0]; 
		}
		//one off initializations
		
		//public methods
		Player.prototype = {
			

		}
		
		return Player;
		
	})();

	
	Sorry.Player.Computer = (function() {
		
		/**
		 * @augments Sorry.Player 
		 * @constructor 
		 * @param
		 * @param
		 * @param
		 */
		function Computer(name,color,difficultyLevel) {
			Sorry.Player.call(this,name,color);
			this.difficultyLevel = difficultyLevel;
		}
		
		return Computer;
				
	})();
		
})();
