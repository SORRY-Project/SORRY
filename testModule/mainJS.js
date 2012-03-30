/**
 * Master File which contains all modules for Sorry namespace,
 * and is to be minified via Closure Compiler
 * Contains the following modules
 * Sorry.Card
 * Sorry.Deck
 * Sorry.Pawn
 * Sorry.Player
 */
(function(w, d, $) {

	//enforce ECMAScript 5 Specs
	"use strict";

	//namespace
	var Sorry = {};

	//add modules

	/**
	 * Sorry.Card Module
	 * @return Card Constructor
	 */
	Sorry.Card = (function() {

		//instructions for each card in Sorry!
		var instructions = {
			one : "Move a pawn from Start, or move pawn one space forward",
			two : "Move a pawn from Start, or move pawn two spaces forward",
			three : "Move a pawn three spaces forward",
			four : "Move a pawn four spaces backwards",
			five : "Move a pawn five spaces forward",
			seven : "Move a pawn seven spaces forward, or split the seven spaces between two pawns",
			eight : "Move a pawn eight spaces forward",
			ten : "Move a pawn ten spaces forward, or 1 space backward",
			eleven : "Move eleven spaces forward, or switch places with one opposing pawn",
			twelve : "Move a pawn twelve spaces forward",
			Sorry : "Move any one pawn from Start to a square occupied by any opponent (sending that pawn back to its own Start)"
		}

		/**
		 * @constructor
		 * @param value {Integer} || {String} An integer value of [1-11]
		 * excluding 6 and 9, or the String "Sorry"
		 */
		function Card(value) {

			//Cannot instantiate a card whose value is 6,9, <=0, >11
			//or any String except "Sorry"
			if(value != 6 && value != 9 && ((value < 13 && value > 0) || value == "Sorry")) {

				this.value = value;

				switch(value) {
					case 1 :
						this.instruction = instructions.one;
						break;
					case 2 :
						this.instruction = instructions.two;
						break;
					case 3 :
						this.instruction = instructions.three;
						break;
					case 4 :
						this.instruction = instructions.four;
						break;
					case 5 :
						this.instruction = instructions.five;
						break;
					case 7 :
						this.instruction = instructions.seven;
						break;
					case 8 :
						this.instruction = instructions.eight;
						break;
					case 10 :
						this.instruction = instructions.ten;
						break;
					case 11 :
						this.instruction = instructions.eleven;
						break;
					case 12 :
						this.intruction = instructions.twelve;
						break;
					case "Sorry" :
						this.instruction = instructions.Sorry;
						break;
				}
			} else {
				throw "Card Constructor called with Invalid Argument: " + value;
			}
		}


		Card.prototype = (function() {

			return {
				getValue : function() {
					return this.value;
				},
				getInstruction : function() {
					return this.instruction;
				}
			}

		})();

		return Card;

	})();

	/**
	 *
	 */
	Sorry.Deck = (function() {

		//dependencies
		var Card = Sorry.Card;

		//private variable
		var TOTAL_CARDS = 45;

		/**
		 * @constructor
		 * @return
		 */
		function Deck() {

			var cards = this.cards = [];
			//deck includes five 1s, but four of all other valid cards
			//push five 1s into deck
			cards.push(new Card(1), new Card(1), new Card(1), new Card(1), new Card(1));

			for(var i = 2; i < 13; i++) {
				for(var j = 0; j < 4; j++) {
					//don't populate deck with 6s
					if(i == 6) {
						break;
					}
					//don't populate card deck with 9s, but use this iteration
					//to include four `Sorry` cards
					else if(i == 9) {
						cards.push(new Card("Sorry"));
					} else {
						cards.push(new Card(i));
					}
				}
			}
		}

		//public methods
		/**
		 *
		 */
		Deck.prototype = {
			/**
			 *Simulates drawing a card from a shuffled deck by selecting a card
			 *at a randomly computed index in the Deck. Each card which is selected
			 *is then removed from its present position and placed at the end of
			 *the Deck. Following invocations of this method then compute a random
			 *number that lies between index 0
			 *@return {Sorry.Card} card
			 */
			drawCard : (function() {

				var iteration = 0;

				return function() {

					var randomDraw = Math.floor(Math.random() * (TOTAL_CARDS - iteration)), card = this.cards[randomDraw];

					//removes `drawn` card from current position
					//and pushes to end of deck
					this.cards.push(this.cards.splice(randomDraw,1)[0]);
					iteration = ++iteration % TOTAL_CARDS;

					return card;
				}
			})()
		}

		return Deck;

	})(); (function() {

		/**
		 *
		 */
		Sorry.Pawn = (function() {

			//private variables
			var idCounter = 0;

			/**
			 * @param {String} color
			 */
			function Pawn(color) {
				this.position = 0;
				this.color = color;
				this.ID = ((idCounter++) % 4) + 1;
			}

			/**
			 * 
			 */
			Pawn.prototype = {

				setPosition : function(position) {
					this.position = position;
				}
			}

			return Pawn;

		})();

	})(); (function() {

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
			function Player(name, color) {
				this.name = name;
				this.color = color;
				this.pawns = {
					"one" : new Pawn(color),
					"two" : new Pawn(color),
					"three" : new Pawn(color),
					"four" : new Pawn(color)
				}
			}


			Player.prototype = {

				/**
				 *
				 */
				movePawn : function(ID, position) {
					var ID = ID.substring(1).toLowerCase();
					this.pawns[ID].setPosition(position);
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
			function Computer(color, difficultyLevel) {
				Sorry.Player.call(this, "Computer", color);
				this.difficultyLevel = difficultyLevel;
			}


			Computer.prototype = {

			}

			return Computer;

		})();

	})();
	
	

	//expose Sorry namespace to global (window) object
	w.Sorry = Sorry;

	//begin game initialization

	var c = w.console;

	//game initialize
	var player = new Sorry.Player("Jeff", "Blue"), computer = new Sorry.Player.Computer("Red", "Easy");

	c.log(player);
	c.log(computer);

	var deck = new Sorry.Deck();

	c.log(deck);

	player.movePawn("bTwo", 4);
	c.log(player);

})(window, document, jQuery);
