(function() {

	//dependencies
	var Player = Sorry.Player, 
		Deck = Sorry.Deck, 
		Board = Sorry.Board;
		
	Sorry.Core = {};

	Sorry.Initialize.readUserInput = function() {

		return {
			name : $("#name").val(),
			color : $("#color").val(),
			difficultyLevel : $("[name='diffLevel']").val()
		}
	};

	/**
	 * @param settings
	 */
	Sorry.Initialize.createPlayers = function(settings) {


		var colors,
			computerColor;
		
		//generate computer's color based on players color selection
		if(settings.color === "red" || settings.color === "yellow") {
			colors = ["green","blue"];
		}
		else {
			colors = ["red","yellow"];
		}
		
		computerColor = colors[Math.floor(Math.random() * 2)];
		//for testing

		Sorry.Core.PlayerOne = new Player(settings.name, settings.color);
		Sorry.Core.Computer = new Player.Computer(computerColor, settings.difficultyLevel);

	}
	
	/**
	 * This function dynamically creates eight <img> elements
	 * and sets id, className, and src attributes. They are
	 * first appended to a document fragment and 
	 * then appended to <div id="boardContainer">
	 */
	Sorry.Initialize.addPawnsToBoard = function() {
				
		var docFragment = document.createDocumentFragment();
			compColor = Sorry.Core.Computer.pawns["1"].color,
			playerOneColor = Sorry.Core.PlayerOne.pawns["1"].color,
			boardOverlay = document.getElementById("boardOverlay");
		
		for(var i = 1; i < 5; i++) {
			
			var computerPawn = document.createElement("img"),
				humanPawn = document.createElement("img");
				
			computerPawn.id = compColor.substring(0,1) + i;
			computerPawn.className = compColor;
			computerPawn.src = "img/"+compColor+"Piece.png";
			humanPawn.id = playerOneColor.substring(0,1) + i;
			humanPawn.className = playerOneColor;
			humanPawn.src = "img/"+playerOneColor+"Piece.png";
			docFragment.appendChild(computerPawn);
			docFragment.appendChild(humanPawn);
		}
		
		boardOverlay.appendChild(docFragment);

	}

	Sorry.Core.isGameOver = function() {

		var gameOver = false;

		if(Sorry.Core.PlayerOne.isWinner() || Sorry.Core.Computer.isWinner()) {
			gameOver = true;
		}

		return gameOver;

	}
	///////////////////////////////////////////////////////////////////
	//Begin Game Execution
	///////////////////////////////////////////////////////////////////

	var deck = new Deck();

	$(document).ready(function() {

		var pawnIMG_HTML, pawn, card, collisionNotice,
			boardOffset = $("#myCanvas").offset(), 
			offsetLeft = boardOffset.left, 
			offsetTop = boardOffset.top;
	
		//gather user input
		$("#startGame").bind("click", function() {
			var settings = Sorry.Initialize.readUserInput()
			Sorry.Initialize.createPlayers(settings);
			Sorry.Initialize.addPawnsToBoard();		    		   
		});

		$("#boardContainer").bind("click", function(e) {

			var $target = $(e.target);

			if(!Sorry.Core.isGameOver()) {

				//drawCard
				//card = deck.drawCard();
				
				//if human player							
				if($target.hasClass(Sorry.Core.PlayerOne.pawns["1"].color)) {
					//drawCard
					card = deck.drawCard();
					pawnIMG_HTML = target.id;
					pawn = Sorry.Core.PlayerOne.pawns[pawnIMG_HTML.substring(1)];
				} else if((pawn && $target.get().nodeName === "CANVAS") || $target.hasClass(Sorry.Core.Computer.pawns["1"].color)) {

					var square = Board.mapPixelsToSquare(e.pageX - offsetLeft, e.pageY - offsetTop),					
						adjustedSquare = Board.adjustSquareForPawnColor(square,Sorry.Core.PlayerOne.pawns["1"].color),
						validMove = pawn.validateMove(card.value, adjustedSquare);
						
						
						//IGNORE FOR NOW
						/*collisionNotice = pawn.detectCollision(square);
						//if there is an attempted move which would collide
						//a players own two pawns, the move is automatically
						//invalide and therefore no need to call validateMove()
						if(collisionNotice.collision && !collisionNotice.bump) {
							validMove = false;
						}
						else {
							validMove = pawn.validateMove(card.value, adjustedSquare);
						}*/
						
						////////////////////////////////////////////////////////////////
						//considering calling collisionDetect() inside of validateMove()
						////////////////////////////////////////////////////////////////

					if(validMove) {

						//update pawns position						
						Sorry.Core.PlayerOne.movePawn(pawn.ID, adjustedSquare);
						//store pawns absolute position and pawn -- for collision detection
						Sorry.Board.setOccupiedSquares(square,pawn);
						
						//move pawn on canvas element

						//reset htmlPawn and pawn references for next move
						pawn = null;
						pawnImg = null;
					}
				}
				//if not player one's turn => computer's turn								
				/*else {
				 * 
				 * drawCard
				 * if difficulty is hard -- look for bump move
				 * for(var pawn in pawns) {
				 * 	if(this.position + cardValue === bump) {
				 * 	this.bump(pawn)
				 * }
				 * }
				 * else randomly generate move
				 * 	select a pawn and execute an instruction
				 *  given by card
				 * }
				 */
					
				}

				//if computer player
				console.log(pawn);
				console.log(card);
				console.log(validMove);
			}
		});
	});
})();
