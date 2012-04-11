
(function() {
	
	/**
	 * 
	 */
	Sorry.Player = (function() {
		
		//dependencies
		var Pawn = Sorry.Pawn;
		
		/**
		 * @constructor 
		 * @param {String} name
		 * @param {String} color
		 */
		function Player(name,color) {
			this.name = name;
			this.pawns = {
				"1" : new Pawn(color),
				"2" : new Pawn(color),
				"3" : new Pawn(color),
				"4" : new Pawn(color)				
			}			
		}
		
		/**
		 * 
		 */
		Player.prototype = {
			
			multiMove : {
				availableMoves : null
			},
			/**
			 * 
			 */
			getName : function() {
				return this.name;
			},
			getColor : function() {
				return this.color;
			},
			getPawns : function() {
				return this.pawns;
			},
			/**
			 * @param {String} ID
			 * @param {Integer || String} position 
			 */
			movePawn : function(ID,position) {				
				//var ID = ID.substring(1).toLowerCase();
				this.pawns[ID].setPosition(position);
			},
			isWinner : function() {

				  for(var pawn in this.pawns) {
				  	if(this.pawns[pawn].position !== "HOME") {
				  		return false;
				  	}
				  }
				  
				  return true;				  				  	  				   
			}
		};
		
		return Player;
		
	})();
	
	/**
	 * 
	 */
	Sorry.Player.Computer = (function() {
		
		/**
		 * @param {String} color The color assigned to the computer's pawns
		 * @param {String} difficultyLevel (easy||difficult) 
		 */
		function Computer(color,difficultyLevel) {
			Sorry.Player.call(this,"Computer",color);
			this.difficultyLevel = difficultyLevel;
		}
		
		Computer.prototype = Sorry.Player.prototype;
		
		return Computer;
		
	})();
	
	////////////////////////////////////////
	//Testing Module
	////////////////////////////////////////
	/*var c = window.console;
	var playerOne = new Sorry.Player("Jeff","Red");
	c.log(playerOne.isWinner());
	playerOne.movePawn("rOne","HOME");
	c.log(playerOne.isWinner());
	playerOne.movePawn("rTwo","HOME");
	playerOne.movePawn("rThree","HOME");
	c.log(playerOne.isWinner());
	playerOne.movePawn("rFour","HOME");
	c.log(playerOne.isWinner());*/
	
	
})();
