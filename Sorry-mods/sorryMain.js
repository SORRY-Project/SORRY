/**
 *
 */

(function() {

	//dependencies
	var Player = Sorry.Player,
		Deck = Sorry.Deck;
	
	Sorry.Initialize = (function() {

		return {
			
			readUserInput : function() {
				var name = $("#name").val(), 
					color = $("#color").val(), 
					difficultyLevel = $("[name='diffLevel']").val();

				return {
					name : name,
					color : color,
					difficultyLevel : difficultyLevel
				}
			},
			/**
			 * @param 
			 * @return {}
			 */
			createPlayers : function(playerSettings) {
			//select random color not chosen by 
			//player for computer
				var colors = ["red", "green", "blue", "yellow"], 
					computerColor,
					humnanPlayer,
					compPlayer; 

				colors.splice(colors.indexOf(playerSettings.color.toLowerCase()), 1);
				computerColor = colors[Math.floor(Math.random() * 3)];

				humanPlayer = new Player(playerSettings.name, playerSettings.color);
				compPlayer = new Player.Computer("Computer", computerColor, playerSettings.difficultyLevel);
				
				return [humanPlayer,compPlayer]; 
			}
			
		}	
						
	})(); //end of Sorry.Iniitialize Module
	
	//////////////////////////////////////////////////
	//Begin Main Execution 
	/////////////////////////////////////////////////
	var core = Sorry.Core; 
	
	var settings,
		players,
		user,
		computer,
		//instantiate Deck -- not DOM dependant 
		deck = new Deck();
	
	$(document).ready(function() {
			
		//Cannot Determine Settings until player has 
		//submitted input (name,color,difficulty) 
		settings = Sorry.Initialize.readUserInput();
		
		players = Sorry.Initialize.createPlayers(settings);

		//start game
		core.startGame(players)
		
		//console.log(players)
		
						
	});

	//////////////////////////////////////////////////////////////////
	//Unit Testing 
	//////////////////////////////////////////////////////////////////
	var TESTING = true; 
	
	if(TESTING) {
		

	//test to make sure each card is used 
	//in multiples iterations through decks

		var ones = 0,
			twos = 0,
			threes = 0,	
			fours = 0,
			fives = 0,
			sevens = 0,
			eights = 0,
			tens = 0,
			elevens = 0,
			twelves = 0,
			sorries = 0;



		for(var i = 0; i < 90; i++) {
			
			var card = deck.drawCard();

			switch(card.value){
				case 1: ones++;
					break;
				case 2: twos++;
					break;
				case 3: threes++;
					break;
				case 4: fours++;
					break;
				case 5: fives++;
					break;
				case 7: sevens++;
					break;
				case 8: eights++;
					break;
				case 10: tens++;
					break;
				case 11: elevens++;
					break;
				case 12: twelves++;
					break;
				case "Sorry": sorries++;
					break;
				}

		/*
		console.log(ones,
					twos,
					threes,
					fours,
					fives,
					sevens,
					eights,
					tens,
					elevens,
					twelves,
					sorries);
		*/
		
	
		}

	}
})(); 

