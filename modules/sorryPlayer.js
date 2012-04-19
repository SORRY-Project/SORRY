// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==


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
			
			//private members
			var pawns = {
				"1" : new Pawn(color),
				"2" : new Pawn(color),
				"3" : new Pawn(color),
				"4" : new Pawn(color)			
			};
			
			//declare ownership of pawns
			for(var pawn in pawns) {
				pawns[pawn].owner = this;
			}
			
			this.name = name;
			this.getPawns = function() {
				return $.extend({},pawns);
			};
			this.multiMove = {
				inProgress : false,
				remainingMoves : 0,
				initialize : function() {
					this.inProgress = true;
					this.remainingMoves = 7;
				},
				setMoveCount : function(delta) {
					this.remainingMoves -= delta;
					if(this.remainingMoves === 0) {
						this.inProgress = false;
					}
				}
			}			
		}
		
		/**
		 * 
		 */
		Player.prototype = {
			
			/**
			 * 
			 */
			getName : function() {
				return this.name;
			},
			/**
			 * 
			 */
			getColor : function() {
				return this.getPawns()["1"].color;
			},
			/**
			 * 
			 */
			getRemainingMoves : function() {
				return this.multiMove.remainingMoves;
			},
			/**
			 * 
			 */
			setRemainingMoves : function(delta) {
				this.multiMove.setMoveCount(delta)
			},
			/**
			 * 
			 */
			hasRemainingMoves : function() {
				return this.multiMove.inProgress;
			},
			/**
			 * 
			 */
			initializeMultiMove : function() { 
				this.multiMove.initialize();
			},						
			/**
			 * @param {String} ID
			 * @param {Integer || String} position 
			 */
			movePawn : function(pawn,position) {				
				pawn.setPosition(position);
			},
			/**
			 * 
			 */
			isWinner : function() {
				  
				  var pawns = this.getPawns();				  
				  
				  for(var pawn in pawns) {
				  	if(pawns[pawn].position !== "HOME") {
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
