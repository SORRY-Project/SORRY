
(function() {
	
	/**
	 * 
	 */
	Sorry.Player = (function() {
		
		//dependencies
		var Pawn = Sorry.Pawn;
		
		//private methods
		/**
		 * @param {String} name
		 * @param {String} color
		 */
		function Player(name,color) {
			this.name = name;
			this.color = color;
			this.pawns = {
				"one" : new Pawn(color),
				"two" : new Pawn(color),
				"three" : new Pawn(color),
				"four" : new Pawn(color)				
			}			
		}
		
		/**
		 * 
		 */
		Player.prototype = {
			
			/**
			 * @param {String} ID
			 * @param {Integer || String} position 
			 */
			movePawn : function(ID,position) {				
				var ID = ID.subString(1).toLowerCase();
				this.pawns[ID].setPosition(ID,position);				
			}
		};
		
		return Player;
		
	})();
	
	/**
	 * 
	 */
	Sorry.Player.Computer = (function() {
		
		/**
		 * @param {String} color
		 * @param {String} difficultyLevel
		 */
		function Computer(color,difficultyLevel) {
			Sorry.Player.call(this,"Computer",color);
			this.difficultyLevel = difficultyLevel;
		}
		
		return Computer;
		
	})();
	
})();
